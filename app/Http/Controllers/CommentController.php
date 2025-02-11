<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
        ]);

        Comment::create([
            'post_id' => $id,
            'user_id' => Auth::id(),
            'comment' => $validated['comment'],
        ]);

        return redirect()->route('posts.show', $id)->with('success', 'Comment added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        if (Auth::id() !== $comment->user_id && Auth::id() !== $comment->post->user_id && Auth::id() !== 1) {
            abort(403);
        }

        $comment->delete();
        return back()->with('success', 'Comment deleted successfully!');
    }
}
