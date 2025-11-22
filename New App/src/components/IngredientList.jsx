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
        </div>
    )
}