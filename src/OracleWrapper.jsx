import "./Oracle.css";
import { useState, useEffect } from "react";
import OracleInit from "./OracleInit";
import OracleQuestion from "./components/OracleQuestion";

function OracleWrapper() {
  const [oracleActive, setOracleActive] = useState(false);
  const [textId, setTextId] = useState(null);
  console.log(import.meta.env.MODE);
  
  const onSelectTextId = (id) => {
    setTextId(id);
  };

  const activateOracle = () => {
    setOracleActive(true);
  }

  return (
    <main className="container mx-auto px-4 mt-10">
      <header className="px-4">
        <h1 className="text-6xl mb-5 font-display text-center">Oráculo autogenerado</h1>
      </header>
      
      {oracleActive ? (
        <OracleQuestion textId={textId}/>
      ) : (
        <OracleInit textId={textId} activateOracle={activateOracle} onSelectTextId={onSelectTextId}/>
      )}
      
    </main>
  );
}

export default OracleWrapper;
