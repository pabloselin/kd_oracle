import { useState } from "react";
import TextUpload from "./components/TextUpload";
import ListTexts from "./components/ListTexts";

function OracleInit({ textId, activateOracle, onSelectTextId, textTitle }) {
  const [newUpload, setNewUpload] = useState(false);

  const handleUploadResponse = (uploadResponse) => {
    if (uploadResponse) {
      setNewUpload(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="my-10 text-2xl text-center">
          <p>Gestos oraculares para cualquier tipo de texto.</p>
          <p>Puedes probar con la lista de textos o subir tu propio texto para obtener una respuesta aleatoria.</p>
        </div>
        <div className="flex gap-10">
          <ListTexts
            activeText={textId}
            onSelectTextId={onSelectTextId}
            newUpload={newUpload}
          />

          <TextUpload
            passUploadResponse={(uploadResponse) => {
              handleUploadResponse(uploadResponse);
            }}
          />
        </div>
      </div>
      <div className="container text-center">
        {textId && (
          <div className="my-10">
            <p>
              <em>
                Piensa en una pregunta y haz clic o pulsa el botón de más abajo
              </em>
            </p>
            <button
              className="block rounded-xl px-4 py-4 border border-black my-4 cursor-pointer mx-auto bg-white text-black text-4xl font-display hover:bg-green-200"
              onClick={() => activateOracle()}
            >
              Preguntar con {textTitle}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default OracleInit;
