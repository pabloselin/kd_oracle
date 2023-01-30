import "./Oracle.css";
import { useState, useEffect } from "react";
import OracleInit from "./OracleInit";
import OracleQuestion from "./components/OracleQuestion";

function OracleWrapper() {
  const [oracleActive, setOracleActive] = useState(false);
  const [textId, setTextId] = useState(null);
  const [textTitle, setTextTitle] = useState(null);
  
  const onSelectTextId = (id, title) => {
    setTextId(id);
    setTextTitle(title);
  };

  const activateOracle = () => {
    setOracleActive(true);
  }

  return (
    <main className="container mx-auto px-4 mt-10">
      <header className="px-4">
        <h1 className="text-6xl mb-5 font-display text-center cursor-pointer hover:text-gray-400" onClick={() => setOracleActive(false)}>Toracle</h1>
      </header>
      
      {oracleActive ? (
        <OracleQuestion textId={textId}/>
      ) : (
        <OracleInit textTitle={textTitle} textId={textId} activateOracle={activateOracle} onSelectTextId={onSelectTextId}/>
      )}
      
    </main>
  );
}

export default OracleWrapper;
