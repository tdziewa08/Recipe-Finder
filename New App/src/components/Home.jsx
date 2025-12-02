import React from "react"
import { nanoid } from "nanoid"
import IngredientList from "./IngredientList"
import RecipeCard from "./RecipeCard"
import { findRecipe } from "../data/index.js"
import { subIngredients } from "../data/index.js"
import { recipes } from "../data/recipes.js"
import { substitutions } from "../data/substitutions.js"

export default function Home() {

    const [myIngredients, setMyIngredients] = React.useState([])
    const [ingredient, setIngredient] = React.useState("")
    const [amount, setAmount] = React.useState("")
    const [unit, setUnit] = React.useState("cups")

    const [matchingRecipes, setMatchingRecipes] = React.useState([])
    const [expandedIngredients, setExpandedIngredients] = React.useState([])

    
    //const filteredRecipes = findRecipe(expandedIngredients, recipes)

    //console.log(expandedIngredients)

    console.log("STATE VALUE:  " + expandedIngredients)
    
    //console.log(filteredRecipes)

    function addItem() {
        if(ingredient || amount)
        {
            let newestItem = {}
            newestItem = {
                id: nanoid(),
                ingredient: ingredient, //maybe add the capitalizing of the first letter functionality to here...
                amount: amount,
                unit: unit    
            }
            const newestArray = [newestItem, ...myIngredients]
            setMyIngredients(newestArray)
            const extraIngredients = subIngredients(newestArray, substitutions)
            setExpandedIngredients(extraIngredients)
            setIngredient("")
            setAmount("")
            setUnit("cups")
        }
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
        const foundRecipes = findRecipe(myIngredients, recipes)
        setMatchingRecipes(foundRecipes)
    }

    console.log(myIngredients)

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
                        <button onClick={addItem}>Add Item</button>
                    </div>
                </div>
                <IngredientList
                    list={myIngredients}
                    removeItem={removeItem}
                />
                {myIngredients.length > 0 && <button onClick={handleFindRecipe}>Find Recipes</button>}
            </div>
            {matchingRecipes.length > 0 &&
            <RecipeCard 
                recipes={matchingRecipes}
                allIngredients={myIngredients}
            />}
        </>
    )
}