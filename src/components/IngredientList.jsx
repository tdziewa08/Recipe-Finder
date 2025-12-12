export default function IngredientList(props) {

    const theIngredients = props.list.map(item => {
        return (
            <li key={item.id} className="ingredient">
                <span>&bull; {item.ingredient}</span>
                <span onClick={() => props.removeItem(item.id)}>remove</span>
            </li>
        )
    })

    return (
        <ul className="ingredient-list-container">
            <h2>Your Ingredients</h2>
            {theIngredients}
        </ul>
    )
}