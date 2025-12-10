import React from "react"
import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"
import IngredientList from "./IngredientList"
import { subIngredients } from "../data/index.js"
import RecipeCard from "./RecipeCard"

import SavedRecipesList from "./SavedRecipesList"

export default function Home() {

    //const [myIngredients, setMyIngredients] = React.useState([])
    //const [matchingRecipes, setMatchingRecipes] = React.useState([])
    //const [savedRecipes, setSavedRecipes] = React.useState([])
    //const [expandedIngredients, setExpandedIngredients] = React.useState([])

    //local state/////////////////////////////////////////////////////////////
    const [ingredient, setIngredient] = React.useState("")
    const [amount, setAmount] = React.useState("")
    const [unit, setUnit] = React.useState("cups")
    //////////////////////////////////////////////////////////////////////////

    const {
        myIngredients,
        expandedIngredients,
        matchingRecipes,
        savedRecipes,
        shoppingList,
        notFound,
        addItem,
        removeItem,
        handleFindRecipe,
        toggleFavorite,
        addToShoppingList,
        removeFromShoppingList,
        clearShoppingList,
    } = useOutletContext()

    //local function that calls context addItem and resets form
    function handleAddItem() {
        const success = addItem(ingredient, amount, unit)
        if (success) {
            setIngredient("")
            setAmount("")
            setUnit("cups")
        }
    }




    // function removeItem(id) {
    //     const newIngredients = myIngredients.filter(item => item.id !== id)
    //     setMyIngredients(newIngredients)
        
    //     // Recalculate expanded ingredients with the updated ingredients list
    //     const updatedExpandedIngredients = subIngredients(newIngredients, substitutions)
    //     setExpandedIngredients(updatedExpandedIngredients)
    // }

    // function handleFindRecipe() {
    //     console.log("inside handleFindRecipe function")
    //     const foundRecipes = findRecipe(myIngredients, recipes, substitutions)
    //     setMatchingRecipes(foundRecipes)
    // }

    // function toggleFavorite(recipeId) {
    //     setMatchingRecipes(prevRecipes => {
    //         const updatedRecipes = prevRecipes.map(recipe => {
    //             return (
    //                 recipe.id === recipeId 
    //                     ? {...recipe, isFavorite: !recipe.isFavorite}
    //                     : recipe
    //         )})
    //         const favoritedRecipes = updatedRecipes.filter(recipe => recipe.isFavorite)
    //         setSavedRecipes(favoritedRecipes)
    //         return updatedRecipes
    //     })
    // }
    

    console.log("My Ingredients" + myIngredients)
    console.log("Expanded Ingredients" + expandedIngredients)

    return (
        <>
            <div className="master">
                <div className="home-container">
                    <h1>Recipe Optimitzer</h1>
                    <p className="app-desc">Let us know what ingredients you have, and we'll generate the best recipe we can to fit YOUR goals!</p>
                    <div className="ingredient-input-container">
                        <div className="input-section">
                            <div className="ingredient-input">
                                <span>Ingredient</span>
                                <input
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)}
                                    type="text"
                                    placeholder="E.g Broccoli"
                                />
                            </div>
                            <div className="ingredient-input">
                                <span>Amount</span>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="text"
                                    placeholder="E.g 4"
                                />
                                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                    <option value="cups" selected>cups</option>
                                    <option value="oz" >oz</option>
                                    <option value="fl oz" >fl oz</option>
                                    <option value="grams" >grams</option>
                                    <option value="pounds" >pounds</option>
                                    <option value="units" >units</option>
                                    <option value="teaspoons" >teaspoons</option>
                                    <option value="tablespoons" >tablespoons</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleAddItem}>Add Item</button>
                    </div>
                </div>
                <IngredientList
                    list={myIngredients}
                    removeItem={removeItem}
                />
                {myIngredients.length > 0 &&<button id="find-recipe-btn" onClick={handleFindRecipe}>Find Recipes</button>}
                {notFound && <span className="not-found-message">No recipes found</span>}
            </div>
            {matchingRecipes.length > 0 &&
            <div className="recipe-container">
                <legend>
                    <span>🔴 Missing ingredient</span>
                    <span>🔵 Substitute available</span> 
                    <span>⚫ Have ingredient</span>
                </legend>
                <>
                    <RecipeCard 
                        recipes={matchingRecipes}
                        listIngredients={myIngredients}
                        allIngredients={expandedIngredients}
                        toggleFavorite={toggleFavorite}
                        savedRecipes={savedRecipes}
                        onAddToShoppingList={addToShoppingList}
                    />
                </>
            </div>}
            

        </>
    )
}