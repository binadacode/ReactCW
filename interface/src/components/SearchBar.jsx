const SearchBar = () => {
  return (
    <section className="search-container">
      <h1>Believe in Finding it</h1>
      <h3>Search for the gadget you are looking for [rent or sale]</h3>
      <form>
        <label htmlFor="term">Search Gadget or Location</label><br />
        <input type="text" id="term" name="term" /><br />
        <button>For Sale</button>
        <button>For Rent</button>
      </form>
    </section>
  )
}

export default SearchBar
