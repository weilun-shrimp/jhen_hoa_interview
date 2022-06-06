<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\PostCat;
use App\Models\PostTag;

use App\Http\Requests\Post\StoreUpdateRequest;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $index = Post::leftjoin((new PostCat)->getTable() . ' as c', 'c.id', '=', 'posts.cat_id')
            ->select('posts.*', 'c.title as c_title')->groupby('posts.id')->orderby('posts.id', 'DESC');
        if ($request->title) $index->where('posts.title', 'like', "%$request->title%");
        return $index->simplePaginate(24);
    }

    public function show(int $id)
    {
        $post = Post::leftjoin((new PostCat)->getTable() . ' as c', 'c.id', '=', 'posts.cat_id')
            ->select('posts.*', 'c.title as c_title')->where('posts.id', $id)->first();
        if (!$post) return response(null, 404);
        return ['post' => $post, 'tags' => $post->tags];
    }

    public function create()
    {
        return ['cats' => PostCat::all()];
    }

    public function edit(Post $post)
    {
        return ['post' => $post, 'cats' => PostCat::all(), 'tags' => PostTag::where('post_id', $post->id)->get()];
    }

    public function store(StoreUpdateRequest $request)
    {
        $cat = null;
        $post = null;
        \DB::transaction(function () use ($request, &$cat, &$post) {
            $cat = PostCat::where('id', $request->cat_id)->sharedLock()->first();
            if (!$cat) return;
            $post = Post::create([
                'title' => $request->title,
                'description' => $request->description,
                'content' => $request->content,
                'cat_id' => $request->cat_id
            ]);
            if ($request->img) {
                $extention = $request->img->getClientOriginalExtension();
                $post->img = \Storage::disk('public')->putFileAs('post', $request->img, "$post->id.$extention");
                $post->save();
            }
            $insert = [];
            $now = date('Y-m-d H:i:s');
            foreach ($request->tags ?? [] as $v) $insert[] = ['post_id' => $post->id, 'value' => $v, 'created_at' => $now, 'updated_at' => $now];
            if ($insert) PostTag::insert($insert);
        });
        if (!$cat) return response()->json(['cat_id' => ["System can't find designate post cat resource by $request->cat_id."]], 422);
        return $post;
    }

    public function update(StoreUpdateRequest $request, int $id)
    {
        $post = null;
        $cat = null;
        \DB::transaction(function () use ($request, $id, &$post, &$cat) {
            $post = Post::where('id', $id)->lockForUpdate()->first();
            if (!$post) return;
            $cat = PostCat::where('id', $request->cat_id)->sharedLock()->first();
            if (!$cat) return;
            foreach (['title', 'description', 'content', 'cat_id'] as $v) $post->{$v} = $request->{$v};
            if ($request->img) {
                if ($post->img) \Storage::disk('public')->delete($post->img);
                $extention = $request->img->getClientOriginalExtension();
                $post->img = \Storage::disk('public')->putFileAs('post', $request->img, "$post->id.$extention");
            }
            $post->save();
            $tags = PostTag::where('post_id', $post->id)->lockForUpdate()->get()->keyby('value');
            $insert = [];
            $now = date('Y-m-d H:i:s');
            foreach ($request->tags ?? [] as $v) if (!isset($tags[$v])) $insert[] = ['post_id' => $post->id, 'value' => $v, 'created_at' => $now, 'updated_at' => $now]; else $tags->forget($v);
            if ($insert) PostTag::insert($insert);
            if (count($tags)) PostTag::whereIn('id', $tags->map(function ($v) {return $v->id;}))->delete();
        });
        if (!$post) return response(null, 404);
        if (!$cat) return response()->json(['cat_id' => ["System can't find designate post cat resource by $request->cat_id."]], 422);
        return $post;
    }
}
