import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    image,
    name,
    cuisine,
    difficulty,
    reviewCount,
    rating,
    caloriesPerServing,
    servings,
    cookTimeMinutes,
    prepTimeMinutes,
    instructions = [],
    ingredients = [],
    tags = [],
    mealType = []
  } = recipe;

  useEffect(() => {
    let cancelled = false;

    async function fetchRecipe() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/recipes/${id}`
        );

        if (!cancelled) {
          setRecipe(data);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setErrorMsg("Could Not Load Recipe Details. Please Try Again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecipe();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="text-center py-6 text-muted">
        Loading...
      </p>
    );
  }

  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-accent hover:underline inline-flex items-center gap-1 mb-4"
        >
          <svg
            className="w-4 h-4 stroke-current fill-none"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
        <p className="text-accent">
          {errorMsg || "Recipe not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-accent hover:underline inline-flex items-center gap-1 mb-6"
      >
        <svg
          className="w-4 h-4 stroke-current fill-none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={image}
          alt={name}
          className="w-full md:w-1/2 h-80 object-cover rounded-md border border-border"
        />

        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="font-serif text-3xl font-bold text-white mb-2">
            {name}
          </h1>

          <p className="text-red-500 mb-4">
            {cuisine} - {difficulty}
          </p>

          <div className="flex items-center gap-1 mb-4 font-medium">
            <svg
              className="w-4 h-4 fill-accent"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm border-t border-border pt-4 mb-4">
            <p><strong>Prep time:</strong> {prepTimeMinutes} mins</p>
            <p><strong>Cook time:</strong> {cookTimeMinutes} mins</p>
            <p><strong>Servings:</strong> {servings}</p>
            <p><strong>Calories:</strong> {caloriesPerServing} kcal</p>
          </div>

          <p className="text-sm text-red-500 mb-1">
            <strong>Meal Type:</strong> {mealType.join(', ')}
          </p>

          <p className="text-sm text-red-500">
            <strong>Tags:</strong> {tags.join(', ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">
            Ingredients
          </h2>

          <ul className="list-disc pl-5 space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold mb-4">
            Instructions
          </h2>

          <ol className="list-decimal pl-5 space-y-2">
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;
