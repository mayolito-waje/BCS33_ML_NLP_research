import { useState, useEffect } from 'react';
import './App.css';
import fetch from './fetch/fetchData';
import { Result, Request } from './types/types';
import Wallpaper from './components/Wallpaper';
import Input from './components/Input';
import Report from './components/Results';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState<Result>();
  const [showReport, setShowReport] = useState<boolean>(false);

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
      <p>In this website, the AIClassifier shall classify the post if it’s:</p>
      <ul>
        <li>- relevant to DLSU-D in context [referred to as 1]</li>
        <li>- non-relevant to DLSU-D in context [referred to as 0]</li>
      </ul>
      <p>
        Relevant post examples includes: school criticism, inquiries, questions
        about university's system, thoughts about school events, etc.
      </p>

      <Input fetchResult={handleFetchResult} />
      <br />

      {showReport ? <Report result={result as Result} /> : null}

      <Footer />
    </div>
  );
}

export default App;
