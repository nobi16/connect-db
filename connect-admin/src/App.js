import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './Screens/LandingScreen/LandingPage';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import Header from "./components/Header.js";
import MyBusinesses from "./Screens/MyBusinesses/MyBusinesses.js";
import SingleBusiness from "./Screens/singleBusinesses/singleBusinesses.js";
import SingleService from "./Screens/singleSingleServices/singleSingleServices.js";
import SingleProduct from "./Screens/singleSingleProducts/singleSingleProducts.js";
import MyServices from './Screens/ServicesScreen/Services.js';
import MyProducts from './Screens/ProductsScreen/Products.js';
import CreateBusiness from './Screens/CreateBusiness/CreateBusiness';
import Createservice from './Screens/Createservice/Createservice.js';
import Createproduct from './Screens/Createproduct/Createproduct.js';
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen.js";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <Route path="/" component={LandingPage} exact/>
      <Route path="/login" exact component={LoginScreen} />
      <Route path="/register" exact component={RegisterScreen} />
      <Route path="/createbusiness" exact component={CreateBusiness} />
      <Route path="/createservice" exact component={Createservice} />
      <Route path="/createproduct" exact component={Createproduct} />
      <Route
          path="/mynotes"
          component={({ history }) => (
            <MyBusinesses search={search} history={history} />
          )}
        />
      <Route path="/services" exact component={MyServices} />
      <Route path="/products" exact component={MyProducts} />
      <Route path="/business/:id" component={SingleBusiness} />
      <Route path="/service/:id" component={SingleService} />
      <Route path="/product/:id" component={SingleProduct} />
      <Route path="/profile" component={ProfileScreen} />

    </Router>
  )
}

export default App