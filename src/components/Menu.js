import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      open: false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 400) {
      this.setState({ mobile: true });
    }
  }

  openMenu() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  render() {
    const { mobile, open } = this.state;
    return mobile ? (
      <div className="divMenu">
        <button className="btnMenu" onClick={this.openMenu}>
          <Image className="iconMenu" src={require('../images/menu.svg')} />
        </button>
        {open ? (
          <div>
            <Link className="menuItem" to="/" title="Inicio">
              Inicio
            </Link>
            <Link className="menuItem" to="/calculadora" title="Inicio">
              Calculadora
            </Link>
          </div>
        ) : null}
      </div>
    ) : (
      <header>
        <Link to="/" title="Inicio">
          Inicio
        </Link>
        <Link to="/calculadora" title="Inicio">
          Calculadora
        </Link>
      </header>
    );
  }
}

export default Menu;
