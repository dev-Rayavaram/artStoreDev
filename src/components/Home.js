import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
var initialLoad=true;
class Home extends Component {
      constructor(props){
        super(props)
          this.state={
              isLoaded:false
          }
        }
      
      async componentDidMount(){
        let body=[];
        if(initialLoad){
              if(this.props.basketProps.products !==null && this.props.basketProps.products!== undefined){
                Object.keys(this.props.basketProps.products).forEach(element => {
                        let product={
                                    product:this.props.basketProps.products[element].product,
                                    quantity:this.props.basketProps.products[element].quantity,
                                    price:this.props.basketProps.products[element].price,
                                    urlSm:this.props.basketProps.products[element].urlSm,
                                    urlLg:this.props.basketProps.products[element].urlLg

                                  }
                            body.push(product);
                            axios.post("https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/products", body);
                            this.setState({isLoaded:true});
                            initialLoad=false;
                
            })
            console.log("outside body:",body);
                      
          }
        }
       

  }
  render() {
    return (
      <div className="App">

      <div className='home'>
        <h1>      
            <span> GATEWAY TO INDIAN ART</span>      
        </h1>
       </div>
       </div>
    );
  }
}

const mapStateToProps = state=>({
  basketProps:state.basketState
})
export default connect(mapStateToProps)(Home)