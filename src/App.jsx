import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react'

function App() {

  // todo implement API call to get quotes

  let [apiQuotes, setApiQuotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {  
    getQuotesFromAPI()
    
  }, [setApiQuotes])

  const getQuotesFromAPI = async () => {  
    setIsLoading(true) 
    axios({
      "method": "GET",
      "url": 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        "content-type": "application/octet-stream",
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      }, "params": {
        "language_code": "en"
      }
    })
    .then((response) => {
      
      setApiQuotes(response.data)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  
  return (
  
  <div id="quote-box"  className="container-fluid text-center">
    {!isLoading && apiQuotes !== '' ? (
      <>
      <div id="text">
      <p>{apiQuotes && 
        <blockquote className='fw-normal'> 
          "{apiQuotes.content}"
        </blockquote>}</p>
    </div>

    <div id="author">
      <p className='fw-bold fst-italic'>{apiQuotes && apiQuotes.originator && apiQuotes.originator.name}</p>
    </div>

    <div id="actions container-fluid">
      <button id="new-quote" className='btn btn-primary btn-sm' onClick={getQuotesFromAPI}>New quote please!</button>

      <button className='btn btn-secondary btn-sm'><a href="twitter.com/intent/tweet" target='_blank' id="tweet-quote">Tweet this quote</a></button>
    </div>
    </>
    ) : (<div className="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

    
  </div>
  );
}

export default App;
