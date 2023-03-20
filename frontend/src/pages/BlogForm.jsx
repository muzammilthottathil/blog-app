import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiArrowLeft, HiArrowUpTray } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataProvider";
import axiosApi from "../services/api";

function BlogForm({ type }) {
    const { token: accessToken, sendNewBlogNotification } = useDataContext();
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const params = useParams();

    const handleFileChage = async (e) => {
        const file = e.target.files?.[0];

        let formData = new FormData();
        formData.append("file", file || "");
        formData.append("name", file?.name || "");

        const toastId = toast.loading("Uploading...");
        try {
            const res = await axiosApi.post("/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setImage(res.data?.imageUrl);
            toast.success("Image Uploaded", { id: toastId });
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload", { id: toastId });
        }
    };

    const createBlog = async () => {
        const toastId = toast.loading("Creating...");

        setLoading(true);

        try {
            const res = await axiosApi.post(
                "/post/create",
                {
                    title,
                    description,
                    image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            sendNewBlogNotification({ title, description, id: res?.data?.id });

            setTitle("");
            setDescription("");
            setImage(null);
            toast.success("Blog Created", { id: toastId });
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create", { id: toastId });
        }

        setLoading(false);
    };

    const updateBlog = async () => {
        const toastId = toast.loading("Updating...");

        setLoading(true);

        try {
            const res = await axiosApi.put(
                `/post/update/${params.id}`,
                {
                    title,
                    description,
                    image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setTitle("");
            setDescription("");
            setImage(null);
            toast.success("Blog Updated", { id: toastId });
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update", { id: toastId });
        }

        setLoading(false);
    };

    useEffect(() => {
        if (type === "update" && params?.id) {
            const fetchBlog = async () => {
                try {
                    const res = await axiosApi.get(`/post/${params?.id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    setTitle(res.data?.title);
                    setDescription(res.data?.description);
                    setImage(res.data?.image);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchBlog();
        }
    }, [type, params?.id]);

    return (
        <div>
            <div className="flex items-start justify-start gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="h-full py-1 text-2xl">
                    <HiArrowLeft />
                </button>

                <h1 className="text-2xl font-semibold mb-1.5">{type === "create" ? "Create New Blog" : "Update Blog"}</h1>
            </div>

            <div>
                <label className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[250px] rounded-2xl overflow-hidden mb-6 border border-dashed border-slate-500 flex items-center justify-center group hover:bg-slate-900 hover:border-slate-100 cursor-pointer">
                    {!image ? (
                        <div className="flex flex-col items-center justify-center gap-3 text-slate-500 group-hover:text-slate-100">
                            <HiArrowUpTray className="text-4xl" />
                            <p className="text-sm">Upload Image</p>
                        </div>
                    ) : (
                        <img src={image} alt="image" className="h-full w-full object-cover" />
                    )}

                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChage} />
                </label>

                <div className="mb-4">
                    <label className="text-gray-300 text-sm block mb-1">Title</label>
                    <input
                        className="bg-slate-800 flex-1 border-none outline-none text-gray-400 placeholder:text-gray-500 rounded-lg p-2 px-4 w-full ring-0"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-300 text-sm block mb-1">Description</label>
                    <textarea
                        className="bg-slate-800 flex-1 border-none outline-none text-gray-400 font-light placeholder:text-gray-500 rounded-lg p-2 px-4 w-full ring-0"
                        rows={10}
                        placeholder="Type your content here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button
                        onClick={() => (type === "create" ? createBlog() : updateBlog())}
                        disabled={loading}
                        className="gradient_btn w-full sm:max-w-[10rem]"
                    >
                        {type === "create" ? (loading ? "Creating..." : "Create") : loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BlogForm;
