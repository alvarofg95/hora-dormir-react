import React, { Component } from 'react';
import { ARRAY_HOURS, ARRAY_MINUTES, calculate } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.hour = React.createRef();
    this.minutes = React.createRef();
    this.type = React.createRef();

    this.calculate = this.calculate.bind(this);
  }

  calculate() {
    const hour = this.hour.current.value;
    const minutes = this.minutes.current.value;
    const type = this.type.current.value;

    if (hour !== '' && minutes !== '') {
      let formattedHour = parseInt(hour);
      const formattedMinutes = parseInt(minutes);
      if (type === 'pm') {
        formattedHour += 12;
      }
      calculate(formattedHour, formattedMinutes);
      this.setState({ error: null });
    } else {
      let error = 'No has seleccionado ni las horas ni los minutos';
      if (hour === '' && minutes !== '') {
        error = 'No has seleccionado la hora a la que te quieres despertar';
      } else if (hour !== '' && minutes === '') {
        error = 'Debes especificar en qué minuto quieres despertar';
      }
      this.setState({ error });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <h1>¿Cuántas horas hay que dormir?</h1>
        <p>A qué hora me tengo que dormir si me quiero despertar a las...</p>
        <div className="timeSelector">
          <select ref={this.hour} className="selector">
            <option value="">Hora</option>
            {ARRAY_HOURS.map(hour => (
              <option value={`${hour}`}>{hour}</option>
            ))}
          </select>
          <select ref={this.minutes} className="selector">
            <option value="">Minutos</option>
            {ARRAY_MINUTES.map(minutes => (
              <option value={`${minutes}`}>{minutes}</option>
            ))}
          </select>
          <select ref={this.type}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
        <div className="calculateDiv">
          <button onClick={this.calculate}>
            <img
              width="50"
              src={require('../images/alarm-clock.svg')}
              alt="¿Cuántas horas hay que dormir?"
            />
            <span>Calcular</span>
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default Home;
