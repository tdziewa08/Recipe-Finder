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
    const [shoppingList, setShoppingList] = React.useState([])
    

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

    function addToShoppingList(missingIngredients, recipeTitle) {
        const newItems = missingIngredients.map(ingredient => ({
            id: nanoid(),
            ingredient,
            recipeTitle,
            addedDate: new Date().toLocaleDateString()
        }))
        
        setShoppingList(prevList => {
            // Avoid duplicates by checking if ingredient already exists
            const filteredNewItems = newItems.filter(newItem => 
                !prevList.some(existingItem => existingItem.ingredient === newItem.ingredient)
            )
            return [...prevList, ...filteredNewItems]
        })
    }

    function removeFromShoppingList(id) {
        setShoppingList(prevList => prevList.filter(item => item.id !== id))
    }

    function clearShoppingList() {
        setShoppingList([])
    }

    const sharedData = {
        myIngredients,
        expandedIngredients,
        matchingRecipes,
        savedRecipes,
        shoppingList,
        addItem,
        removeItem,
        handleFindRecipe,
        toggleFavorite,
        addToShoppingList,
        removeFromShoppingList,
        clearShoppingList,
    }

    return (
        <div className="layout-container">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/saved">Favorited Recipes ({savedRecipes.length})</Link>
                <Link to="/shopping-list">Shopping List ({shoppingList.length})</Link>
            </nav>
            <Outlet context={sharedData} />
        </div>
    )
}