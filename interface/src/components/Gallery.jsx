import { useEffect, useState } from 'react'
import ResultList from './ResultList'
import { searchProperties } from '../utils/searchProperties'

const Gallery = () => {
  const [properties, setProperties] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('/properties.json')
      .then(response => response.json())
      .then(data => {
        setProperties(data.properties)
        setResults(data.properties) //show all initially
      });
  }, [])

 
  

  return (
      <div>
        <ResultList results={results} />
      </div>
  )
}

export default Gallery
