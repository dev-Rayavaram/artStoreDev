import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {getNumbers} from './actions/getAction'

function Header(props) {
  console.log("props in header",props)
    useEffect(()=>{
      getNumbers();
    },[]
  )
    return (
    <div className="header">
        <div className="cart">
            <img  src= {require(`../images/cart.jpeg`)} style={{"width":"50px","height":"50px"}} alt="tanjore"  fluid="true" />           
              <b>{props.basketProps.noOfProducts}</b>
        </div>
      </div>

    );
};
    
const mapStateToProps = state=>({
  basketProps:state.basketState
})
export default connect(mapStateToProps,{getNumbers})(Header);