import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  async function fetchRecipes(skipCount, query) {
    setLoading(true)
    try {
        let url = `https://dummyjson.com/recipes?limit=9&skip=${skipCount}`
        if(query){
            url = `https://dummyjson.com/recipes/search?limit=9&skip=${skipCount}&q=${query}`
        }
      const { data } = await axios.get(url);
      setRecipes((prev) => skipCount === 0 ? data.recipes :  [...prev, ...data.recipes]);
      setTotal(data.total);
    } catch (error) {
            setErrorMsg("Error Displaying This Page. Please Try Again Later.")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e){
    e.preventDefault();
    const form = new FormData(e.target)
    let query = form.get("query").trim();
    setSearchQuery(query)
    if(query){
    fetchRecipes(0, query)
    }
}


  if(errorMsg){
    return (
        <main className="max-w-6xl mx-auto px-4 py-16 text-center">
            <p className='text-accent text-center'>{errorMsg}</p>
    </main>
    )
  }

  return (

    <main className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          name="query" 
          placeholder="Search recipes..."
          className="flex-1 min-w-0 border border-[#444444] rounded-lg px-3 py-2 bg-[#242424] text-white placeholder-gray-500 outline-none focus:border-[#ef3333] transition-colors"
        />

        <button
          type="submit"
          className="bg-[#ef3333] hover:bg-[#cc2929] text-white rounded-lg px-4 py-2 font-semibold transition-colors"
        >
          Search
        </button>
      </form>

    {loading && <p className='text-center py-6 text-red-500'>Loading...Please Keep Patience.</p>}

    {!loading && recipes.length === 0  && <p className='text-center text-red-500 py-6'>No Recipes Found For "{searchQuery}"</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchQuery)}
            className="bg-[#ef3333] hover:bg-[#cc2929] text-white rounded-lg px-6 py-2 font-semibold transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;