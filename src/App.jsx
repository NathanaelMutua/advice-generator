import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [advice, setAdvice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchAdvice() {
      try {
        const response = await fetch(`https://api.adviceslip.com/advice`);

        if (!response.ok) {
          setErrorMessage("Something Went Wrong When Fetching Data!");
          return;
        }

        const data = await response.json();
        const advice = data.slip.advice;
        setAdvice(advice); //updates the advice value
      } catch (e) {
        setErrorMessage("Something Went Wrong!");
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, []); // lack of dependencies ensures data fetching after every render

  return (
    <div className="advice-generator-body">
      <h1 className="title">Advice Generator</h1>
      {loading && <Loader className="loader" />}
      {errorMessage && (
        <>
          <p className="gen-advice error">{errorMessage}</p>
          <img src="/message.png" alt="error-message" className="error-img" />
        </>
      )}
      {advice && <p className="gen-advice">{advice}</p>}
      {/* Advice is only shown if it exists */}
      <button className="advice-btn" disabled={loading}>
        Free Advice
      </button>
    </div>
  );
}

export default App;
