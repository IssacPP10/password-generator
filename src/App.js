import React, { useState, useEffect }  from "react";
import "./App.css";
import styled from "styled-components";
import { BotonIncrementar, BotonDisminuir, BotonCheck, BotonGenerar } from "./componentes/botones";
import generarPassword from "./funciones/generarPassword";

function App() {
  const [configuracion, cambiarConfiguracion] = useState({
    numeroDeCaracteres: 15,
    simbolos: true,
    numeros: true,
    mayusculas: true
  });

  const [passwordGenerada, cambiarPasswordGenerada] = useState('');
  useEffect(() => {
    cambiarPasswordGenerada(generarPassword(configuracion));
  }, [configuracion])

  const incrementarNumeroCaracteres = () => {
    cambiarConfiguracion((configAnterior) => {
      const nuevaConfig = {...configAnterior}
      nuevaConfig.numeroDeCaracteres += 1;
      return nuevaConfig;
    });
  }

  const disminuirNumeroCaracteres = () => {
    if (configuracion.numeroDeCaracteres > 1) {
      cambiarConfiguracion((configAnterior) => {
        const nuevaConfig = {...configAnterior}
        nuevaConfig.numeroDeCaracteres -= 1;
        return nuevaConfig;
      });  
    }
  }

  const toggleSimbolos = () => {
    cambiarConfiguracion((configAnterior) => {
      const nuevaConfig = {...configAnterior}
      nuevaConfig.simbolos = !nuevaConfig.simbolos
      return nuevaConfig;
    });  
  }

  const toggleNumeros = () => {
    cambiarConfiguracion((configAnterior) => {
      const nuevaConfig = {...configAnterior}
      nuevaConfig.numeros = !nuevaConfig.numeros
      return nuevaConfig;
    });  
  }

  const toggleMayusculas = () => {
    cambiarConfiguracion((configAnterior) => {
      const nuevaConfig = {...configAnterior}
      nuevaConfig.mayusculas = !nuevaConfig.mayusculas
      return nuevaConfig;
    });  
  }



  const onSubmit = (e) => {
    e.preventDefault();
    cambiarPasswordGenerada(generarPassword(configuracion));    
  }

  return (    
    <div className="contenedor">
      <div className="title">
        <h1>Password Generator</h1>
      </div>

      <form onSubmit={onSubmit}>
        <Fila>
          <label>Numero de caracteres:</label>
          <Controles>
            <BotonDisminuir click={disminuirNumeroCaracteres} />
            <span>{configuracion.numeroDeCaracteres}</span>
            <BotonIncrementar click={incrementarNumeroCaracteres} />
          </Controles>
        </Fila>
        <Fila>
          <label>¿Incluir simbolos?</label>
          <BotonCheck seleccionado={configuracion.simbolos} click={toggleSimbolos} />
        </Fila>
        <Fila>
          <label>¿Incluir numeros?</label>
          <BotonCheck seleccionado={configuracion.numeros} click={toggleNumeros} />
        </Fila>
        <Fila>
          <label>¿Incluir mayusculas?</label>
          <BotonCheck seleccionado={configuracion.mayusculas} click={toggleMayusculas} />
        </Fila>
        <Fila>
          <BotonGenerar />
          <Input type="text" readOnly={true} value={passwordGenerada} />
        </Fila>
      </form>
    </div>
  );
}

export default App;

const Fila = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Controles = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;

  & > * {
    flex: 1;
  }

  span {
    line-height: 40px;
    // background: #33257E;
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, .25);
  color: #fff;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    border: 1px solid rgba(255, 255, 255, .50);
  }

  &::selection {
    background: #212139;
  }
    
  &::-moz-selection {
    background: #212139;
  }
`;