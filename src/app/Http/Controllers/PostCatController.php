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
        $validator = \Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'nullable|string|max:512',
        ]);
        if ($validator->fails()) return response()->json($validator->errors(), 400);
        $cat = PostCat::create(['title' => $request->title, 'description' => $request->description]);
        return $cat ? $cat->toJson() : response()->json('Create failed.', 500);
    }
}
