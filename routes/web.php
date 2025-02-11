<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});*/
Route::get('/', [PostController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [PostController::class, 'index'])->name('posts');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('web')->group(function () {
    // Ensure CSRF token middleware
    Route::middleware(['auth'])->group(function () {
        // Blog Posts Routes
        Route::get('/posts', [PostController::class, 'index'])->name('posts');
        Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
        Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
    });

    // Comments Routes
    Route::post('/posts/{id}/comments', [CommentController::class, 'store'])->name('posts.comments.store'); // Add a comment
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy'); // Delete a comment
});


require __DIR__.'/auth.php';
