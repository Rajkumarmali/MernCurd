import React, { useEffect, useState } from 'react'

export default function Profile() {

    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        loadUserProfile();
    }, [])

    const loadUserProfile = async () => {
        const response = await fetch("http://localhost:3001/api/usrProfile", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        const data = await response.json();
        setUserProfile(data);
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card shadow-lg p-4" style={{ width: "350px" }}>
                <div className="text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="avatar"
                        className="rounded-circle mb-3"
                        width="100"
                    />
                    <h3>{userProfile?.name}</h3>
                    <p className="text-muted">{userProfile?.email}</p>
                </div>
                <hr />
                <div>
                    <p><strong>Phone:</strong> 1212121</p>
                    <p><strong>Address:</strong> XYZ</p>
                </div>
            </div>
        </div>
    )
}
