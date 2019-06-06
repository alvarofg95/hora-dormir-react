import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header>
    <Link to="/" title="Inicio">
      Inicio
    </Link>
    <Link to="/calculadora" title="Inicio">
      Calculadora
    </Link>
  </header>
);
