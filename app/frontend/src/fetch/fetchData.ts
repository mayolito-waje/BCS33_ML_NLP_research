import axios from 'axios';
import { Request } from '../types/types';

const fetch = async (requestBody: Request) => {
  const fetchedResult = await axios.get('/model/', {
    params: {
      post: requestBody.post,
      extended: requestBody.extended,
    },
  });

  return fetchedResult.data;
};

export default fetch;
