import { useState } from "react";
import TextUpload from "./components/TextUpload";
import ListTexts from "./components/ListTexts";

function OracleInit({ textId, activateOracle, onSelectTextId, textTitle }) {
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
        <div className="my-10">
          <p><em>Piensa en una pregunta y haz clic o pulsa el botón de más abajo</em></p>
          <button className="block px-2 py-2 border border-black my-4 cursor-pointer mx-auto bg-white text-black text-4xl font-display" onClick={() => activateOracle()}>Preguntar con {textTitle}</button>
        </div>
      )}
    </div>
    </>
  );
}

export default OracleInit;
