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
    this.minutes.current.value = '00';
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
          <meta name="description" content="Calcular a qué hora me tengo que despertar si me duermo ahora y a qué hora me tengo que dormir para despertar a una determinada hora" />
          <meta name="keywords" content="Dormir, Sueño, Hora, Hora de dormir, Calculadora, Calcular hora despertar, despertar bien, a qué hora me tengo que dormir" />
        </Helmet>
        <h1>¿Cuántas horas hay que dormir?</h1>
        <p>
          Nuestra calculadora funciona contando hacia atrás en ciclos de sueño. Si te despiertas
          durante ciclo de sueño te sentirás muy agotado y algo atontado, ¡pero despertarte entre
          ciclos te hará sentir renovado y espabilado!
        </p>

        <h2 className="font-size-25">
          A qué hora me tengo que dormir si me quiero despertar a las...
        </h2>
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
            <p>
              Los seres humanos tardamos 14 minutos en quedarnos dormidos, no olvides tenerlo en
              cuenta para tu planificación.
            </p>
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
          <h2 className="font-size-25">¿A qué hora me debería despertar si me duermo ahora?</h2>
          {!resultWakeUp.length ? (
            <div className="calculateDiv">
              <button
                onClick={this.calculateWakeUp}
                title="Calcular a qué hora me debería despertar"
              >
                <img
                  width="40"
                  src={require('../images/slumber.svg')}
                  alt="¿Cuántas horas hay que dormir?"
                />
                <span>Dormir</span>
              </button>
            </div>
          ) : null}
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
            <p>
              Se considera que se ha dormido bien cuando se han completado de 5 a 6 ciclos de sueño.
            </p>
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
