import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import RecipeCard from "./RecipeCard"

export default function SavedRecipesList(props) {
    
    const {
            myIngredients,
            expandedIngredients,
            savedRecipes,
            toggleFavorite,
        } = useOutletContext()


    return (
        <div className="saved-recipes-page">
            <header>
                <h1>My Saved Recipes</h1>
                <Link to="/">← Back to Home</Link>
            </header>
            
            {savedRecipes && savedRecipes.length > 0 ? (
                <RecipeCard 
                    recipes={savedRecipes}
                    listIngredients={myIngredients}
                    allIngredients={expandedIngredients}
                    toggleFavorite={toggleFavorite}
                    allAreFavorites={true}
                />
            ) : (
                <div className="no-saved-recipes">
                    <h2>No saved recipes yet!</h2>
                    <p>Go back to the home page and favorite some recipes.</p>
                    <Link to="/">Find Recipes</Link>
                </div>
            )}
        </div>
    )
}