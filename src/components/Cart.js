import React from 'react';
import {connect} from 'react-redux';
//import {Container,Row,Col} from 'react-bootstrap';
import {Table,Container} from 'react-bootstrap'
import Header from './Header';
import ReactDOM from 'react-dom';
import Customer from './Customer';
import {Provider} from 'react-redux';
import store from './store'
import {INCREASE_QUANTITY,DECREASE_QUANTITY,CLEAR_PRODUCT} from './actions/types'


function Cart({basketProps,increaseQuantity,clearProduct}) {

  const handleSubmit=(event)=>{
      console.log("submit called");
           ReactDOM.render( <Provider store={ store }><Customer /> </Provider>, document.getElementById('root'));     
      event.preventDefault();
  }
  let productsInCart=[];
  let cartTotal='';
  console.log("props in Cart",basketProps)
  if({basketProps} !==null){
    console.log("INSIDE CART IF TRUE")
    cartTotal= basketProps.cartCost;
        Object.keys(basketProps.products).forEach(element => {
        if(basketProps.products[element].inCart){
          productsInCart.push(basketProps.products[element])
        }
        })
            productsInCart = productsInCart.map((item,index)=>{
              return (             
                    <>
                    <tr key={index}>
                        <td style={{whiteSpace: 'nowrap'}}> {item.product}</td>
                        <td><button type="button" onClick={()=>increaseQuantity("decrease",item.product)} > - </button>
                          <span style={{width:'50px',color:'blue'}}>{item.quantity}</span>
                          <button className="glyphicon glyphicon-plus" onClick={()=>increaseQuantity("increase",item.product)} > + </button>
                          </td>
                        <td> {item.price}</td>
                        <td>
                          <img src = {require(`../images/${item.urlSm}`)} style= {{ width:'200px',height:'200px'}}alt=" product"/>
                        </td>
                        <td><button type="button" className="btn btn-danger" onClick={()=>clearProduct("delete",item.product)} >Delete</button></td>

                      </tr>

                    </>
              )}
        )}        
        return(
            <div className="App">
                <div className="product">
                <Header/>
                <br></br>
                <Container fluid>
                  <div className="float-right">
                    <button className="btn btn-primary" onClick={handleSubmit}>Checkout</button>
                  </div>
                  <h3>Items in your cart are :</h3>
                  <Table className="mt-4">
                    <thead>
                    <tr>
                      <th width="20%">Product Name</th>
                      <th width="20%">Quantity</th>
                      <th>Price $: </th>
                      <th width="10%"> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsInCart}
                    </tbody>
                  </Table>
                </Container>
                <h3>Total cost $: {cartTotal}</h3>
                </div>

            </div>
             )
        }
//The following code matches State to props
const mapStateToProps = state=>({
  basketProps:state.basketState
})
//The following two functions dispatch events to props

 const increaseQuantity = (action,name)=>{
  return(dispatch)=>{
      dispatch({
          type:action ==="increase" ? INCREASE_QUANTITY:DECREASE_QUANTITY,
          payload:name
      })

  }
}
 const clearProduct = (action,name)=>{
  return(dispatch)=>{
       dispatch({
          type: CLEAR_PRODUCT,
          payload:name
      })

  }
}

export default connect(mapStateToProps,{increaseQuantity,clearProduct})(Cart)