import React,{Component} from 'react';
import Header from './Header'
import { Container,Table} from 'react-bootstrap';
import axios from 'axios'

//let serverUrl="http://localhost:8080";
let emptyCustomer = {
  firstName: '',
  lastName: '',
  email: ''
};

let emptyOrder = {
  id:'',
  product:'',
  quantity: '',
  price: '',
  name: '',
  email:'',
};
class Order extends Component {

      constructor(props){
        super(props)
        this.state={
            isLoaded:false,
            order:emptyOrder,
            customer:emptyCustomer
        }
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleDelete=this.handleDelete.bind(this);      
     }
      handleQuantityChange=(event)=>{

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.order};
        item[name] = value;
        this.setState({item});
     
      event.preventDefault();
  }
     async  handleUpdate(e){
      let id =parseInt(e.target.value);
      alert("updateList calles"+e.target.value)
      console.log("Update list item");
       this.state.order.findIndex(order => order.id === id);
       let url=`https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1//order/${id}`    
       let data={
        product: this.state.order.product,
        quantity:this.state.order.quantity,  
        price:this.state.order.price,  
        name:this.state.order.name,  
        email:this.state.order.email,  
    }    
    //symbol post 
    try{
       const status= await axios.put(url, data)
        console.log(" data save is",status)
    }
    catch(e){
    console.log(e);
    }

    }          

      async handleDelete(e) {
        let id =e.target.value;
        alert("delete calles"+e.target.value)
        let deleteUrl=`https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1//orderd/{id}`   
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
          await axios.delete(deleteUrl,config)
          let updatedList = [...this.state.order].filter(i => i.id !== id);
          this.setState({order: updatedList});
      
          window.location.reload();
          e.preventDefault();
      }          


    async componentDidMount(){
        console.log(" indide order component did mount")
        axios.headers={
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json', 
        }
        try{
          let url="https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/orders"    
            const response = await axios.get(url);
             const results = response.data;
             console.log(" results in order 1",results)
             this.setState({order: results, isLoaded: true});

        }
        catch (e){
          console.log(e);
        }
     }
    render=()=>{
      let orderList=''
              if(this.state.order!==null && this.state.order!==undefined && (this.state.order.length>0))
                orderList = this.state.order.map((item,index)=>{
                     return(

                    <tr key={index} >
                            <td >{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.product}</td>
                            <td>{item.price}
                            </td>
                            <td>{item.quantity} 
                             </td>                        
                          </tr>
                        )
                  })

                return (
                    <div className="App">
                      <div className="product">
                      <Header/>
                         <Container>
                           <h3>Orders List is:</h3>
                            <Table className="mt-4">
                            <thead>
                            <tr>
                            <th width="20%">Customer</th>
                            <th width="20%">Email</th>
                            <th>Product</th>
                            <th width="10%">Price $: </th>
                            <th width="10%">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderList}
                            </tbody>
                            </Table>
 
                        </Container>
           
                      </div>
                   </div>
                );
              
 }
 };

 
export default Order;






 