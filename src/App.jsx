import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Advice Generator</h1>
      <p className="gen-advice">Don't put all your eggs in one basket</p>
      <button className="advice-btn">Free Advice</button>
    </>
  );
}

export default App;
