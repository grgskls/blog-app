<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(!Auth::user()) {
            return Inertia::render('Dashboard', [
                'posts' => Post::latest()->with('user')->paginate(10),
                'user' => Auth::user(),
            ]);
        }

        return Inertia::render('PostsIndex', [
            'posts' => Post::latest()->with('user')->paginate(10),
            'user' => Auth::user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if(!Auth::user()) { return abort(403); }
        //$this->authorize('create', Post::class);

        return Inertia::render('PostsCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(!Auth::user()) { return abort(403); }
        //$this->authorize('create', Post::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Auth::user()->posts()->create($validated);

        return redirect()->route('posts')->with('success', 'Post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        $comments = $post->comments()->with('user')->latest()->get();//->paginate(5)->get(),
        return Inertia::render('PostsShow', [
            'post' => $post,
            'comments' => $comments,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        if(!Auth::user()) { return abort(403); }
        //$this->authorize('update', $post);
        $post = Post::findOrFail($id);
        return Inertia::render('PostsCreate', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!Auth::user()) { return abort(403); }
        //$this->authorize('update', $post);
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return redirect()->route('posts')->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!Auth::user()) { return abort(403); }
        //$this->authorize('delete', $post);

        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts')->with('success', 'Post deleted successfully!');
    }
}
