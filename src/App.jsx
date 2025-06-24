import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [adviceList, setAdviceList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log;

  // the use effect will call on the handleFetchData function on each render
  useEffect(() => {
    handleFetchData();
  }, []); // lack of dependencies ensures data fetching after every render

  function handleFetchData() {
    setLoading(true);
    setAdviceList([]); // we want to clear the previous advice list when we ask for another one
    async function fetchAdviceList() {
      try {
        const advicesList = []; // initiate an empty array for the advices

        // the use of await instead of Promise.all is unconventionally slow but we will upgrade
        for (let i = 0; i < 4; i++) {
          const response = await fetch(
            `https://api.adviceslip.com/advice?timestamp=${Date.now() + i}` // the ?timestamp=${Date.now() + i} ensures/ tricks the API to think it's a new url each time
          );
          if (!response.ok) {
            setErrorMessage("Something Went Wrong When Fetching Data!");
            return;
          }
          const data = await response.json();
          advicesList.push(data.slip.advice); // push the json data to the array
        }
        setAdviceList(advicesList);
      } catch (e) {
        setErrorMessage("Something Went Wrong!");
      } finally {
        setLoading(false);
      }
    }

    fetchAdviceList();
  }

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
      {adviceList.length > 0 && (
        <ul className="advice-list">
          {adviceList.map((advice2, idx) => (
            <li key={idx} className="list-item">
              {advice2}
            </li>
          ))}
        </ul>
      )}
      <button
        className="advice-btn"
        onClick={handleFetchData}
        disabled={loading}
      >
        Free Advice
      </button>
    </div>
  );
}

export default App;
