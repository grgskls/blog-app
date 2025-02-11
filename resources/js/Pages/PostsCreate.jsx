import { React, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function PostsCreate() {
    const { csrf_token, post} = usePage().props;
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const formAction = post ? route("posts.update", post.id) : route("posts.store");
    const method = post ? "PUT" : "POST";

    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {title ? "Edit Post" : "Create a New Post"}
            </h2>
            }
            >
            <div className="post-form mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <form method="POST" action={formAction} className="space-y-4">
                    <input type="hidden" name="_token" value={csrf_token} />

                    {post && <input type="hidden" name="_method" value="PUT" />}

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full mt-1 p-2 border rounded text-gray-900"
                            placeholder="Enter the post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            className="w-full mt-1 p-2 border rounded text-gray-900"
                            rows="6"
                            placeholder="Write the content of your post here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            {post ? "Update Post" : "Create Post"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
