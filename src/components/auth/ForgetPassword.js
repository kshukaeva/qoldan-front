import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send a request to your server to handle the password reset
        // For example:
        fetch("/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.ok) {
            setMessage("Check your email for further instructions.");
          } else {
            setMessage("An error occurred. Please try again later.");
          }
        });
    };

    return (
        <div className="forget-password">
            <h1>Forgot Your Password?</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
