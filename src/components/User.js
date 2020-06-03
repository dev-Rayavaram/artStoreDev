import React,{Component} from 'react';
import axios from 'axios';
import {Form,Button} from 'react-bootstrap'
import Header from './Header'; 
class User extends Component {
    emptyItem = {
        id:'',
        name:'',
        email: '',
        phoneNumber:''
      };
    constructor(props){
        super(props)
        this.state = {
            customer: this.emptyItem,
            userAdded:false
          };
        this.handleAdd=this.handleAdd.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
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
    async handleAdd(event) {
        event.preventDefault();
        alert("button clicked");
        console.log("this.state",this.state)
        let data={
                name: this.state.customer.name ,
                email:this.state.customer.email,  
                phoneNumber:this.state.customer.phoneNumber                      
            }    
            //symbol post 
            try{
                const status= await axios.post("https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/customer", data)
                console.log(" data  added",status)
                this.setState({userAdded:true})
                this.setState({customer:status.data})
            }
            catch(e){
            console.log(e);
            }       
    }
    async handleUpdate(event) {
        event.preventDefault();
        alert("button clicked");
        console.log("this.state inside update",this.state.customer.id)
        if(this.state.userAdded){
            let data={
                name: this.state.customer.name ,
                email:this.state.customer.email,  
                phoneNumber:this.state.customer.phoneNumber                      
            }    
            //symbol post 
            try{
                const status= await axios.put(`https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/customer/${this.state.customer.id}`, data)
                console.log(" data save is",status)
            }
            catch(e){
            console.log(e);
            }       
        }
        else{
            alert("user not found")
        }
       }
    async handleDelete(event) {

        event.preventDefault();
        alert("button clicked");
        console.log("this.state",this.state)
        if(this.state.userAdded){

             try{
                const status= await axios.delete(`https://cors-anywhere.herokuapp.com/https://art-store-second.herokuapp.com/store_api/v1/customerd/${this.state.customer.id}`)
                console.log(" data save is",status)
                this.setState({customer:{}})
            }
            catch(e){
            console.log(e);
            }
        }else{
            alert("user not found")
        }       
    }
 
     render(){
        return (
            <div className='App'>
                <div className='product'>
                <Header/>
                <br/>
                <h3 className="title">Enter Your Contact Information:</h3>
                     <Form>
                <Form.Group>
                    <Form.Label >Name</Form.Label>
                    <input type="text" name="name" className="form-control" id="name" value={this.state.customer.name || ''}
                        onChange={this.handleChange} autoComplete="lastName"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label  >Email</Form.Label>
                    <input type="text" className="form-control" name="email" id="email" value={this.state.customer.email || ''}
                        onChange={this.handleChange} autoComplete="email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <input type="text"  className="form-control" name="phoneNumber" id="phone" value={this.state.customer.phoneNumber || ''}
                        onChange={this.handleChange} autoComplete="phone"/>
                </Form.Group>
      
                <Form.Group>
                <Button variant="primary" type="button" className="btn btn-primary" onClick={this.handleAdd}>Subscribe</Button>
                </Form.Group> 
                <Form.Group>
                <Button variant="primary" type="button" className="btn btn-info" onClick={this.handleUpdate}>Update</Button>
                </Form.Group>       
                <Form.Group>
                <Button variant="primary" type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                </Form.Group>       
                </Form>
                </div>
            </div>
        
            );
    }
   
};
    

  export default User