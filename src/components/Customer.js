import React,{Component} from 'react';
import axios from 'axios';
import {Form,Button} from 'react-bootstrap'
import Header from './Header';
import {connect} from 'react-redux';

const Key = process.env.REACT_APP_API_KEY;
 

class Customer extends Component {
    emptyItem = {
        firstName: '',
        lastName: '',
        email: ''
      };
    constructor(props){
        super(props)
        this.state = {
            customer: this.emptyItem
          };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let customer = {...this.state.customer};
        customer[name] = value;
        this.setState({customer});
      }
    async handleSubmit(event) {
        event.preventDefault();
        alert("button clicked");
        console.log("this.state",this.state)
        let number =(this.state.customer.phone)?(this.state.customer.phone):'';
        
        //symbol post 
        let url= `https://apilayer.net/api/validate?access_key=${Key}&number=${number}`
        console.log("url",url)
            try{
                const result=   await  axios.post(url, number);
                console.log("REsults for phone validation is :",result);
                if(result.data.valid){
                        let data={
                                name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
                                email:this.state.customer.email,  
                                phoneNumber:number                      
                            }    
                            //symbol post 
                            try{
                               const status= await axios.post("https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/customer", data)
                                console.log(" data save is",status)
                            }
                            catch(e){
                            console.log(e);
                            }
                            console.log(" props inside checkout ")
                            console.log(this.props)
                            let body={};
                            if(this.props.basketProps.products !==null && this.props.basketProps.products!== undefined){
                                Object.keys(this.props.basketProps.products).forEach(element => {
                                    if(this.props.basketProps.products[element].inCart){
                                        let order={
                                                    product:this.props.basketProps.products[element].product,
                                                    quantity:this.props.basketProps.products[element].quantity,
                                                    price:this.props.basketProps.products[element].price,
                                                    name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
                                                    email:this.state.customer.email
                                                }
                                                axios.post("https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/order", order);

                                        }
                                
                            })
                            console.log("outside body:",body);
                            alert("order submitted successfully")
                                      
                        }
                        
                }
            }
            catch(e){
                console.log(e);
            }
     
    }
     render(){
        return (
            <div className='App'>
                <div className='product'>
                <Header/>
                <br/>
                <h3 className="title">Enter Your Contact Information:</h3>
                <span> Your phone number will be validated ,and we will contact you.
                     Phone number format countrt code+phone number (14444444444)
                </span>
                {/* <Form className="form">
                    <Form.Row className="row">
                        <Form.Group as={Col} controlId="firstName">
                        <Form.Label className="label">First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange=
                        {this.handleChange}  value={this.state.customer.firstName}/>
                        </Form.Group>
                   </Form.Row>
                   <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                            <Form.Label className="label">Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" onChange=
                        {this.handleChange}  value={this.state.customer.lastName}/>
                        </Form.Group>
        
                    </Form.Row>
                     <Form.Row  className="row">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.customer.email}/>
                        </Form.Group>
                        </Form.Row>  
                        <Form.Row  className="row">
                            <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label className="label">Phone Number</Form.Label>
                            <Form.Control type="text"  placeholder="Enter PhoneNumber" onChange={this.handleChange}  value={this.state.customer.phone}/>
                            </Form.Group>
                        </Form.Row>                                                  
                          <Button variant="primary" type="button" className="btn btn-primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form> */}
                    <Form>
                    <Form.Group>
                    <Form.Label >First Name</Form.Label>
                    <input type="text" name="firstName" className="form-control" id="firstName" value={this.state.customer.firstName || ''}
                        onChange={this.handleChange} autoComplete="firstName"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label >Last Name</Form.Label>
                    <input type="text" name="lastName" className="form-control" id="lastName" value={this.state.customer.lastName || ''}
                        onChange={this.handleChange} autoComplete="lastName"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label  >Email</Form.Label>
                    <input type="text" className="form-control" name="email" id="email" value={this.state.customer.email || ''}
                        onChange={this.handleChange} autoComplete="email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <input type="text"  className="form-control" name="phone" id="phone" value={this.state.customer.phone || ''}
                        onChange={this.handleChange} autoComplete="phone"/>
                </Form.Group>
      
                <Form.Group>
                <Button variant="primary" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Check out</Button>
                </Form.Group>       
                </Form>
                    <a href="http://dev-Rayavaram.github.io/artStoreDev" style={{fontSize:'20px'}}>HOME</a>
                </div>
            </div>
        
            );
    }
   
};
    
const mapStateToProps = state=>({
    basketProps:state.basketState
  })
  export default connect(mapStateToProps)(Customer)