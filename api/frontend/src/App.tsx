import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Input from './components/Input';
import Report from './components/Results';
import { Result, Request } from './types/types';

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
    const fetchedResult = await axios.get('/model/', {
      params: {
        post: requestBody.post,
        extended: requestBody.extended,
      },
    });

    setResult(fetchedResult.data);
    setShowReport(true);
  }

  return (
    <div className="main">
      <img src="/ai-classifier.png"></img>
      <p>
        This API (Application Programming Interface) detects if the given post
        has relevancy concerning the system and organization within De La Salle
        University - Dasmarinas. The model was trained using unofficial DLSU-D
        Freedom Wall Facebook page posts. Some relevant post examples includes
        criticism on school system, experiences as students of DLSU-D, school
        events concerns and verdicts, questions that is connected to university,
        research surverys, etc. If the predicted label is 1, then the model
        classified the post as relevant and 0 if it is not.
      </p>
      <Input fetchResult={handleFetchResult}></Input>
      <br />
      {showReport ? <Report result={result as Result}></Report> : null}
      <footer>
        Researchers: Mayolito Waje, Matthew Lumugdang, Avin Robles
      </footer>
    </div>
  );
}

export default App;
