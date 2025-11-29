export default function RecipeCard(props) {

    const theRecipes = props.recipes.map(item => {
        return (
            <div key={item.id} className="ingredient-list-container">
                <h3>{item.title}</h3>
                <section>
                    {item.ingredients.map((ing, index) => (
                        <span key={index}>{ing}, </span>
                    ))}
                </section>
                <section>
                    {item.instructions.map((ins, index) => (
                        <p key={index}>{index + 1}. {ins}</p>
                    ))}
                </section>
                <p>Cook time: {item.cookTime} minutes</p>
                <p>Servings: {item.servings}</p>
                <p>Cuisine: {item.cuisine}</p>
                <p>Difficulty: {item.difficulty}</p>
            </div>
        )
    })

    return (
        <div className="recipe-cards-container">
            {theRecipes}
        </div>
    )
}