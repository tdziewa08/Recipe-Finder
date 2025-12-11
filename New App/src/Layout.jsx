import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { nanoid } from "nanoid"
import { findRecipe } from "./data/index.js"
import { subIngredients } from "./data/index.js"
import { recipes } from "./data/recipes.js"
import { substitutions } from "./data/substitutions.js"

export default function Layout() {
    const location = useLocation()

    // Scroll to top when route changes
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    const [myIngredients, setMyIngredients] = React.useState([])
    const [expandedIngredients, setExpandedIngredients] = React.useState([])
    const [matchingRecipes, setMatchingRecipes] = React.useState([])
    const [savedRecipes, setSavedRecipes] = React.useState([])
    const [shoppingList, setShoppingList] = React.useState([])
    const [notFound, setNotFound] = React.useState(false)
    const [toastMessage, setToastMessage] = React.useState('')
    

    function addItem(ingredient) {
        if(ingredient)
        {
            const newestItem = {
                id: nanoid(),
                ingredient: ingredient.toLowerCase(),
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
        if(foundRecipes.length === 0)
        {
            setNotFound(true)
            setMatchingRecipes([])
        }
        else
        {
            setNotFound(false)
            setMatchingRecipes(foundRecipes)
        }
    }

    function filterRecipes(parameter) {
        console.log(parameter)

        let sortedArray = [...matchingRecipes] // Don't mutate original array

        if(parameter === "cuisine")
        {
            console.log("cuisine")
            // Group by cuisine, then sort within groups by cookTime and difficulty
            const grouped = sortedArray.reduce((acc, recipe) => {
                const cuisine = recipe.cuisine || 'Other'
                if (!acc[cuisine]) acc[cuisine] = []
                acc[cuisine].push(recipe)
                return acc
            }, {})
            
            // Sort each cuisine group by cookTime, then difficulty
            Object.keys(grouped).forEach(cuisine => {
                grouped[cuisine].sort((a, b) => {
                    // First by cookTime
                    if (a.cookTime !== b.cookTime) return a.cookTime - b.cookTime
                    
                    // Then by difficulty
                    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
                    const diffA = difficultyOrder[a.difficulty] || 4
                    const diffB = difficultyOrder[b.difficulty] || 4
                    return diffA - diffB
                })
            })
            
            // Flatten back to array with cuisines in alphabetical order
            sortedArray = Object.keys(grouped)
                .sort()
                .flatMap(cuisine => grouped[cuisine])
        }
        else if(parameter === "difficulty")
        {
            console.log("difficulty")
            const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
            sortedArray.sort((a, b) => {
                const diffA = difficultyOrder[a.difficulty] || 4
                const diffB = difficultyOrder[b.difficulty] || 4
                
                // First by difficulty
                if (diffA !== diffB) return diffA - diffB
                
                // Then by cookTime for ties
                return a.cookTime - b.cookTime
            })
        }
        else if(parameter === "cook-time")
        {
            console.log("cook time")
            sortedArray.sort((a, b) => {
                // First by cookTime
                if (a.cookTime !== b.cookTime) return a.cookTime - b.cookTime
                
                // Then by difficulty for ties
                const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
                const diffA = difficultyOrder[a.difficulty] || 4
                const diffB = difficultyOrder[b.difficulty] || 4
                return diffA - diffB
            })
        }
        
        setMatchingRecipes(sortedArray)
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
            
            // Show toast message
            const addedCount = filteredNewItems.length
            if (addedCount > 0) {
                setToastMessage(`✅ Added ${addedCount} ingredient${addedCount > 1 ? 's' : ''} from "${recipeTitle}"`)
                setTimeout(() => setToastMessage(''), 4000)
            } else {
                setToastMessage(`ℹ️ All ingredients from "${recipeTitle}" already in shopping list!`)
                setTimeout(() => setToastMessage(''), 3000)
            }
            
            return [...prevList, ...filteredNewItems]
        })
    }

    function removeFromShoppingList(id) {
        setShoppingList(prevList => prevList.filter(item => item.id !== id))
    }

    function clearShoppingList() {
        setShoppingList([])
    }

    // Toast component
    const Toast = ({ message, onClose }) => {
        if (!message) return null
        
        return (
            <div className="toast">
                <span>{message}</span>
                <button onClick={onClose} className="toast-close">×</button>
            </div>
        )
    }

    const sharedData = {
        myIngredients,
        expandedIngredients,
        matchingRecipes,
        savedRecipes,
        shoppingList,
        notFound,
        addItem,
        removeItem,
        handleFindRecipe,
        filterRecipes,
        toggleFavorite,
        addToShoppingList,
        removeFromShoppingList,
        clearShoppingList,
        toastMessage,
        setToastMessage
    }

    return (
        <div className="layout-container">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/saved">Favorited Recipes ({savedRecipes.length})</Link>
                <Link to="/shopping-list">Shopping List ({shoppingList.length})</Link>
            </nav>
            <Outlet context={sharedData} />
            <Toast 
                message={toastMessage} 
                onClose={() => setToastMessage('')} 
            />
            {/* <footer>
                <Link to="shopping-list">Shopping List</Link>
                <Link to="saved">Favorited Recipes</Link>
            </footer> */}
        </div>
    )
}