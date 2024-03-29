import React, { useState } from "react";
import "./auth.css";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/global/card/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/service/authService";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, RESET } from "../../redux/reducer/authSlice";
import Loader from "../../components/loader/Loader";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const { isLoading } = useSelector((state) => state.auth);

    const forgot = async (e) => {

        e.preventDefault();
        if (!email) { return toast.error("Please enter an email")}
        if (!validateEmail(email)) { return toast.error("Please enter a valid email")}

        const userData = {email};
        await dispatch(forgotPassword(userData));
        await dispatch(RESET());
    };

    return (
        <div className="container auth">
            {isLoading && <Loader />}
            <Card>
                <div className="form">
                    <div className="--flex-center">
                        <AiOutlineMail size={35} color="#999" />
                    </div>
                    <h2>Forgot Password</h2>

                    <form onSubmit={forgot}>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Get Reset Email
                        </button>
                        <div className="links">
                            <p><Link to="/">- Home</Link></p>
                            <p><Link to="/login">- Login</Link></p>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;
