<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\PostCat;
use App\Models\PostTag;

use App\Http\Requests\Post\StoreUpdateRequest;

class PostController extends Controller
{
    public function test()
    {
        echo 000;
    }

    public function index(Request $request)
    {
        $index = Post::leftjoin((new PostCat)->getTable() . ' as c', 'c.id', '=', 'posts.cat_id')
            ->select('posts.*', 'c.title')->groupby('posts.id')->orderby('posts.id', 'DESC');
        if ($request->title) $index->where('posts.title', 'like', "%$request->title%");
        return $index->simplePaginate(24);
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
        return $request->all();
        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
            'cat_id' => $request->cat_id
        ]);

        if ($request->img) {
            $extention = $request->img->getClientOriginalExtension();
            $path = \Storage::disk('public')->putFileAs('post', $request->img, "$post->id.$extention");
            $post->img = $path;
            $post->save();
        }

        $insert = [];
        foreach ($request->tags ?? [] as $v) $insert[] = ['post_id' => $post->id, 'value' => $v];
        if ($insert) PostTag::insert($insert);

        return $post;
    }
}
