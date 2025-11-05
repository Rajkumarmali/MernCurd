import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            (localStorage.getItem('token')) &&
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Profile
                                </a>
                            </li>
                        }
                    </ul>
                    {
                        (localStorage.getItem('token')) ? <div>
                            <button onClick={LogOut} className="btn btn-outline-success">LogOut</button>
                        </div> :
                            <div className="d-flex">
                                <Link to="/login" className="btn btn-outline-success" >LogIn</Link>
                                <Link to="/signin" className="btn btn-outline-success" >SignIn</Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}
