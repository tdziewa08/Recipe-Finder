import {recipes} from "./recipes.js"
import {substitutions} from "./substitutions.js"

function subIngredients(ingredientArr, substitutionsObj) {
    const expandedIngredients = []
    
    ingredientArr.forEach(userItem => {
        const ingredient = userItem.ingredient.toLowerCase()
        
        // Get all substitutes for this ingredient (bidirectional)
        const allSubstitutes = findAllSubstitutes(ingredient, substitutionsObj)
        
        // Add all substitutes to expanded list
        allSubstitutes.forEach(sub => {
            if (!expandedIngredients.includes(sub)) {
                expandedIngredients.push(sub)
            }
        })
    })
    
    console.log(expandedIngredients)
    return expandedIngredients
}

// Dynamic bidirectional substitute lookup
function findAllSubstitutes(ingredient, substitutionsObj) {
    let allSubs = [ingredient] // Include original ingredient
    
    // Find direct substitutes (ingredient -> substitutes)
    if (substitutionsObj[ingredient]) {
        allSubs.push(...substitutionsObj[ingredient])
    }
    
    // Find reverse substitutes (what this ingredient can substitute for)
    Object.entries(substitutionsObj).forEach(([key, values]) => {
        if (values.includes(ingredient)) {
            allSubs.push(key) // Only add the key ingredient, not all its substitutes
        }
    })
    
    // Remove duplicates and return
    return [...new Set(allSubs.map(item => item.toLowerCase()))]
}

function findRecipe(ingredientArr, recipeArr, substitutionsObj) {
    // Get expanded ingredients including substitutions
    const expandedIngredients = subIngredients(ingredientArr, substitutionsObj)
    
    // Filter recipes based on expanded ingredients
    const matchingRecipes = recipeArr.filter(recipe => {
        return recipe.ingredients.some(recipeIngredient => {
            return expandedIngredients.includes(recipeIngredient.toLowerCase())
        })
    })

    console.log("Matching recipes:", matchingRecipes)
    return matchingRecipes
}

export { findRecipe, subIngredients }