import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";


export default function Dashboard({ posts }) {
        const { csrf_token, user } = usePage().props;

    return (
<>
                <h1 className="text-xl font-semibold leading-tight text-gray-800 ml-20 mt-10 pb-4 ">
                    Posts
                </h1>

            <div className="grid gap-4 mx-20">
                {posts.data.map((post) => (
                    <div
                        key={post.id}
                        className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            <Link href={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-gray-700">
                            By {post.user.name} | {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        <p className="mt-2 text-gray-800">{post.content.substring(0, 150)}...</p>
                    {user && user.id === post.user.id && (
                        <>
                            <form
                            method="GET"
                            action={route('posts.edit', post.id)}
                            className="flex"
                        >
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                            >
                                Edit
                            </button>
                            </form>
                            <form
                                method="POST"
                                action={route('posts.destroy', post.id)}
                                className="absolute right-28 transform "
                            >
                                <input type="hidden" name="_token" value={csrf_token} />
                                <input type="hidden" name="_method" value="DELETE" />
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </form>

                        </>
                    )}

                        <Link
                            href={`/posts/${post.id}`}
                            className="text-blue-500 mt-2 block"
                        >
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
            <div className="py-6">
                {/* Pagination */}
                <div className="flex justify-center space-x-4">
                    {posts.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => window.location.href = link.url}
                            className={`px-4 py-2 rounded ${
                                link.active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                        </button>
                    ))}
                </div>
            </div>
</>
    );
}
