//import './OracleApp.scss'
import axios from "axios";
import { useState, useEffect } from "react";
import TextUpload from "./components/TextUpload";
import ListTexts from "./components/ListTexts";

function OracleInit({ textId, activateOracle, onSelectTextId }) {
  return (
    <div className="container flex gap-5">
      <div>
      <ListTexts activeText={textId} onSelectTextId={onSelectTextId} />
      {textId && (
        <div>
          <button className="block px-2 py-2 border border-black my-4 cursor-pointer" onClick={() => activateOracle()}>Comenzar</button>
        </div>
      )}
      </div>
      
      <TextUpload />
        
    </div>
  );
}

export default OracleInit;
