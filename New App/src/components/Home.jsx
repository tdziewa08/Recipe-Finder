import React from "react"
import IngredientList from "./IngredientList"

export default function Home() {

    const [myIngredients, setMyIngredients] = React.useState([])
    const [ingredientInput, setIngredientInput] = React.useState("")
    const [amountInput, setAmounttInput] = React.useState("")
    const [selectedUnit, setSelectedUnit] = React.useState("")

    function addItem() {
        if(ingredientInput || amountInput)
        {
            let newestItem = {}
            newestItem = {
                ingredient: ingredientInput,
                amount: amountInput,
                unit: selectedUnit    
            }
            setMyIngredients(prevArray => [...prevArray, newestItem])
            setIngredientInput("")
            setAmounttInput("")
            setSelectedUnit("")
        }
        
    }

    console.log(myIngredients)

    return (
        <>
            <div className="home-container">
                <h1>Recipe Optimitzer</h1>
                <p className="app-desc">Let us know what ingredients you have, and we'll generate the best recipe we can to fit YOUR goals!</p>
                <div className="ingredient-input-container">
                    <div className="input-section">
                        <div className="ingredient-input">
                            <span>Ingredient</span>
                            <input
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                                type="text"
                                placeholder="E.g Broccoli"
                            />
                        </div>
                        <div className="ingredient-input">
                            <span>Amount</span>
                            <input
                                value={amountInput}
                                onChange={(e) => setAmounttInput(e.target.value)}
                                type="text"
                                placeholder="E.g 4"
                            />
                            <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                                <option>cups</option>
                                <option>ounces</option>
                                <option>fluid ounces</option>
                                <option>grams</option>
                                <option>pounds</option>
                                <option>units</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={addItem}>Add Item</button>
                </div>
            </div>
            <IngredientList
                list={myIngredients}
            />
        </>
    )
}