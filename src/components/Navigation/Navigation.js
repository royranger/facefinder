import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn, clearState}) => {

  const signOut = () => {
    onRouteChange('signin');
    clearState();
  }

  if(isSignedIn) {
    return(
      <nav className="navigation">
        <p onClick={signOut}
            className="f3 link dim black underline pa3 pointer">Sign out</p>
      </nav>
    );
  } else {
    return(
      <nav className="navigation">
        <p onClick={()=> onRouteChange('signin') } className="f3 link dim black underline pa3 pointer">Sign in</p>
        <p onClick={()=> onRouteChange('register') } className="f3 link dim black underline pa3 pointer">Register</p>
      </nav>

    );
  }



}

export default Navigation;
