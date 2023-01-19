import { useState, useEffect } from "react";
import OracleInit from "./OracleInit";
import OracleQuestion from "./components/OracleQuestion";

function OracleWrapper() {
  const [oracleActive, setOracleActive] = useState(false);
  const [textId, setTextId] = useState(null);

  const onSelectTextId = (id) => {
    setTextId(id);
  };

  const activateOracle = () => {
    setOracleActive(true);
  }

  return (
    <main className="oracle-wrapper">
      <header className="OracleApp-header">
        <h1>Oracle</h1>
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
