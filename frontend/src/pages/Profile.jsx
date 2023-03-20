import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { avatar } from "../assets";
import { useDataContext } from "../contexts/DataProvider";

function Profile() {
    const { userDetails, logout } = useDataContext();

    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-start justify-start gap-4 mb-20">
                <button onClick={() => navigate(-1)} className="h-full py-1 text-2xl">
                    <HiArrowLeft />
                </button>

                <h1 className="text-2xl font-semibold mb-1.5">Profile</h1>
            </div>

            <div className="max-w-[15rem] mx-auto flex flex-col items-center justify-center gap-4">
                <div className="flex items-end overflow-hidden justify-center border-b border-gray-200/10">
                    <img src={avatar} alt="" className="object-contain w-full" />
                </div>
                <p className="text-gray-300">{userDetails?.name}</p>
                <button onClick={() => logout()} className="gradient_btn w-full">
                    Logout
                </button>
            </div>
        </>
    );
}

export default Profile;
