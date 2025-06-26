import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Header from "./components/Header";

function App() {
  const [adviceList, setAdviceList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  console.log;

  // the use effect will call on the handleFetchData function on each render
  useEffect(() => {
    handleFetchData();
  }, []); // lack of dependencies ensures data fetching after every render

  useEffect(() => {
    if (image) {
      console.log("Background image URL:", image);
    }
  }, [image]);

  function handleFetchData() {
    setLoading(true);
    setAdviceList([]); // we want to clear the previous advice list when we ask for another one
    async function fetchAll() {
      try {
        const advicesList = []; // initiate an empty array for the advices
        const timestamp = Date.now(); // ran into duplicate image urls, due to strict mode so we will reuse one timestamp for this function.

        // the use of await instead of Promise.all is unconventionally slow but we will upgrade
        for (let i = 0; i < 4; i++) {
          const response = await fetch(
            `https://api.adviceslip.com/advice?timestamp=${timestamp + i}` // the ?timestamp=${Date.now() + i} ensures/ tricks the API to think it's a new url each time
          );
          if (!response.ok) {
            setErrorMessage("Something Went Wrong When Fetching Data!");
            return;
          }
          const data = await response.json();
          advicesList.push(data.slip.advice); // push the json data to the array
        }
        setAdviceList(advicesList);

        // now we also request and set the background image
        const url = `https://picsum.photos/1080/720?timestamp=${timestamp}`; // we will set the url directly to prevent CORS
        setImage(url);
      } catch (e) {
        setErrorMessage("Something Went Wrong!");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }

  return (
    <>
      <div
        className="advice-generator-body"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <section className="information-section">
          {loading && <Loader className="loader" />}
          {errorMessage && (
            <>
              <p className="gen-advice error">{errorMessage}</p>
              <img
                src="/message.png"
                alt="error-message"
                className="error-img"
              />
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
        </section>
        <div className="button-container">
          <button
            className="advice-btn"
            onClick={handleFetchData}
            disabled={loading}
          >
            Free Advice
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
