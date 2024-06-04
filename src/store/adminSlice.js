// api.js
import { BASE_URL } from '../utils/apiURL';
import { message } from 'antd';

export const getAllInventarioProductos = async () => {
  const response = await fetch(`${BASE_URL}inventario/productos`);
  const result = await response.json();
  return result;
};

export const createInventarioProducto = async (inventarioDto) => {
    let response = null;
    try {
        response = await fetch(`${BASE_URL}inventario/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventarioDto)
        });
        message.success('Producto agregado correctamente'); 
    } catch (error) {
        message.error('Error al intentar crear el producto'); 
    }
    return response;
};

export const updateInventarioProducto = async (id, inventarioDto) => {
    let response = null;
    try {
        response = fetch(`${BASE_URL}inventario/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventarioDto)
        });
        message.success('Producto actualizado correctamente');
    } catch (error) {
        message.error('Error al intentar actualizar el producto'); 
    }

    return response
};

export const deleteInventarioProducto = async (id) => {
    await fetch(`${BASE_URL}inventario/productos/${id}`, {
        method: 'DELETE'
    });
};
