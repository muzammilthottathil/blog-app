import React, { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useDataContext } from "../contexts/DataProvider";
import axiosApi from "../services/api";

function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [allPostsLoaded, setAllPostsLoaded] = useState(false);

    const { token: accessToken, userDetails } = useDataContext();

    const lastPostRef = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosApi.get(`/posts`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setData([...res.data]);
                if (res.data.length === 0) {
                    setAllPostsLoaded(true);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlog();
    }, []);

    useEffect(() => {
        if (allPostsLoaded || !lastPostRef.current) {
            return;
        }

        const controller = new AbortController();

        // Intersection Observer instance
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                setLoading(true);

                try {
                    const res = await axiosApi.get(`/posts?skip=${data.length}`, {
                        signal: controller.signal,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    setData((prev) => [...prev, ...res?.data]);

                    if (res?.data.length === 0) {
                        setAllPostsLoaded(true);
                    }
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        });

        // Observe the last post element
        observer.observe(lastPostRef.current);

        // Cleanup function
        return () => {
            observer.disconnect();
            controller.abort();
        };
    }, [data, allPostsLoaded]);

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-center font-semibold text-xl">Recent Blogs</h1>
                {userDetails?.role === "admin" && (
                    <Link
                        to="/blog/create"
                        className="text-lg transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-blue-300 pl-4 pr-5 h-10 flex items-center justify-center gap-2 rounded-full"
                    >
                        <HiPlus /> <span className="font-medium uppercase text-sm">Create</span>
                    </Link>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-6">
                {!!data?.length &&
                    data.map((item, index) => (
                        <div
                            key={index}
                            ref={index === data.length - 1 ? lastPostRef : null}
                            className="w-full rounded-2xl overflow-hidden bg-slate-800 cursor-pointer hover:shadow-xl hover:scale-[1.03] group transition-all duration-200"
                        >
                            <BlogCard data={item} />
                        </div>
                    ))}
            </div>

            {loading && <p>Loading...</p>}
        </>
    );
}

export default Home;
