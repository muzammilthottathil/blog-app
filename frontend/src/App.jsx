import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./contexts/DataProvider";
import RootLayout from "./layouts/RootLayout";
import BlogForm from "./pages/BlogForm";
import BlogItem from "./pages/BlogItem";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
    return (
        <DataProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<RootLayout allowedRoles={["user", "admin"]} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/blog/:id" element={<BlogItem />} />
                </Route>

                <Route path="/" element={<RootLayout allowedRoles={["admin"]} />}>
                    <Route path="/blog/create" element={<BlogForm type="create" />} />
                    <Route path="/blog/update/:id" element={<BlogForm type="update" />} />
                </Route>

                {/* Catch other routes */}
                <Route path="*" element={<NoMatch />} />
            </Routes>

            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#1E293B",
                        border: "1px solid #4B5563",
                        color: "#22D3EE",
                    },
                }}
            />
        </DataProvider>
    );
}

export default App;
