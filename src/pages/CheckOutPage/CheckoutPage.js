// src/components/CheckoutForm.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Divider, notification, message } from 'antd';
import './CheckoutPage.scss';
import { clearCart, getAllCarts } from '../../store/cartSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { BASE_URL } from '../../utils/apiURL';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const { Option } = Select;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount} = useSelector((state) => state.cart);
  
  //Consultar datos desde Auth0
  const { user, isAuthenticated } = useAuth0();

  //Navegar entre páginas
  const navigate = useNavigate();

  //Se llama al momento de crear la página
  useEffect(() => {
    // Buscar la información del usuario basado en el correo
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}personas/correo/${user.email}`);
        const data = await response.json();
        form.setFieldsValue({firstName : data.nombres});
        form.setFieldsValue({lastName : data.apellidos})
        form.setFieldsValue({address : data.direccion})
        form.setFieldsValue({phone : data.telefono})
        form.setFieldsValue({idType : data.tipoId})
        form.setFieldsValue({idNumber : data.identificacion})
        form.setFieldsValue({city : data.codigoCiudad});
      } catch (error) {
        message.error('Error al cargar el perfil');
      }
    };

    fetchProfile();
  }, [user.email, form]);


  const onFinish = async(values) => { 

    if (isAuthenticated) {
      const completeCart = {
        ...values,
        carts: carts,
        total: totalAmount,
        itemsCount: itemsCount,
        email: user.name,
      }

      //Hacer el llamado al back
      crearPedido(completeCart);
    } else {
      notification.warning({
        message: `Por favor inicie sesión para continuar con la compra`,
        description: 'En caso de no tener un usuario puede registrarse con uno nuevo',
      });
    }
  };

  //Controles y validaciones para la tarjeta de crédito
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Inserta un espacio cada 4 dígitos
    setCardNumber(value);
    form.setFieldsValue({ cardNumber: value }); // Sincroniza con el formulario
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    if (value.length > 2) {
      if (!(value.slice(0, 2) > 12) && (value.length < 4 || !(value.slice(2, 4) < 24))) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4); // Formato MM/YY
        form.setFieldsValue({ expiryDate: value }); // Sincroniza con el formulario
      } else {
        notification.warning({
          message: `Mes o año de la tarjeta no válido`,
          description: 'Por favor ingresa una fecha de vencimiento válida',
        });
        form.setFieldsValue({ expiryDate: '' }); // Sincroniza con el formulario
      }
    }
    setExpiryDate(value);
  };

  const crearPedido = async (values) => {
    try {
      // Realizar la petición POST al backend
      const response = await fetch(`${BASE_URL}pedido/createCompra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
  
      // Verificar si la petición fue exitosa
      if (response.ok) {
        notification.success({
          message: `Compra realizada correctamente`,
          description: 'Por favor revise los detalles de su factura',
        });
        const factura = await response.json();
        console.log('Factura recibida:', factura);
        
        //Limpiar el carrito
        dispatch(clearCart())
        localStorage.clear();

        // Redirigir a la página de compra exitosa con los datos del pedido
        navigate('/compra-exitosa', { state: { checkoutData: factura } });

      } else {
        notification.error({
          message: `Compra fallida`,
          description: 'Al parecer hay un problema, por favor comuníquese con servicio al cliente',
        });
        console.error('Error al crear la compra:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  return (
    <div className='form-container'>
      <h1 className="form-title">Finalizar Compra</h1>
      <h4 className="form-title"  style={{textAlign: 'left'}}>Datos del comprador</h4>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          city: '5001',
        }}
        name="checkoutPage"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="Nombres"
              rules={[{ required: true, message: 'Por favor ingrese sus nombres' }]}
            >
              <Input placeholder="Nombres" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Apellidos"
              rules={[{ required: true, message: 'Por favor ingrese sus apellidos' }]}
            >
              <Input placeholder="Apellidos" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[{ required: true, message: 'Por favor ingrese su dirección' }]}
        >
          <Input placeholder="Dirección" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[{ required: true, message: 'Por favor ingrese su teléfono' }]}
        >
          <Input placeholder="Teléfono" />
        </Form.Item>
        <Form.Item
          name="idType"
          label="Tipo de Identificación"
          rules={[{ required: true, message: 'Por favor seleccione el tipo de identificación' }]}
        >
          <Select placeholder="Seleccione el tipo de identificación">
            <Option value="CC">Cédula de Ciudadania</Option>
            <Option value="CE">Cédula de Extranjería</Option>
            <Option value="TI">Tarjeta de Identidad</Option>
            <Option value="PAS">Pasaporte</Option>
            <Option value="DNI">DNI</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="idNumber"
          label="Número de Identificación"
          rules={[{ required: true, message: 'Por favor ingrese su número de identificación' }]}
        >
          <Input placeholder="Número de Identificación" />
        </Form.Item>
        <Form.Item
          name="city"
          label="Ciudad"
          rules={[{ required: true, message: 'Por favor seleccione su ciudad' }]}
        >
          <Select placeholder="Seleccione su ciudad">
            <Option value="5001">Medellín</Option>
            <Option value="11001">Bogotá</Option>
            <Option value="13001">Cartagena</Option>
            <Option value="8001">Barranquilla</Option>
            <Option value="76001">Cali</Option>
          </Select>
        </Form.Item>
        <Divider/>
        <h3>Datos de la Tarjeta</h3><br/>
        <Form.Item
          name="cardNumber"
          label="Número de Tarjeta"
          rules={[{ required: true, message: 'Por favor ingrese su número de tarjeta' }]}
        >
          <Input placeholder="Número de Tarjeta" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expiryDate"
              label="Fecha de Vencimiento"
              rules={[{ required: true, message: 'Por favor ingrese la fecha de vencimiento' }]}
            >
              <Input value={expiryDate} onChange={handleExpiryDateChange} maxLength={5} placeholder="MM/AA"  />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cvv"
              label="CVV"
              rules={[{ required: true, message: 'Por favor ingrese el CVV' }]}
            >
              <Input placeholder="CVV" maxLength={3} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit"> 
            Finalizar Compra
          </Button>
        </Form.Item>
      </Form>
    </div>
    
  );
};

export default CheckoutPage;
