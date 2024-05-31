import React from 'react';
import { Descriptions, Card } from 'antd';
import { useLocation } from 'react-router-dom';

const SuccessfulSalePage = () => {

    const location = useLocation();
    const { checkoutData } = location.state;

  return (
    <Card title="Resumen de la Compra" size='small' style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '10px'}}>
      <Descriptions size='small' bordered column={1}>
        <Descriptions.Item label="Número de Factura">{checkoutData.idFactura}</Descriptions.Item>
        <Descriptions.Item label="Fecha de la Factura">{checkoutData.dateFactura}</Descriptions.Item>
        <Descriptions.Item label="Nombre"> {checkoutData.firstName} {checkoutData.lastName}</Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico">{checkoutData.email}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{checkoutData.phone}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{checkoutData.address}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{checkoutData.city}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Identificación">{checkoutData.idType}</Descriptions.Item>
        <Descriptions.Item label="Número de Identificación">{checkoutData.idNumber}</Descriptions.Item>
        <Descriptions.Item label="Total de Artículos">{checkoutData.itemsCount}</Descriptions.Item>
        <Descriptions.Item label="Total a Pagar">${checkoutData.total.toFixed(2)}</Descriptions.Item>
      </Descriptions>
      
      <Card title="Detalle de los Productos" size='small'  style={{ marginTop: '20px' }}>
        {checkoutData.carts.map((product, index) => (
          <Descriptions key={index} size='small' bordered column={1}>
            <Descriptions.Item label="Nombre del Producto">{product.name}</Descriptions.Item>
            <Descriptions.Item label="Cantidad">{product.quantity}</Descriptions.Item>
            <Descriptions.Item label="Precio Unitario">${product.discountedPrice.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Subtotal">${(product.discountedPrice * product.quantity).toFixed(2)}</Descriptions.Item>
          </Descriptions>
        ))}
      </Card>
    </Card>
  );
};

export default SuccessfulSalePage;
