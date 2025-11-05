import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Login = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate('/student');
            } else {
                console.log("Login Failed");
            }
            // 
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={Login}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
