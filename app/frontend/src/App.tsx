import { useState, useEffect } from 'react';
import './App.css';
import fetch from './fetch/fetchData';
import { Result, Request } from './types/types';
import Wallpaper from './components/Wallpaper';
import Information from './components/Information';
import Input from './components/Input';
import Report from './components/Results';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState<Result>();
  const [showReport, setShowReport] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  useEffect(() => {
    // scroll to bottom page when results are fetched
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [result]);

  async function handleFetchResult(requestBody: Request) {
    const fetchedResult = await fetch(requestBody);

    setResult(fetchedResult);
    setShowReport(true);
  }

  return (
    <div className="main">
      <Wallpaper />
      <img src="/ai-classifier.png" id="logo"></img>
      {showGuide ? (
        <Information
          closeWindow={() => {
            setShowGuide(false);
          }}
        />
      ) : null}
      <h2
        className="guide_button"
        onClick={() => {
          setShowGuide(true);
        }}
      >
        How does it work?
      </h2>

      <Input fetchResult={handleFetchResult} />
      <br />

      {showReport ? <Report result={result as Result} /> : null}

      <Footer />
    </div>
  );
}

export default App;
