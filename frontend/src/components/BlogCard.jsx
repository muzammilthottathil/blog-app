import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ data }) {
    return (
        <Link to={`/blog/${data?._id}`}>
            <img
                src={data?.image}
                alt="image"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.10] group-hover:translate-y-[-5%] transition-all ease-out duration-1000"
            />

            <div className="p-4">
                <p className="text-gray-400 text-sm text-start mb-1">{!!data?.createdAt ? format(new Date(data?.createdAt), "dd MMM yyyy • p") : ""}</p>
                <p className="line-clamp-2 text-lg font-medium mb-2">{data?.title}</p>

                <p className="line-clamp-4 text-gray-300 font-light">{data?.description}</p>
            </div>
        </Link>
    );
}

export default BlogCard;
