import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    try {
      async function fetchAdvice() {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        const data = await response.json();
        const advice = data.slip.advice;
        setAdvice(advice);
      }

      fetchAdvice();
    } catch (e) {
      console.log(`There was an error: ${e}`);
    }
  }, []);

  return (
    <div className="advice-generator-body">
      <h1 className="title">Advice Generator</h1>
      <p className="gen-advice">{advice}</p>
      <button className="advice-btn">Free Advice</button>
    </div>
  );
}

export default App;
