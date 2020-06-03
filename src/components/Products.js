import React from 'react';
import { Button } from 'react-bootstrap';
 import Header from './Header';
 import {connect} from 'react-redux';

function Product(props){
  let productList=''
  let productsInCart=[];
  console.log("props inside product",props);
  if(props.basketProps !==null && props.basketProps !== undefined && props.basketProps.products!==undefined){
      Object.keys(props.basketProps.products).forEach(element => {
          productsInCart.push(props.basketProps.products[element])
        })
      }
      productList = productsInCart.map((item,index)=>{
        return(
          <>
          <li key={index}>
           <div className="product-details">

            <img  src= {require(`../images/${item.urlSm}`)} style={{"width":"150px","height":"150px"}} alt="tanjore"  fluid="true" />
            Name:{item.product}<br></br>
              Price $ :{item.price}<br></br>
              Quantity:{item.quantity}
          </div>
          <Button className="button" type="button" value="button" onClick ={()=>props.addProduct(`${item.product}`)}>CART</Button>

          </li>
        </>

        )
        })

          return (
                  <div className='App'>
                    <div className='product'>
                        <Header/>
                        <br></br>
                            <ul>
                              {productList}
    
              </ul>
              </div>
              </div>
)
};
    
const mapStateToProps = state=>({
  basketProps:state.basketState
})
const mapDispatchToProps =(dispatch)=>{
  return{
    addProduct:(product)=>{dispatch({
      type:'ADD_PRODUCT_BASKET',product:product
    })}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)