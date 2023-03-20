import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteWarning from "../components/DeleteWarning";
import { useDataContext } from "../contexts/DataProvider";
import axiosApi from "../services/api";

function BlogItem() {
    const { token: accessToken, userDetails } = useDataContext();
    const [data, setData] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosApi.get(`/post/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlog();
    }, [params.id]);

    return (
        <>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start justify-start gap-4">
                    <button onClick={() => navigate(-1)} className="h-full py-1 text-2xl">
                        <HiArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold mb-1.5">{data?.title || ""}</h1>
                        <p className="text-gray-400 font-normal text-sm mb-4">
                            {!!data?.createdAt ? format(new Date(data?.createdAt), "dd MMM yyyy • p") : ""}
                        </p>
                    </div>
                </div>

                {userDetails?.role === "admin" && (
                    <div className="flex items-center justify-end gap-2">
                        <Link
                            to={`/blog/update/${data?._id}`}
                            className="text-lg transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-blue-300 w-10 h-10 flex items-center justify-center rounded-full"
                        >
                            <HiPencil />
                        </Link>

                        <DeleteWarning id={data?._id} />
                    </div>
                )}
            </div>

            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-6">
                <img src={data?.image || ""} alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="text-gray-300 font-light">
                <p className="whitespace-pre-line">{data?.description || ""}</p>
            </div>
        </>
    );
}

export default BlogItem;
