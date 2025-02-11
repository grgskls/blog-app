<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $admin = User::firstOrCreate(
            ['email' => 'admin@blogger.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('admin'),
            ]
        );
        $tom = User::firstOrCreate(
            ['email' => 'tom@blogger.com'],
            [
                'name' => 'Tom Blogger',
                'password' => bcrypt('pw'),
            ]
        );

        $jerry = User::firstOrCreate(
            ['email' => 'jerry@blogger.com'],
            [
                'name' => 'Jerry Blogger',
                'password' => bcrypt('pw'),
            ]
        );
        Post::factory(10)
            ->has(Comment::factory(5)->for($tom))
            ->for($tom)
            ->create();

        Post::factory(15)
            ->has(Comment::factory(7)->for($jerry))
            ->for($jerry)
            ->create();

    }
}
