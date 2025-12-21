import { useEffect, useState } from 'react'
import ImageCard from './ImageCard'

const Gallery = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/products.json')
      const data = await response.json()
      setProducts(data.products)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <div className="all-items">
        <h2>Available</h2>
        <div className="gallery">
          {products.map(product => (
            <ImageCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="favorites">
        <h2>Favourites</h2>
      </div>
    </div>
  )
}

export default Gallery
