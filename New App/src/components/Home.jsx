import React from "react"
import { useOutletContext } from "react-router-dom"
import IngredientList from "./IngredientList"
import RecipeCard from "./RecipeCard"


export default function Home() {

    //local state
    const [ingredient, setIngredient] = React.useState("")

    const {
        myIngredients,
        expandedIngredients,
        matchingRecipes,
        savedRecipes,
        notFound,
        addItem,
        removeItem,
        handleFindRecipe,
        filterRecipes,
        toggleFavorite,
        addToShoppingList,
    } = useOutletContext()

    //local function that calls context addItem and resets form
    function handleAddItem() {
        const success = addItem(ingredient)
        if(success)
        {
            setIngredient("")
        }
    }    

    return (
        <>
            <div className="main-container">
                <div className="home-container">
                    <h1>Recipe Finder</h1>
                    <p className="app-desc">Enter your ingredients and find a recipe</p>
                    <div className="ingredient-input-container">
                        <div className="input-section">
                            <div className="ingredient-input">
                                <span>Ingredient</span>
                                <input
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                                    type="text"
                                    placeholder="E.g Broccoli"
                                />
                                <button id="add-item-btn" onClick={handleAddItem}>
                                    Add
                                </button>
                            </div>
                        </div>
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






{/* 
    Code for if I would like to implement ingredient amounts later on...
    
    
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
</div> */}