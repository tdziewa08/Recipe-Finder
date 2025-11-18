export default function IngredientList() {

const fakeIngredients = ["apples", "bananas", "butter", "ravioli", "ground beef", "vanilla extract", "ground beef", "vanilla extract"]
const theIngredients = fakeIngredients.map(item => {
    return <span>{item} <button>X</button></span>
})

    return (
        <div className="ingredient-list-container">
            {theIngredients}
        </div>
    )
}