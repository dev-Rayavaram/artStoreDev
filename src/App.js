import React from 'react';
//import 'normalize.css'; // Note this;
import Home from './components/Home';
import Contact from './components/Contact';
import Customer from './components/Customer'
import Order from './components/Order';
import Product from './components/Products'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import User from './components/User'
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
import './App.scss'


function App() {
  return (
      <div className="App">
          <Router>
            <Navbar/>
            <Switch>
              <Route exact path='/product' component={Product}/>
              <Route exact path='/order/' component={Order}/>
              <Route exact path='/cart' component={Cart}/>
              <Route exact path='/contact' component={Contact}/>
              <Route exact path='/Home' component={Home}/>
              <Route exact path ='/customer' component={Customer}/>
              <Route exact path='/User' component={User}/>

              <Route exact path='/'  component={Home}/>

            </Switch>
          </Router>
        </div>
 );
}

export default App;
