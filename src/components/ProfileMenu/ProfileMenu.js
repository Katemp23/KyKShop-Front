import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown  } from "antd";
import { DownOutlined, UserOutlined, ProfileOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.scss'

const ProfileMenu = () => {
  
  //Navegar entre páginas
  const navigate = useNavigate();
  //Conexión con Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  const isAdmin = user.email === 'kmunoz14@misena.edu.co'; // Correo específico para el menú de administración

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile')
        break;
      case 'invoices':
        navigate('/invoices')
        break;
      case 'admin':
        navigate('/admin')
        break;
      default:
        navigate('/')
        break;
    }
  };

  const items = [
    {
      label: 'Mi perfil',
      key: 'profile',
      icon: <UserOutlined />,
    },
    {
      label: 'Mis facturas',
      key: 'invoices',
      icon: <ProfileOutlined />,
    },
    isAdmin && (
    {
      label: 'Administración',
      key: 'admin',
      icon: <KeyOutlined />,
    }),
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    isAuthenticated && (
    <Dropdown menu={menuProps} trigger={['click']} className="dropdown-menu">
      <div className="image-text-container">
        <img src={user.picture} alt={user.name} className="round-image"/>
        <p>{user.email} <DownOutlined /></p>
      </div>
    </Dropdown>
    )
  );
};

export default ProfileMenu;