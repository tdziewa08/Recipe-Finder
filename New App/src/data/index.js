import {recipes} from "./recipes.js"
import {substitutions} from "./substitutions.js"

function subIngredients(ingredientArr, substitutionsObj) {
    const expandedIngredients = []
    
    ingredientArr.forEach(userItem => {
        const ingredient = userItem.ingredient.toLowerCase()
        expandedIngredients.push(ingredient) // Add original ingredient
        
        // Access substitutions using bracket notation
        if (substitutionsObj[ingredient]) {
            const alternatives = substitutionsObj[ingredient]
            alternatives.forEach(substitute => {
                expandedIngredients.push(substitute.toLowerCase())
            })
        }
    })
    console.log(expandedIngredients)
    return expandedIngredients
}

function findRecipe(ingredientArr, recipeArr) {
    // Single filter method - directly on recipes
    const matchingRecipes = recipeArr.filter(recipe => {
        // Check if user has ANY ingredient this recipe needs
        const userIngredients = ingredientArr.map(item => item.ingredient.toLowerCase())
        return recipe.ingredients.some(recipeIngredient => {
            return userIngredients.includes(recipeIngredient.toLowerCase())
        })
    })

    console.log("Matching recipes:", matchingRecipes)
    return matchingRecipes
}

export { findRecipe, subIngredients }