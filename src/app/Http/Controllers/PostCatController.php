<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PostCat;
use App\Models\Post;

class PostCatController extends Controller
{
    public function index(Request $request)
    {
        $index = PostCat::leftjoin((new Post)->getTable() . ' as p', 'p.cat_id', '=', 'post_cats.id')
            ->selectRaw('post_cats.*, COUNT(p.id) count_p')->groupby('post_cats.id')->orderby('post_cats.id', 'DESC');
        if ($request->title) $index->where('post_cats.title', 'like', "%$request->title%");
        return $index->simplePaginate(24);
    }

    public function store(Request $request)
    {
        $validator = $this->store_update_validator($request);
        if ($validator->fails()) return response()->json($validator->errors(), 400);
        $cat = PostCat::create(['title' => $request->title, 'description' => $request->description]);
        return $cat ? $cat->toJson() : response()->json('Create failed.', 500);
    }

    public function update(Request $request, int $cat_id)
    {
        $validator = $this->store_update_validator($request);
        if ($validator->fails()) return response()->json($validator->errors(), 400);
        $cat = null;
        \DB::transaction(function () use ($cat_id, $request, &$cat) {
            $cat = PostCat::where('id', $cat_id)->lockForUpdate()->first();
            if (!$cat) return;
            foreach(['title', 'description'] as $v) $cat->{$v} = $request->{$v};
            $cat->save();
        });
        return !$cat ? response()->json('System can\'t find resource.', 404) : $cat->toJson();
    }

    private function store_update_validator(Request $request)
    {
        return \Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'nullable|string|max:512',
        ]);
    }

    public function delete(int $cat_id)
    {
        $cat = null;
        \DB::transaction(function () use ($cat_id, &$cat) {
            $cat = PostCat::where('post_cats.id', $cat_id)
                ->leftjoin((new Post)->getTable() . ' as p', 'p.cat_id', '=', 'post_cats.id')
                ->selectRaw('post_cats.*, COUNT(p.id) count_p')->groupby('post_cats.id')->lockForUpdate()->first();
            if (!$cat or $cat->count_p > 0) return;
            $cat->delete();
        });
        if (!$cat) return response(null, 404);
        return $cat->count_p > 0 ? response()->json(['type' => 'PostAssigned'], 400) : $cat;
    }
}
