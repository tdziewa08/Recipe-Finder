import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import RecipeCard from "./RecipeCard"

export default function SavedRecipesList() {
    
    const {
            myIngredients,
            expandedIngredients,
            savedRecipes,
            filterRecipes,
            toggleFavorite,
            addToShoppingList,
        } = useOutletContext()

    return (
        <div className="saved-recipes-page">
            <header>
                <h1>My Saved Recipes</h1>
            </header>
            {savedRecipes && savedRecipes.length > 0
                ? 
                <div className="recipe-container">
                    <div className="recipe-filter-btns">
                        Sort By: 
                        <button value="cuisine" onClick={(e) => filterRecipes(e.target.value)}>Cuisine</button>
                        <button value="difficulty" onClick={(e) => filterRecipes(e.target.value)}>Difficulty</button>
                        <button value="cook-time" onClick={(e) => filterRecipes(e.target.value)}>Cook Time</button>
                    </div>
                    <div className="recipe-key">
                        <span>🔴 Missing ingredient</span>
                        <span>🔵 Substitute available</span> 
                        <span>⚫ Have ingredient</span>
                    </div>
                    <>
                        <RecipeCard 
                            recipes={savedRecipes}
                            listIngredients={myIngredients}
                            allIngredients={expandedIngredients}
                            toggleFavorite={toggleFavorite}
                            allAreFavorites={true}
                            onAddToShoppingList={addToShoppingList}
                        />
                    </>
                </div>
                :
                <div className="no-saved-recipes">
                    <h2>No saved recipes yet!</h2>
                    <p>Go back to the home page and favorite some recipes.</p>
                    <Link to="/">Find Recipes</Link>
                </div>
            }
        </div>
    )
}