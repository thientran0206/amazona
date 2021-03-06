import React from 'react';
import './App.css';
import {BrowserRouter,Route ,Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import HomeManagerScreen from './screens/HomeManagerScreen';
function App() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  console.log(userInfo);
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to='/'>amazona</Link>
                </div>
                <div className="header-links">
                    <div><a href="cart.html">Cart</a> </div>
                    {
                        userInfo ? <div className="dropdown show">
                                        <a className="dropdown-toggle" role="button" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{userInfo.name}</a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                            {userInfo.isAdmin && <Link className="dropdown-item" to="/products">Management Product</Link>}
                                            <a className="dropdown-item" href="#">Log out</a>
                                        </div>
                                    </div>
                        :<div> <Link to="/signin">Singin</Link></div>
                    }
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="index.html">Pants</a>
                    </li>
                    <li>
                        <a href="index.html">Shirts</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/products" component ={ProductsScreen} />
                    <Route path="/product/:id" component ={ProductScreen} />
                    <Route path="/shipping" component ={ShippingScreen} />
                    <Route path="/payment" component ={PaymentScreen} />
                    <Route path="/placeorder" component ={PlaceOrderScreen} />
                    <Route path="/signin" component ={SigninScreen} />
                    <Route path="/register" component ={RegisterScreen} />
                    <Route path="/cart/:id?" component ={CartScreen} />
                    <Route path ="/" exact={true} component={HomeScreen} />
                    <Route path ="/manager" exact={true} component={HomeManagerScreen} />
                </div>
            </main>
            <footer className="footer">
                All right reserved
            </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
