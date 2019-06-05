import React, { Component } from 'react';
import { ARRAY_HOURS, ARRAY_MINUTES, calculate } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      result: []
    };
    this.hour = React.createRef();
    this.minutes = React.createRef();
    this.type = React.createRef();

    this.calculate = this.calculate.bind(this);
    this.reload = this.reload.bind(this);
  }

  calculate() {
    this.setState({ loading: true, disabled: true });
    const hour = this.hour.current.value;
    const minutes = this.minutes.current.value;
    const type = this.type.current.value;

    if (hour !== '' && minutes !== '') {
      let formattedHour = parseInt(hour);
      const formattedMinutes = parseInt(minutes);
      const result = calculate(formattedHour, formattedMinutes, type);
      this.setState({ error: null, loading: false, result });
    } else {
      let error = 'No has seleccionado ni las horas ni los minutos';
      if (hour === '' && minutes !== '') {
        error = 'No has seleccionado la hora a la que te quieres despertar';
      } else if (hour !== '' && minutes === '') {
        error = 'Debes especificar en qué minuto quieres despertar';
      }
      this.setState({ error, loading: false, disabled: false });
    }
  }

  reload() {
    this.hour.current.value = '';
    this.minutes.current.value = '';
    this.setState({ loading: false, disabled: false, result: [], error: null });
  }

  render() {
    const { error, result, disabled } = this.state;
    return (
      <div>
        <h1>¿Cuántas horas hay que dormir?</h1>
        <p>A qué hora me tengo que dormir si me quiero despertar a las...</p>
        <div className="timeSelector">
          <select disabled={disabled} ref={this.hour} className="selector">
            <option value="">Hora</option>
            {ARRAY_HOURS.map(hour => (
              <option key={hour} value={`${hour}`}>
                {hour}
              </option>
            ))}
          </select>
          <select disabled={disabled} ref={this.minutes} className="selector">
            <option value="">Minutos</option>
            {ARRAY_MINUTES.map(minutes => (
              <option key={minutes} value={`${minutes}`}>
                {minutes}
              </option>
            ))}
          </select>
          <select disabled={disabled} ref={this.type}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
        {!result.length && (
          <div className="calculateDiv">
            <button onClick={this.calculate}>
              <img
                width="40"
                src={require('../images/alarm-clock.svg')}
                alt="¿Cuántas horas hay que dormir?"
              />
              <span>Calcular</span>
            </button>
          </div>
        )}
        {result.length ? (
          <div className="results">
            <p>Te deberías intentar quedar dormido a estas horas:</p>
            <div className="resultsDiv">
              {result.map((item, i) => (
                <span key={i}>
                  {item.hour}:{item.minutes} {item.type.toUpperCase()}
                </span>
              ))}
            </div>
            <button className="backButton" onClick={this.reload}>
              <img
                width="40"
                src={require('../images/circular-arrow.svg')}
                alt="¿Cuántas horas hay que dormir?"
              />
              <span>Volver</span>
            </button>
          </div>
        ) : null}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default Home;
