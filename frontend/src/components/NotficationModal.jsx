import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataProvider";
import NoticationItem from "./NoticationItem";

function NotficationModal() {
    const { showNotification, setShowNotification, notifications } = useDataContext();

    const navigate = useNavigate();

    const closeModal = () => {
        setShowNotification(false);
    };

    return (
        <>
            <div
                onClick={closeModal}
                className={`fixed z-[50] top-0 left-0 h-screen w-full transition-all duration-200 ${
                    showNotification ? "bg-slate-700/20 pointer-events-auto backdrop-blur" : "bg-transparent pointer-events-none backdrop-blur-0"
                }`}
            />

            <div
                className={`fixed z-[51] left-1/2 -translate-x-1/2 ${
                    showNotification ? "translate-y-4" : "-translate-y-full"
                } transition-all duration-500 top-0 w-full max-w-lg h-fit bg-slate-800 rounded-lg border border-slate-700 p-0`}
            >
                <div className="flex items-center justify-between p-2 pl-4">
                    <h3 className="font-semibold uppercase text-gray-100">Notifications</h3>

                    <button onClick={closeModal} className="bg-slate-900 hover:bg-slate-700 transition duration-200 p-3 rounded-full">
                        <HiXMark />
                    </button>
                </div>

                {!!notifications?.length ? (
                    <div className="divide-y divide-white/10 h-full max-h-96 overflow-auto pb-4">
                        {notifications?.map((item, index) => (
                            <NoticationItem
                                key={index}
                                details={item}
                                onClick={() => {
                                    closeModal();
                                    navigate(`/blog/${item?.id}`);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm italic text-gray-400 py-4">No Notifications Found</p>
                )}
            </div>
        </>
    );
}

export default NotficationModal;
