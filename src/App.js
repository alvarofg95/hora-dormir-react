import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import Calculadora from './pages/Calculadora';
import Home from './pages/Home';
import Menu from './components/Menu';
import Footer from './components/Footer';

export default withRouter(() => (
  <div className="container">
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/calculadora" component={Calculadora} />
    <Footer />
  </div>
));
