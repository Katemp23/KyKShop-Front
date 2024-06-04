import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, InputNumber, Modal, Popconfirm, message, Select } from 'antd';
import { getAllInventarioProductos, createInventarioProducto, updateInventarioProducto, deleteInventarioProducto } from '../../store/adminSlice'; // Ajusta las importaciones según sea necesario

const { Column } = Table;
const { Option } = Select;

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchInventarioProductos();
  }, []);

  const fetchInventarioProductos = async () => {
    try {
      const response = await getAllInventarioProductos();
      setData(Array.isArray(response) ? response : []);
    } catch (error) {
      message.error('Error al cargar los productos del inventario');
      setData([]);
    }
  };

  //const isEditing = (record) => record.producto.idProducto === editingKey;

  const edit = (record) => {
    setEditingKey(record.producto.idProducto);
    setEditingRecord(record);
    form.setFieldsValue({
      producto: record.producto,
      inventario: record.inventario,
    });
    setIsModalVisible(true);
  };

  const cancel = () => {
    setEditingKey('');
    setIsModalVisible(false);
    form.resetFields();
  };

  const save = async () => {  
    try {
      const values = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => item.producto.idProducto === editingKey);

      if (index > -1) {
        console.log(newData)
        const item = newData[index];
        console.log(item)
        values.producto.idAlmacen = item.producto.idAlmacen;
        values.producto.idProducto = item.producto.idProducto;
        values.producto.idInventario = item.producto.idInventario;
        console.log(values)
        newData.splice(index, 1, { ...item, ...values });
        console.log(newData)
        await updateInventarioProducto(editingKey, values);
        setData(newData);
        setEditingKey('');
        setIsModalVisible(false);
        form.resetFields();
      } else {
        newData.push(values);
        await createInventarioProducto(values);
        setData(newData);
        setEditingKey('');
        setIsModalVisible(false);
        fetchInventarioProductos();
        form.resetFields();
      }
    } catch (err) {
      console.log('Error en la validación de campos:', err);
    }
  };

  const handleDelete = async (idProducto) => {
    try {
      await deleteInventarioProducto(idProducto);
      setData(data.filter((item) => item.producto.idProducto !== idProducto));
      message.success('Producto eliminado correctamente');
    } catch (error) {
      message.error('Error al eliminar el producto');
    }
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setEditingKey('');
    form.resetFields();
    console.log(form.getFieldsValue());
    setIsModalVisible(true);
  };

  const formatCurrency = (value) => `$${value}`;
  const formatDiscount = (value) => `${value}%`;

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddNew}
        style={{ marginBottom: 16, marginTop: 16, float: 'right' }}
      >
        Agregar Producto
      </Button>
      <Table dataSource={data} rowKey={(record) => record.producto.idProducto}>
        <Column title="ID Producto" dataIndex={['producto', 'idProducto']} key="idProducto" className='hidden-column'/>
        <Column title="Código Producto" dataIndex={['inventario', 'codigoProducto']} key="codigoProducto" />
        <Column title="Artículo" dataIndex={['inventario', 'articulo']} key="articulo" />
        <Column title="Marca" dataIndex={['producto', 'marca']} key="marca" />
        <Column title="Cantidad" dataIndex={['inventario', 'cantidad']} key="cantidad" />
        <Column title="Tipo Artículo" dataIndex={['producto', 'tipoArticulo']} key="tipoArticulo" />
        <Column title="Características" dataIndex={['producto', 'caracteristicas']} key="caracteristicas" />
        <Column title="Valor Unitario Compra" dataIndex={['producto', 'vlrUnitarioCompra']} key="vlrUnitarioCompra" render={(value) => formatCurrency(value)} />
        <Column title="Valor Unitario Venta" dataIndex={['producto', 'vlrUnitarioVenta']} key="vlrUnitarioVenta" render={(value) => formatCurrency(value)}/>
        <Column title="Descuento" dataIndex={['producto', 'descuento']} key="descuento" render={(value) => formatDiscount(value)}/>
        {/* <Column title="Precio en puntos" dataIndex={['producto', 'precioPuntos']} key="precioPuntos" /> */}
        <Column title="Calificación" dataIndex={['producto', 'rating']} key="rating" />
        {/* <Column title="Imagen" dataIndex={['producto', 'urlImagen']} key="urlImagen" className='hidden-column' /> */}
        <Column
          title="Acciones"
          key="action"
          render={(text, record) => (
            <span>
              <Button type="link" onClick={() => edit(record)}>
                Editar
              </Button>
              <Popconfirm title="¿Seguro que deseas eliminar este producto?" onConfirm={() => handleDelete(record.producto.idProducto)}>
                <Button type="link" danger>
                  Borrar
                </Button>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      
      <Modal
        open={isModalVisible}
        title={editingRecord ? "Editar Producto" : "Agregar Producto"}
        okText={editingRecord ? "Guardar" : "Agregar"}
        cancelText="Cancelar"
        onCancel={cancel}
        onOk={save}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={editingRecord ? {
            producto: editingRecord.producto,
            inventario: editingRecord.inventario,
          } : {}}
        >
          <Form.Item
            name={['inventario', 'codigoProducto']}
            label="Código Producto"
            rules={[{ required: true, message: 'Por favor ingrese el código del producto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['inventario', 'articulo']}
            label="Artículo"
            rules={[{ required: true, message: 'Por favor ingrese el artículo' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['producto', 'marca']}
            label="Marca"
            rules={[{ required: false, message: 'Por favor ingrese la marca' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['inventario', 'cantidad']}
            label="Cantidad"
            rules={[{ required: true, message: 'Por favor ingrese la cantidad' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name={['producto', 'tipoArticulo']}
            label="Tipo Artículo"
            rules={[{ required: true, message: 'Por favor ingrese la Categoría' }]}
          >
            <Select placeholder="Seleccione la categoría">
              <Option value="Gatos">Gatos</Option>
              <Option value="Perros">Perros</Option>
              <Option value="Geek">Geek</Option>
              <Option value="Miscelaneos">Miscelaneos</Option>
          </Select>
          </Form.Item>
          <Form.Item
            name={['producto', 'caracteristicas']}
            label="Características"
            rules={[{ required: true, message: 'Por favor ingrese las características' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['producto', 'vlrUnitarioCompra']}
            label="Valor Unitario Compra"
            rules={[{ required: true, message: 'Por favor ingrese el valor unitario de compra' }]}
          >
            <InputNumber min={0} formatter={(value) => formatCurrency(value)} />
          </Form.Item>
          <Form.Item
            name={['producto', 'vlrUnitarioVenta']}
            label="Valor Unitario Venta"
            rules={[{ required: true, message: 'Por favor ingrese el valor unitario de venta' }]}
          >
            <InputNumber min={0} formatter={(value) => formatCurrency(value)}/>
          </Form.Item>
          <Form.Item
            name={['producto', 'descuento']}
            label="Descuento en porcentaje"
            rules={[{ required: true, message: 'Por favor ingrese el descuento' }]}
          >
            <InputNumber min={0} max={100} formatter={(value) => formatDiscount(value)}/>
          </Form.Item>
          <Form.Item
            name={['producto', 'precioPuntos']}
            label="Precio en puntos"
            rules={[{ required: true, message: 'Por favor ingrese el precio en puntos' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name={['producto', 'rating']}
            label="Calificación"
            rules={[{ required: true, message: 'Por favor ingrese la calificación' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name={['producto', 'urlImagen']}
            label="Imagen"
            rules={[{ required: true, message: 'Por favor ingrese la url de la imagen' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPage;