import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { logout } from '../store';
import './styles/Navbar.css';
import icon from '../../public/photos/WoodWorxIcon.jpeg';
import { fetchSingleUser } from '../store/users';

const Navbar = ({ handleClick, isLoggedIn }) => {
  // const [user, setUser] = useState({})
  // const dispatch = useDispatch()
  // const {name} = useParams()
  // console.log('name', name)
  // useEffect(() => {
  //   const currentUser = dispatch(fetchSingleUser(params.id))
  //   setUser(currentUser)
  // })
  // const cartItems = {length: 3}

  const { cartItems } = useSelector((state) => state.cartReducer);

  let signIn = '';
  if (isLoggedIn) {
    signIn = (
      <div>
        {/* <Link to="/">{this.auth}</Link> */}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
        <Link to="/admin">My Dashboard</Link>
      </div>
    );
  } else {
    signIn = (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div className="navbar-left-elements">
        <img className="icon" src={icon} alt="icon" />
        <h1 className="navbar-company-name">
          <Link to="/">
            <div>Bell's</div>
            <div>Custom</div>
            <div>Worx</div>
          </Link>
        </h1>
        <Link className="all-products-link" to="/products">
          All Products
        </Link>
      </div>
      <nav className="nav-links">
        <div>
          <form>
            <input className="search-input" type="text" placeholder="Search Products Here" />
            <button className="search-button" type="submit">Search</button>
          </form>
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">
            Cart{cartItems.length > 0 ? ` (${cartItems.length})` : ''}{' '}
          </Link>
        </div>
        {signIn}
      </nav>
      {/* <hr /> */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    singleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
