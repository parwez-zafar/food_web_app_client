import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
// import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('user_email');

        navigate('/login');
    }
    const [cartView, setCartView] = useState(false);
    return (



        <>

            <nav className="navbar navbar-expand-lg navbar-dark" style={{}}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">PrwzFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav me-auto mb-2 mt-2" >

                            <div>
                                <Link className=" mx-1 active  text-dark bg-white btn " aria-current="page" to="/">Home</Link>

                                {
                                    localStorage.getItem('login_token')
                                        ?
                                        <Link className=" mx-1 active  text-dark bg-white btn active" aria-current="page" to="/myOrder">My Orders</Link>
                                        : ""
                                }
                            </div>

                        </div>

                        {
                            !localStorage.getItem('login_token')
                                ?
                                <div className='d-flex '>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
                                </div>

                                :
                                <div className='d-flex'>
                                    <div className="btn bg-white text-success mx-2" onClick={() => {
                                        setCartView(true)
                                    }} >
                                        My Cart {" "}
                                        {
                                            data.length !== 0 ?
                                                <Badge pill bg='danger'> {data.length}</Badge>
                                                : null
                                        }
                                    </div>
                                    {
                                        cartView ?
                                            <Model onClose={() => setCartView(false)}>
                                                <Cart />
                                            </Model>
                                            : ""
                                    }

                                    <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</div>
                                </div>
                        }

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;