import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataProvider";
import axiosApi from "../services/api";

function DeleteWarning({ id }) {
    const { token: accessToken } = useDataContext();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const closeModal = () => {
        setShow(false);
    };

    const onDelete = async () => {
        const toastId = toast.loading("Updating...");

        setLoading(true);

        try {
            const res = await axiosApi.delete(`/posts/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Blog Deleted", { id: toastId });
            closeModal();
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update", { id: toastId });
        }

        setLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setShow(true)}
                className="text-lg transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-red-600 w-10 h-10 flex items-center justify-center rounded-full"
            >
                <HiTrash />
            </button>

            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-800/20 backdrop-blur p-4 flex items-center justify-center transition-all duration-300 ${
                    show ? "w-full min-h-screen pointer-events-auto opacity-100 scale-100" : "w-0 min-h-0 overflow-hidden pointer-events-none scale-0 opacity-0"
                }`}
            >
                <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800 flex flex-col">
                    <h2 className="text-center text-lg p-4">Are you Sure ?</h2>

                    <div className="flex-1 italic text-gray-400 font-normal text-center p-4">
                        <p>This blog post will be DELETED. And this action cannot be undone. Are you sure about this ?</p>
                    </div>

                    <div className="grid grid-cols-2 mt-3 divide-x divide-slate-600">
                        <button
                            onClick={closeModal}
                            className="w-full bg-slate-900 p-4 uppercase text-slate-400 transition-all duration-200 hover:bg-slate-700"
                        >
                            Close
                        </button>
                        <button
                            disabled={loading}
                            onClick={onDelete}
                            className="w-full bg-slate-900 p-4 uppercase transition-all duration-200 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteWarning;
