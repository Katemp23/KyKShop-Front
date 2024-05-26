import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.scss"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="image-text-container">
        {/* <h2>{user.name}</h2> */}
        {/* <h2>{user.nickname}</h2> */}
        <img src={user.picture} alt={user.name} className="round-image"/>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;