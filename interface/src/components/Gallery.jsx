import { useEffect, useState } from 'react'
import ResultList from './ResultList'
import SearchBar from './SearchBar'
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

  const handleSearch = (query) => {
    const filteredResults = searchProperties(properties, query)
    setResults(filteredResults)
  }

 
  

  return (
      <div>
        <SearchBar onSearch={handleSearch} />   
        <ResultList results={results} />
      </div>
  )
}

export default Gallery
