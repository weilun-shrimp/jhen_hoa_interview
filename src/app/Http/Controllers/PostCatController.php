<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PostCat;

class PostCatController extends Controller
{
    public function index(Request $request)
    {
        $index = PostCat::orderby('id', 'DESC');
        if ($request->title) $index->where('title', 'like', "%$request->title%");
        return $index->simplePaginate(24);
    }

    public function store(Request $request)
    {
        $validator = $this->store_update_validator($request);
        if ($validator->fails()) return response()->json($validator->errors(), 400);
        $cat = PostCat::create(['title' => $request->title, 'description' => $request->description]);
        return $cat ? $cat->toJson() : response()->json('Create failed.', 500);
    }

    public function update(Request $request, $cat_id)
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
}