//import './OracleApp.scss'
import axios from "axios";
import { useState, useEffect } from "react";
import TextUpload from "./components/TextUpload";
import ListTexts from "./components/ListTexts";

function OracleInit({ textId, activateOracle, onSelectTextId }) {
  return (
    <div>
      <h2>Textos disponibles</h2>
      <p>
        Escoge un texto para utilizar de referencia para generar la respuesta.
      </p>
      <ListTexts activeText={textId} onSelectTextId={onSelectTextId} />
      {textId && (
        <div>
          <button onClick={() => activateOracle()}>Comenzar</button>
        </div>
      )}
      <h3>Sube tu propio texto</h3>
      <TextUpload />
     
    </div>
  );
}

export default OracleInit;
