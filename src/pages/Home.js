import React from 'react';
import { Helmet } from 'react-helmet';
import Image from '../components/Image';

export default () => (
  <div className="homeJustify">
    <Helmet>
      <title>¿Cuántas horas hay que dormir?</title>
      <meta name="description" content="La web que te muestra la importancia de dormir más de 6 horas y te calcula cuántas horas hay que dormir para despertarte correctamente" />
      <meta name="keywords" content="Dormir, Sueño, Hora, Hora de dormir, Calculadora, Calcular hora despertar, despertar bien" />
    </Helmet>
    <h1>¿Cuántas horas hay que dormir?</h1>
    <p>
      Todo el mundo sabe que para mantener una vida saludable hace falta tener una serie de hábitos
      que nos ayudan a mejorar nuestra salud física y mental, al pensar en estos hábitos a todos se
      nos vienen a la cabeza actividades como <i>hacer deporte</i>, <i>dieta sana</i>,{' '}
      <i>no beber</i>, <i>no fumar</i>, etc., pero poca gente se acuerda de que nuestro sueño es uno
      de los factores más importantes para la salud.
    </p>
    <p>
      Por desgracia hoy en día a todos nos cuesta dormir bien y el resultado es tener a personas con
      energía el lunes y el martes, pero a medida que avanza la semana nos vamos agotando más y más
      esperando a que llegue el fin de semana para poder dormir plácidamente y descansar por fin.
    </p>
    <p>
      Siento decirte que de esa forma no se descansa correctamente, y el descanso es tan importante
      o más que cualquier otro hábito saludable y desde <b>Hora de Dormir</b> queremos hacerte ver que
      tienes que cuidar tu sueño.
    </p>

    <h2>Desventajas de no dormir correctamente</h2>
    <ul>
      <li>
        <b>Falta de energía</b>: no dormir nos puede suponer estar constantemente en un estado de
        agotamiento que además de generar pereza, frena nuestras capacidades, no dejando a nuestro
        cuerpo y mente reaccionar con rapidez.
      </li>
      <li>
        <b>Falta de concentración</b>: la falta de concentración es uno de las grandes desventajas
        de no dormir las horas que necesitamos, ya que este problema afecta directamente a nuestra
        productividad a la hora de trabajar y a nuestra capacidad de aprendizaje en el estudio por
        ejemplo.
      </li>
      <li>
        <b>Obesidad</b>: dormir pocas horas provoca en nuestro cuerpo la necesidad de comer
        productos ricos en grasa y en calorías, lo cual puede derivar en <b>obesidad</b>, y por lo
        tanto riesgo de sufrir <b>infartos</b>.
      </li>
    </ul>
    <Image
      className="imgHome"
      width="70%"
      src={require('../images/cansancio-no-dormir.jpg')}
      alt="Un mal descanso provoca somnolencia y cansancio a lo largo del día"
    />

    <h2>Ventajas de dormir correctamente</h2>
    <ul>
      <li>
        <b>Creatividad</b>: dormir correctamente hace que nuestro cerebro funcione mejor, por lo
        cual es más fácil dar rienda suelta a nuestra <b>imaginación</b> y ser más <b>creativos</b>.
      </li>
      <li>
        <b>Estamos más sanos</b>: nuestro sistema inmunológico se regenera mientras dormimos, lo que
        significa que si dormimos durante largo tiempo tendremos un organismo mucho más preparado
        para superar las <b>infecciones</b>.
      </li>
      <li>
        <b>Protege nuestro corazón</b>: la revista{' '}
        <a
          href="https://academic.oup.com/eurheartj"
          target="blank"
          title="Acceder a European Heart Journal"
        >
          European Heart Journal
        </a>{' '}
        publicó un estudio en el que se demuestra que las personas que sufren de insomnio tienen más
        posibilidades de sufrir una insuficiencia cardíaca que los que duermen bien.
      </li>
    </ul>
    <Image
      className="imgHome"
      width="70%"
      src={require('../images/descanso-correcto.jpg')}
      alt="Dormir las horas necesarias nos ayudan a fortalecer nuestras defensas"
    />
  </div>
);
