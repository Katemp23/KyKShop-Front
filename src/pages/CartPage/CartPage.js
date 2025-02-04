import React from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { shopping_cart } from '../../utils/images';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart } from '../../store/cartSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { notification } from 'antd';

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount} = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth0();

  const validarEmail = () => {
    notification.warning({
      message: `Por favor inicie sesión para continuar con la compra`,
      description: 'En caso de no tener un usuario puede registrarse con uno nuevo',
    });
  }

  if(carts.length === 0){
    return (
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src = {shopping_cart} alt = "" />
          <span className='fw-6 fs-15 text-gray'>Tu cesta de compras esta vacia.</span>
          <Link to = "/" className='shopping-btn bg-orange text-white fw-5'>Ir de Compras Ahora</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart bg-whitesmoke'>
      <div className='container'>
        <div className='cart-ctable'>
          <div className='cart-chead bg-white'>
            <div className='cart-ctr fw-6 font-manrope fs-15'>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Código</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Producto</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Precio por Unidad</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Cantidad</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Precio Total</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Acciones</span>
              </div>
            </div>
          </div>

          <div className='cart-cbody bg-white'>
            {
              carts.map((cart, idx) => {
                return (
                  <div className='cart-ctr py-4' key = {cart?.id}>
                    <div className='cart-ctd'>
                      {console.log(carts)}
                      <span className='cart-ctxt'>{cart.id}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{cart?.title}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{formatPrice(cart?.discountedPrice)}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt' >
                      <div className='qty-change flex align-center justify-center'>
                        <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "DEC"}))}>
                          <i className='fas fa-minus'></i>
                        </button>

                        <div className='qty-value flex align-center justify-center'>
                          {cart?.quantity}
                        </div>

                        <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "INC"}))}>
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                      </span>
                    </div>

                    <div className='cart-ctd'>
                      <span className='cart-ctxt text-orange fw-5'>{formatPrice(cart?.totalPrice)}</span>
                    </div>

                    <div className='cart-ctd'>
                      <button type = "button" className='delete-btn text-dark' onClick={() => dispatch(removeFromCart(cart?.id))}>Borrar</button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
            <div className='cart-cfoot-l'>
              <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => dispatch(clearCart())}>
                <i className='fas fa-trash'></i>
                <span className='mx-1'>Vaciar carrito</span>
              </button>
            </div>

            <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-manrope fw-5'>Total ({itemsCount}) productos: </div>
                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
              </div>

              {isAuthenticated ?  <Link to={`/checkout`}>
              <button type = "button" className='checkout-btn text-white bg-orange fs-16'>Ir al pago</button>
              </Link> : (
                <button type = "button" className='checkout-btn text-white bg-orange fs-16' onClick={validarEmail}>Ir al pago</button>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage