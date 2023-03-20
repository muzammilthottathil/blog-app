import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDataContext } from "../contexts/DataProvider";

function RootLayout({ allowedRoles = [] }) {
    const { userDetails, token } = useDataContext();

    if (!!token && !!userDetails.username && allowedRoles?.includes(userDetails.role))
        return (
            <>
                <Header />
                <main className="max-w-5xl mx-auto p-4 pt-6 text-gray-200">
                    <Outlet />
                </main>
            </>
        );
    else return <Navigate to="/login" replace />;
}

export default RootLayout;
