import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const response = await fetch(`https://api.adviceslip.com/advice/wrong`);

        if (!response.ok) {
          setErrorMessage("Something Went Wrong When Fetching Data!");
          return;
        }

        const data = await response.json();
        const advice = data.slip.advice;
        setAdvice(advice); //updates the advice value
      } catch (e) {
        setErrorMessage("Something Went Wrong!");
      }
    }

    fetchAdvice();
  }, []); // lack of dependencies ensures data fetching after every render

  return (
    <div className="advice-generator-body">
      <h1 className="title">Advice Generator</h1>
      {errorMessage && (
        <>
          <p className="gen-advice error">{errorMessage}</p>
          <img src="/message.png" alt="error-message" className="error-img" />
        </>
      )}
      {advice && <p className="gen-advice">{advice}</p>}
      {/* Advice is only shown if it exists */}
      <button className="advice-btn">Free Advice</button>
    </div>
  );
}

export default App;
