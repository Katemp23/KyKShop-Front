import React, { useEffect, useState } from 'react';
import { List, Card, Descriptions, Image, Row, Col } from 'antd';
import './BillsPage.scss';
import { formatPrice } from '../../utils/helpers';
import { BASE_URL } from '../../utils/apiURL';
import Title from 'antd/es/skeleton/Title';
import { useAuth0 } from '@auth0/auth0-react';

const BillsPage = () => {
  const [bills, setBills] = useState([]);
    //Consultar datos desde Auth0
    const { user } = useAuth0();

  useEffect(() => {
    // Función para obtener las facturas del backend
    const fetchBills = async () => {
      try {
        const response = await fetch(`${BASE_URL}pedido/facturas/${user.name}`);
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, [user.name]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  // Función para formatear la tarjeta
  const formaCard = (cardNumber) => {
    return cardNumber.slice(-4);
  };

  return (
    <div className="bills-page">
      <Title level={2}>Mis Facturas</Title>
      <p>Aquí puedes ver el detalle de tus compras</p><br/>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={bills}
        renderItem={bill => (
          <List.Item>
            {/* Por si se quiere un botón para ver mas detalles */}
            {/* <Card title={`Factura #${bill.factura.idFactura}`} extra={<Button type="primary">Ver Detalles</Button>}> */}
            <Card title={`Factura #${bill.factura.idFactura}`}>
              <Descriptions bordered >
                <Descriptions.Item label="Fecha de Factura">{formatDate(bill.factura.fechaFactura)}</Descriptions.Item>
                <Descriptions.Item label="Tarjeta Terminada en">{formaCard(bill.factura.numeroTarjeta)}</Descriptions.Item>
                <Descriptions.Item label="Estado de Pedido">{bill.pedido.estadoPedido}</Descriptions.Item>
                <Descriptions.Item label="Estado de Factura">{bill.factura.estadoFactura}</Descriptions.Item>
                <Descriptions.Item label="Cantidad Vendida">{bill.factura.cantidadVendida}</Descriptions.Item>
                <Descriptions.Item label="Total">{formatPrice(bill.factura.vrlTotal)}</Descriptions.Item>
              </Descriptions>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={bill.productosFactura}
                renderItem={product => (
                    <List.Item>
                        <Card>
                            <Row gutter={16}>
                                <Col span={5}>
                                    <div className='card-cover-img'>
                                        <Image
                                            alt="image"
                                            src={product.urlImagen}
                                            height={150}
                                            width={150}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                </Col>
                                <Col span={19}>
                                    <Descriptions title={`Categoria: ${product.tipoArticulo}`} column={2} >
                                        <Descriptions.Item label="Cantidad">{product.cantidad}</Descriptions.Item>
                                        <Descriptions.Item label="Precio Unitario">{formatPrice(product.vlrUnitarioVenta)}</Descriptions.Item>
                                        <Descriptions.Item label="Descuento">{product.descuento}%</Descriptions.Item>
                                        <Descriptions.Item label="Precio con descuento">{formatPrice(product?.vlrUnitarioVenta - product.vlrUnitarioVenta * (product.descuento / 100))}</Descriptions.Item>
                                        <Descriptions.Item label="Marca">{product.marca}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BillsPage;
