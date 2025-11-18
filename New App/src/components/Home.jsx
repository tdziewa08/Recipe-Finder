export default function Home() {
    return (
        <div className="home-container">
            <h1>Recipe Optimitzer</h1>
            <p className="app-desc">Let us know what ingredients you have, and we'll generate the best recipe we can to fit YOUR goals!</p>
            <div className="ingredient-input-container">
                <div className="input-section">
                    <div className="ingredient-input">
                        <span>Ingredient</span>
                        <input type="text" placeholder="E.g Broccoli"></input>
                    </div>
                    <div className="ingredient-input">
                        <span>Amount</span>
                        <input type="text" placeholder="E.g 4"></input>
                        <select>
                            <option>cups</option>
                            <option>ounces</option>
                            <option>fluid ounces</option>
                            <option>grams</option>
                            <option>pounds</option>
                            <option>gallons</option>
                        </select>
                    </div>
                </div>
                
                <button>Add Item</button>
            </div>
        </div>
    )
}