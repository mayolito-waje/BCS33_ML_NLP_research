import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Input from './components/Input';
import Report from './components/Results';
import { Result, Request } from './types/types';

function App() {
  const [result, setResult] = useState<Result>();
  const [showReport, setShowReport] = useState<boolean>(false);

  async function handleFetchResult(requestBody: Request) {
    const fetchedResult = await axios.get('/api/model', {
      params: {
        post: requestBody.post,
        extended: requestBody.extended,
      },
    });

    setResult(fetchedResult.data);
    setShowReport(true);
  }

  return (
    <>
      <h1>DLSU-D Freedom Wall Posts Classifier</h1>
      <Input fetchResult={handleFetchResult}></Input>
      <h2>Report</h2>
      {showReport ? <Report result={result as Result}></Report> : null}
    </>
  );
}

export default App;
