import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

function Verify({ formData, setViewOtp }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function resendOtp(event) {
        event.preventDefault();
        const reqUrl = `${API_URL}/api/otp/sendOtp`;
        setLoading(true);

        await fetch(reqUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
        })
        .then(response => response.json())
        .then(result => {
            setLoading(false);
            console.log(result);
            if(result.success) {
                toast.success('OTP resend successfully');
            } else {
                toast.error('Error in resending OTP, try again later');
            }
        });
    }

    async function verifyOtp(event) {
        event.preventDefault();
        const reqUrl = `${API_URL}/api/otp/verifyOtp`;
        setLoading(true);

        await fetch(reqUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, email: formData.email }),
        })
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.success) {
                    setViewOtp(false);
                    registerUser();
                } else {
                    toast.error(result.message);
                }
            })
            .catch((error) => console.error(error));
    }

    async function registerUser() {
        //make a post request to register user
        setLoading(true);
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }); //no need to use catch block here, response will always be returned
        const result = await response.json();
        setLoading(false);
        console.log(result);
        if (result.success) {
            toast.success(result.message);
            setTimeout(() => navigate("/loginUser"), 1000);
        } else {
            toast.error(result.message);
        }
    }

    if(loading) return <div className="loading"><Loading /></div>
    return (
        <div className="verify">
            <p>An OTP has been sent to <span>{formData.email}</span></p>
            <p>Please enter the OTP below to proceed your verification</p>
            <form className="verify-form">
                <input
                    type="text"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                />
                <div className="otp-btn-group">
                    <button type="submit" onClick={verifyOtp}>
                        Submit
                    </button>
                    <button onClick={resendOtp} className="resend-btn">Resend</button>
                </div>
            </form>
            <Toaster position="top-center" />
        </div>
    );
}

export default Verify;
