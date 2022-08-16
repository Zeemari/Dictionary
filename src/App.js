import React, { useEffect, useState} from 'react'
import { FiVolume2 } from 'react-icons/fi'

import Error from './components/Error'
import Navbar from './components/Navbar'
import LoadingSpinner from './assets/LoadingSpinner'

const App = () => {
  const [query, setQuery] = useState('redundant')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async() =>  {
    setIsLoading(true)

    try {
      const response  = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`)
      const data = await response.json()
      if(!response.ok) {
        throw new Error('Word not found, try another entry')
      }
      setData(data)
      setIsLoading(false)
      console.log(data)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const playAudio = () => {
    let audio = new Audio(data[0].phonetics[0].audio)
    audio.play()
  }

  useEffect(() => {
    handleSubmit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(error) {
    return <Error />
  }

  return (
    <>
    <Navbar />
    <main className='container'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form__control'>
          <input type='text' value={query} onChange={handleChange} />
          <button type='submit'>
            {isLoading ? <LoadingSpinner /> : 'Search'}
          </button>
        </div>
      </form>

      <div className='stack'>
        {data && (
        <div className='stack__result'>
          <h1>{data[0]?.word}</h1>

          <div className='stack__result-flex'>
            <p>{data[0]?.phonetic}</p>
            <button onClick={playAudio}>
              <FiVolume2 />
            </button>
          </div>
          <div className='stack__result-column'>
            {data[0]?.meanings.map((meaning, index) => (
              <div key={index}>
                <h4>Part of Speech: {meaning.partOfSpeech}</h4>
                {meaning?.definitions.map((definition, index) => (
                  <ul key={index}>
                    <li>Definition: {definition?.definition}</li>
                    {definition?.example ? (<p>Example: {definition.example}</p>) : (<p>No Examples</p>)}
                    {definition?.synonyms ? (
                      <div>
                        <p>Synonyms: </p>
                        {definition.synonyms.map((synonym, index) => (
                          <li key={index}>{synonym}</li>
                        ))}
                      </div>
                    ) : (<p>No Synonyms</p>)}
                    {definition?.antonyms && (
                      <div>
                        <p>Antonyms: </p>
                        {definition.antonyms.map((antonym, index) => (
                          <li key={index}>{antonym}</li>
                        ))}
                      </div>
                    )}
                  </ul>
                ))}
              </div>
            ))}
            <p>Origin: {data[0]?.origin}</p>
          </div>
        </div>
        )}
      </div>
    </main>
    </>
  )
}

export default App