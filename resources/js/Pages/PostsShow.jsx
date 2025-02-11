import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function PostsShow({ post, comments }) {
    const { csrf_token, user } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {post.title}
                </h2>
                {user && (user.id === post.user_id || user.id === 1) && (
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
                )}
                </>
            }
        >
            <div className="post-show mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mt-4 text-gray-200">{post.content}</p>
                <h2 className="text-xl mt-8 text-gray-300 font-bold">Comments</h2>
                <ul className="mt-4 text-gray-200">
                    {comments && comments.length > 0 ? (
                        comments.map((comment) => (
                        <div key={comment.id}>
                            <li key={comment.id} className="mb-2 relative pt-2">
                                <strong className="text-gray-400 text-xl">
                                    {comment.user?.name || "Guest"}:
                                </strong>{" "}
                                {comment.comment}
                                {user && (user.id === comment.user?.id || user.id === 1) && (
                                    <form
                                        method="POST"
                                        action={route(
                                            "comments.destroy",
                                            comment.id
                                        )} // Use correct route for comments
                                        className="text-right right-0 top-0 transform"
                                    >
                                        <input type="hidden" name="_token" value={csrf_token}
                                        />
                                        <input type="hidden" name="_method" value="DELETE"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                )}
                            </li>
                            <hr />
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </ul>
                <form
                    className="mt-6"
                    method="POST"
                    action={route("posts.comments.store", post.id)}
                >
                    <input type="hidden" name="_token" value={csrf_token} />
                    <textarea
                        name="comment"
                        className="w-full border rounded p-2"
                        rows="3"
                        placeholder="Write a comment..."
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
                    >
                        Add Comment
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
