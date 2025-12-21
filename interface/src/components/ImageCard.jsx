const ImageCard = ({ product }) => {
  const { type, brand, location, added, images } = product
  const firstImage = images[0]
  const imageName = firstImage.split('/').pop()

  return (
    <section className="card">
      <div className="image">
        <img src={firstImage} alt={imageName} />
      </div>
      <div className="description">
        <h3>Type: {type}</h3>
        <h3>Brand: {brand}</h3>
        <h3>Location: {location}</h3>
        <h3>Added: {added.month} {added.day}, {added.year}</h3>
        <button>Add to Favourites</button>
      </div>
    </section>
  )
}

export default ImageCard
