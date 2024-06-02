import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import './ProfilePage.scss';
import { BASE_URL } from '../../utils/apiURL';
import { useAuth0 } from '@auth0/auth0-react';

const { Option } = Select;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(null);
  //Conexión con Auth0
  const { user } = useAuth0(); 

  useEffect(() => {
    // Buscar la información del usuario basado en el correo
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}personas/correo/${user.email}`);
        const data = await response.json();
        console.log(data)
        setPersona(data);
        form.setFieldsValue(data);
        form.setFieldsValue({correo: user.email})
      } catch (error) {
        message.error('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.email, form]);

  const onFinish = async (values) => {
    setLoading(true);
    let response = null;
    console.log(persona);
    console.log(values)
    try {
        if (persona.idPersona === 0) {
            response = await fetch(`${BASE_URL}personas/${persona.idPersona}`, {    
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
        } else {
            response = await fetch(`${BASE_URL}personas/${persona.idPersona}`, {    
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(persona),
              });
        }

      if (response.ok) {
        const data = await response.json();
        setPersona(data);
        form.setFieldsValue(data);
        message.success('Perfil actualizado exitosamente');
      } else {
        message.error('Error al actualizar el perfil');
      }
    } catch (error) {
      message.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const onChangeTipoId = (value) => {
    setPersona({ ...persona, tipoId: value });
  }

  const onChangeCiudad = (value) => {
    console.log(value);
    setPersona({ ...persona, codigoCiudad: value });
  }
  

  return (
    <div className="profile-page">
      <h3>Mi Perfil</h3>
      <Form
        form={form}
        name="profileForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
            codigoCiudad: '5001',
            tipoId: 'CC',
          }}
      >
        <Form.Item name="identificacion" label="Identificación">
          <Input />
        </Form.Item>
        <Form.Item name="nombres" label="Nombres">
          <Input />
        </Form.Item>
        <Form.Item name="apellidos" label="Apellidos">
          <Input />
        </Form.Item>
        <Form.Item name="correo" label="Correo">
          <Input disabled />
        </Form.Item>
        <Form.Item name="direccion" label="Dirección">
          <Input />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono">
          <Input />
        </Form.Item>
        <Form.Item name="tipoId" label="Tipo de Identificación">
            <Select placeholder="Seleccione el tipo de identificación" onChange={onChangeTipoId}>
                <Option value="CC">Cédula de Ciudadania</Option>
                <Option value="CE">Cédula de Extranjería</Option>
                <Option value="TI">Tarjeta de Identidad</Option>
                <Option value="PAS">Pasaporte</Option>
                <Option value="DNI">DNI</Option>
            </Select>
        </Form.Item>
        <Form.Item name="codigoCiudad" label="Código de Ciudad">
            <Select placeholder="Seleccione su ciudad" onChange={onChangeCiudad}>
                <Option value="5001">Medellín</Option>
                <Option value="11001">Bogotá</Option>
                <Option value="13001">Cartagena</Option>
                <Option value="8001">Barranquilla</Option>
                <Option value="76001">Cali</Option>
            </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
