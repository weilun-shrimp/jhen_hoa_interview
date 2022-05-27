<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function test()
    {
        echo 000;
    }

    public function index(Request $request)
    {
        return 123;
    }
}
