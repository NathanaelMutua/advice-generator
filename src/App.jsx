import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="advice-generator-body">
      <h1 className="title">Advice Generator</h1>
      <p className="gen-advice">Don't put all your eggs in one basket</p>
      <button className="advice-btn">Free Advice</button>
    </div>
  );
}

export default App;
