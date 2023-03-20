import React from "react";
import { HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useDataContext } from "../contexts/DataProvider";
import NotficationModal from "./NotficationModal";

function Header() {
    const { userDetails, setShowNotification, notifications } = useDataContext();

    return (
        <>
            <header>
                <div className="h-16 fixed z-30 top-0 left-0 w-full bg-slate-900">
                    <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 p-4">
                        <Link to="/" className="h-8 md:h-10 transition-all duration-200">
                            <img src={logo} alt="logo" className="h-full object-contain" />
                        </Link>

                        <div className="flex items-center justify-end gap-2">
                            {userDetails?.role === "user" && (
                                <button
                                    onClick={() => setShowNotification(true)}
                                    className="relative text-2xl transition-all duration-200 bg-transparent hover:bg-slate-800 text-gray-200 p-2 rounded-md"
                                >
                                    <HiOutlineBell />

                                    {!!notifications?.length && (
                                        <span className="bg-slate-800 border border-white/30 rounded-full absolute top-0.5 right-1 text-xs px-1">
                                            {notifications?.length}
                                        </span>
                                    )}
                                </button>
                            )}

                            <Link to="/profile" className="text-2xl transition-all duration-200 bg-transparent hover:bg-slate-800 text-gray-200 p-2 rounded-md">
                                <HiOutlineUserCircle />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Spacer */}
                <div className="h-16" />
            </header>

            <NotficationModal />
        </>
    );
}

export default Header;
