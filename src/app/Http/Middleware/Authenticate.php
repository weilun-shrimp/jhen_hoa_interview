<?php

namespace App\Http\Middleware;

// use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Illuminate\Http\Request;
use Closure;

class Authenticate // extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    // protected function redirectTo($request)
    // {
    //     if (! $request->expectsJson()) {
    //         return route('login');
    //     }
    // }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) return response()->json(['type' => 'notProvide'], 401); // token not provide
        $decode_payload = json_decode(base64_decode(explode('.', explode(' ', $_SERVER['HTTP_AUTHORIZATION'])[1])[1]));
        if (time() - $decode_payload->exp >= 0) return response()->json([
            'type' => 'expired',
            'time' => time(),
            'exp' => $decode_payload->exp
        ], 401); // token has expired
        if (!\Auth::check()) response()->json(['type' => 'unauthorized'], 401);

        return $next($request);
    }
}
