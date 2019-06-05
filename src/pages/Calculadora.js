import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { ARRAY_HOURS, ARRAY_MINUTES, calculateSleep, calculateWakeUp } from '../utils';

class Calculadora extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingWakeUp: false,
      loading: false,
      error: null,
      result: [],
      resultWakeUp: []
    };
    this.hour = React.createRef();
    this.minutes = React.createRef();
    this.type = React.createRef();

    this.calculateSleep = this.calculateSleep.bind(this);
    this.calculateWakeUp = this.calculateWakeUp.bind(this);
    this.reload = this.reload.bind(this);
    this.reloadWakeUp = this.reloadWakeUp.bind(this);
  }

  calculateSleep() {
    this.setState({ loading: true, disabled: true });
    const hour = this.hour.current.value;
    const minutes = this.minutes.current.value;
    const type = this.type.current.value;

    if (hour !== '' && minutes !== '') {
      let formattedHour = parseInt(hour);
      const formattedMinutes = parseInt(minutes);
      const result = calculateSleep(formattedHour, formattedMinutes, type);
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

  calculateWakeUp(e) {
    e.preventDefault();
    this.setState({ loadingWakeUp: true });
    const actualDateTime = new Date();
    const hour = actualDateTime.getHours();
    const finalHour = hour > 12 ? hour - 12 : hour;
    const type = hour > 12 ? 'pm' : 'am';
    const minutes = actualDateTime.getHours();
    const result = calculateWakeUp(finalHour, minutes, type);
    this.setState({ loadingWakeUp: false, resultWakeUp: result });
  }

  reload() {
    this.hour.current.value = '';
    this.minutes.current.value = '';
    this.setState({ loading: false, disabled: false, result: [], error: null });
  }

  reloadWakeUp() {
    this.setState({ loadingWakeUp: false, resultWakeUp: [] });
  }

  render() {
    const { error, result, disabled, resultWakeUp, loading, loadingWakeUp } = this.state;
    return (
      <div>
        <Helmet>
          <title>Calcula a qué hora tienes que despertar</title>
          <meta name="description" content="testing react helmet" />
          <meta name="keywords" cpntent="react,seo,helmet" />
        </Helmet>
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
            <button onClick={this.calculateSleep} title="Calcular a qué hora me tengo que dormir">
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
            {loading && <span>Cargando...</span>}
            <div className="resultsDiv">
              {result.map((item, i) => (
                <span key={i}>
                  {item.hour}:{item.minutes} {item.type.toUpperCase()}
                </span>
              ))}
            </div>
            <button className="backButton" onClick={this.reload} title="Reiniciar">
              <img
                width="40"
                src={require('../images/circular-arrow.svg')}
                alt="¿Cuántas horas hay que dormir?"
              />
              <span>Reiniciar</span>
            </button>
          </div>
        ) : null}
        {error && <p>{error}</p>}
        <div>
          <p>¿A qué hora me debería despertar si me duermo ahora?</p>
          <div className="calculateDiv">
            <button onClick={this.calculateWakeUp} title="Calcular a qué hora me debería despertar">
              <img
                width="40"
                src={require('../images/slumber.svg')}
                alt="¿Cuántas horas hay que dormir?"
              />
              <span>Dormir</span>
            </button>
          </div>
        </div>

        {resultWakeUp.length ? (
          <div className="results">
            <p>Te deberías despertar a estas horas:</p>
            {loadingWakeUp && <span>Cargando...</span>}
            <div className="resultsWakeUpDiv">
              {resultWakeUp.map((item, i) => (
                <span key={i}>
                  {item.hour}:{item.minutes} {item.type.toUpperCase()}
                </span>
              ))}
            </div>
            <button className="backButton" onClick={this.reloadWakeUp} title="Reiniciar">
              <img
                width="40"
                src={require('../images/circular-arrow.svg')}
                alt="¿Cuántas horas hay que dormir?"
              />
              <span>Reiniciar</span>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Calculadora;
