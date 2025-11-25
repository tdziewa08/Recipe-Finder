export default function IngredientList(props) {

    const fakeIngredients = ["apples", "bananas", "butter", "ravioli", "ground beef", "vanilla extract", "ground beef", "vanilla extract"]
    const theIngredients = props.list.map(item => {
        return (
            <p key={item.id} className="ingredient">
                <span>&bull; {item.ingredient} ({item.amount} {item.unit})</span>
                <span onClick={() => props.removeItem(item.id)}>remove</span>
            </p>
        )
    })

    return (
        <div className="ingredient-list-container">
            <h2>Your Ingredients</h2>
            {theIngredients}
            {theIngredients.length > 0 && <button onClick={() => props.subIngredients(props.list, props.substitutions)}>Generate Recipe</button>}
            {/* <button onClick={() => props.findRecipe(props.list, props.recipes)}>FILTER</button> */}
        </div>
    )
}

//need to figure out how to get the clicking of these buttons to assign a variable their returned arrays...