export default function IngredientList(props) {

const fakeIngredients = ["apples", "bananas", "butter", "ravioli", "ground beef", "vanilla extract", "ground beef", "vanilla extract"]
const theIngredients = props.list.map(item => {
    return (
        <p>
            <span>{item.ingredient}</span>
            <span>{item.amount}</span>
            <span>{item.unit}</span>
            <button>X</button>
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