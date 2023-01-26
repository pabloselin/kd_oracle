import { useState } from "react";
import TextUpload from "./components/TextUpload";
import ListTexts from "./components/ListTexts";

function OracleInit({ textId, activateOracle, onSelectTextId }) {
  const [newUpload, setNewUpload] = useState(false);

  const handleUploadResponse = (uploadResponse) => {
    if (uploadResponse) {
      setNewUpload(true);
    }
  }

  return (
    <>
    <div className="container flex gap-5">
      <div>
      <ListTexts activeText={textId} onSelectTextId={onSelectTextId} newUpload={newUpload} />
      
      </div>
      <TextUpload passUploadResponse={(uploadResponse) => {handleUploadResponse(uploadResponse)}}/>
        
    </div>
    <div className="container text-center">
      {textId && (
        <div>
          <button className="block px-2 py-2 border border-black my-4 cursor-pointer mx-auto bg-white text-black text-4xl font-display" onClick={() => activateOracle()}>Comenzar</button>
        </div>
      )}
    </div>
    </>
  );
}

export default OracleInit;
