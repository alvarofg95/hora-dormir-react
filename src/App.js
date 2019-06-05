import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import Calculadora from './pages/Calculadora';
import Home from './pages/Home';

export default withRouter(() => (
  <div className="container">
    <Route exact path="/" component={Home} />
    <Route exact path="/calculadora" component={Calculadora} />
  </div>
));
