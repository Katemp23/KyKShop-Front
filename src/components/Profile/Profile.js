import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.scss"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  return (
    isAuthenticated && (

      // <div className='navbar-cart flex align-center'>
      // <Link to = "/cart" className='cart-btn'>
      //   <i className='fa-solid fa-cart-shopping'></i>
      //   <div className='cart-items-value'>{itemsCount}</div>
      //   <CartModal carts = {carts} />
      // </Link>
      <div className="image-text-container">
        {/* <h2>{user.name}</h2> */}
        {/* <h2>{user.nickname}</h2> */}
        <img src={user.picture} alt={user.name} className="round-image"/>
        <p>{user.email}</p>
      </div>
      // </div>


    )
  );
};

export default Profile;