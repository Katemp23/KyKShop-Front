import React from 'react';
import "./Header.scss";
// import {Link} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import LoginButton from '../Login/Login';
import LogoutButton from '../Logout/Logout';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {

  const {isAuthenticated} = useAuth0();

  return (
    <header className='header text-white'>
      <div className='container'>
        <div className='header-cnt'>
          <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header-cnt-top-l'>
              <ul className='flex top-links align-center'>
                {/* <li>
                  <Link to = "/seller">Seller Center</Link>
                </li>
                <li className='vert-line'></li>
                <li>
                  <Link to = "/download">Download</Link>
                </li> */}
                <li className='vert-line'></li>
                <li className='flex align-center'>
                  <span className='fs-13'>Síguenos en nuestras redes</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href = "https://www.facebook.com" target="_blank" rel="noreferrer"  className='fs-15'>
                        <i className='fab fa-facebook'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href = "https://www.instagram.com" target="_blank" rel="noreferrer" className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href = "https://web.whatsapp.com" target="_blank" rel="noreferrer" className='fs-15'>
                        <i className='fab fa-whatsapp'></i>
                      </a>
                    </li>
                    <li className='vert-line'></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='header-cnt-top-r'>
              <ul className='top-links flex align-center'>
                {/* <li>
                  <Link to = "/" className='top-link-itm'>
                    <span className='top-link-itm-ico mx-2'>
                      <i className='fa-solid fa-circle-question'></i>
                    </span>
                    <span className='top-link-itm-txt'>Support</span>
                  </Link>
                </li> */}
                {isAuthenticated ? (
                  <>
                  <li className='vert-line'></li>
                  <ProfileMenu/>
                  </>
                ) : ( <>
                  <i className="fa-regular fa-user"></i>
                </>
                )}
                {/* <li>
                  <Link to = "/">
                    <span className='top-link-itm-txt'>Register</span>
                  </Link>
                </li> */}
                <li className='vert-line'></li>
                {/* <li> */}
                  {isAuthenticated ? (
                    <li>
                      <LogoutButton/>
                    </li> ) : (
                      <LoginButton/>
                    )}
                {/* </li> */}
              </ul>
            </div>
          </div>

          <div className='header-cnt-bottom'>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header