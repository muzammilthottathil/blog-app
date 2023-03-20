import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiLockClosed, HiUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../services/api";
import { logo } from "../assets";

const intialDetails = {
    username: "",
    password: "",
    name: "",
};

function Signup() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({ ...intialDetails });

    const navigate = useNavigate();

    const handleChange = (e) => setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Registering...");

        setLoading(true);

        try {
            const res = await axiosApi.post("/signup", {
                ...details,
            });

            setDetails({ ...intialDetails });
            toast.success(res.data?.msg, { id: toastId });
            navigate("/login");
        } catch (error) {
            console.log(error);

            toast.error("Failed to register", { id: toastId });
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-[17rem] pb-10 w-full flex flex-col items-center justify-center gap-y-6">
                <div className="w-32 mb-2">
                    <img src={logo} alt="logo" />
                </div>

                <div className="auth_input">
                    <HiUser />
                    <input type="text" placeholder="Name" required value={details.name} name="name" onChange={handleChange} />
                </div>

                <div className="auth_input">
                    <HiUser />
                    <input type="text" placeholder="Username" required value={details.username} name="username" onChange={handleChange} />
                </div>

                <div className="auth_input">
                    <HiLockClosed />
                    <input type="password" placeholder="Password" required value={details.password} name="password" onChange={handleChange} />
                </div>

                <button type="submit" disabled={loading} className="gradient_btn">
                    {loading ? "Please wait..." : "Register"}
                </button>

                <p className="-mt-3 text-sm text-end w-full font-light">
                    Already have an acccount?{" "}
                    <Link to="/login" className="text-indigo-300 underline">
                        Login here
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Signup;
