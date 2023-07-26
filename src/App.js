import React, { useState, useEffect } from "react";
import "./App.css";
import ApiService from "./Api";

const encryptedMessages = /^([^\d]+)0+([^\d]+)0+(\d+)$/;

function App() {
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [error, setError] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrypt = async () => {
    try {
      setIsLoading(true);
      const decryptedMessage = await ApiService.decryptMessage(encryptedMessage);
      setDecryptedMessage(decryptedMessage);
      setError(""); 
    } catch (error) {
      console.error(error);
      setError("Error al intentar conectarse. Inténtalo de nuevo"); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isInputEmpty = encryptedMessage.trim() === "";

    const isValidFormat = encryptedMessages.test(encryptedMessage);
  
    setIsInputEmpty(isInputEmpty || !isValidFormat);
  }, [encryptedMessage]);

  return (
    <div className="app">
      <div className="content">
        <h1 className="title">Bienvenido. Desencripta tu mensaje.</h1>
        
        <input
          type="text"
          placeholder="Enter encrypted message"
          value={encryptedMessage}
          onChange={(e) => setEncryptedMessage(e.target.value)}
        />
        <button
          id="decryptButton"
          onClick={handleDecrypt}
          disabled={isInputEmpty}
        >
          Desencriptar
        </button>
        {error && <p className="error">{error}</p>}
        {!error && !isLoading && decryptedMessage && (
         <div className="card">
         <h2 className="card-title">Mensaje descifrado:</h2>
         <div className="card-content">
           <p className="card-subtitle">Nombre: {decryptedMessage.first_name || "Emtpy First Name"}</p>
           <p className="card-subtitle">Apellido: {decryptedMessage.last_name || "Empty Last Name"}</p>
           <p className="card-subtitle">ID: {decryptedMessage.id || "Empty ID"}</p>
         </div>
       </div>
       
       
        )}
        {isLoading}

        <h2 className="subtitle">Creado Por Eduardo Rodriguez Romo</h2>
      </div>
      
    </div>
    
  );
}

export default App;
