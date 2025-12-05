import React from "react"
import { Outlet, Link } from "react-router-dom"
import { nanoid } from "nanoid"
import { findRecipe } from "./data/index.js"
import { subIngredients } from "./data/index.js"
import { recipes } from "./data/recipes.js"
import { substitutions } from "./data/substitutions.js"

export default function Layout() {

    const [myIngredients, setMyIngredients] = React.useState([])
    const [expandedIngredients, setExpandedIngredients] = React.useState([])
    const [matchingRecipes, setMatchingRecipes] = React.useState([])
    const [savedRecipes, setSavedRecipes] = React.useState([])
    

    function addItem(ingredient, amount, unit) {
        if(ingredient && amount)
        {
            const newestItem = {
                id: nanoid(),
                ingredient: ingredient,
                amount: amount,
                unit: unit    
            }
            const newestArray = [newestItem, ...myIngredients]
            setMyIngredients(newestArray)
            const extraIngredients = subIngredients(newestArray, substitutions)
            setExpandedIngredients(extraIngredients)
            return true // Signal success
        }
        return false // Signal failure
    }

    function removeItem(id) {
        const newIngredients = myIngredients.filter(item => item.id !== id)
        setMyIngredients(newIngredients)
        
        // Recalculate expanded ingredients with the updated ingredients list
        const updatedExpandedIngredients = subIngredients(newIngredients, substitutions)
        setExpandedIngredients(updatedExpandedIngredients)
    }

    function handleFindRecipe() {
        console.log("inside handleFindRecipe function")
        const foundRecipes = findRecipe(myIngredients, recipes, substitutions)
        setMatchingRecipes(foundRecipes)
    }

    function toggleFavorite(recipeId) {
        // Find if recipe is currently in savedRecipes
        const isCurrentlySaved = savedRecipes.some(recipe => recipe.id === recipeId)
        
        if (isCurrentlySaved) {
            // Remove from savedRecipes
            setSavedRecipes(prevSaved => prevSaved.filter(recipe => recipe.id !== recipeId))
        } else {
            // Find the recipe from the original recipes data and add to savedRecipes
            const recipeToAdd = recipes.find(recipe => recipe.id === recipeId)
            if (recipeToAdd) {
                setSavedRecipes(prevSaved => [...prevSaved, recipeToAdd])
            }
        }
        
        // Also update matchingRecipes if it exists there
        setMatchingRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                return recipe.id === recipeId 
                    ? {...recipe, isFavorite: !isCurrentlySaved}
                    : recipe
            })
        })
    }

    const sharedData = {
        myIngredients,
        expandedIngredients,
        matchingRecipes,
        savedRecipes,
        addItem,
        removeItem,
        handleFindRecipe,
        toggleFavorite,
    }

    return (
        <div className="layout-container">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/saved">Favorited Recipes</Link>
            </nav>
            <Outlet context={sharedData} />
        </div>
    )
}