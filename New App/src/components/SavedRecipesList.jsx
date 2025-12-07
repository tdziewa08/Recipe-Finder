import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import RecipeCard from "./RecipeCard"

export default function SavedRecipesList(props) {
    
    const {
            myIngredients,
            expandedIngredients,
            savedRecipes,
            toggleFavorite,
            addToShoppingList,
        } = useOutletContext()


    return (
        <div className="saved-recipes-page">
            <header>
                <h1>My Saved Recipes</h1>
                {/* <Link to="/">← Back to Home</Link> */}
            </header>
            
            {savedRecipes && savedRecipes.length > 0 ? (
                <div className="recipe-container">
                    <legend>
                        <span>🔴 Missing ingredient</span>
                        <span>🔵 Substitute available</span> 
                        <span>⚫ Have ingredient</span>
                    </legend>
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