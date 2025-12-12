import { FaStar, FaRegStar } from "react-icons/fa"

export default function RecipeCard(props) {

    const theRecipes = props.recipes.map(item => {
        // Calculate missing ingredients once, use everywhere
        const missingIngredients = item.ingredients.filter(ing => {
            const hasIngredient = props.listIngredients.some(item => item.ingredient === ing)
            const hasSubstitute = props.allIngredients.includes(ing)
            return !hasIngredient && !hasSubstitute
        })

        return (
            <div key={item.id} className="recipe-card">
                <h3>
                    {item.title}
                    <span className="favorite-icon">
                        {(props.allAreFavorites || (props.savedRecipes && props.savedRecipes.some(saved => saved.id === item.id)) || item.isFavorite)
                            ? <FaStar onClick={() => props.toggleFavorite(item.id)}/>
                            : <FaRegStar onClick={() => props.toggleFavorite(item.id)}/>
                        }
                    </span>
                </h3>
                <p className="recipe-tags">
                    <span>Cuisine: {item.cuisine}</span>
                    <span>Difficulty: {item.difficulty}</span>
                </p>
                <section className="ingredients-list">
                    <p>Ingredients</p>
                    {item.ingredients.map((ing, index) => {

                        const hasIngredient = props.listIngredients.some(item => item.ingredient === ing)

                        if(hasIngredient)
                        {
                            return <span key={index}>{ing}{index < item.ingredients.length - 1 ? ', ' : ''}</span>
                        }
                        else if(props.allIngredients.includes(ing))
                        {
                            return <span className="blue" key={index}>{ing}{index < item.ingredients.length - 1 ? ', ' : ''}</span>
                        }
                        else
                        {
                            return <span className="red" key={index}>{ing}{index < item.ingredients.length - 1 ? ', ' : ''}</span>
                        }
                    })}
                </section>
                <section className="instructions-list">
                    <p>Instructions</p>
                    {item.instructions.map((ins, index) => (
                        <p key={index}>{index + 1}. {ins}</p>
                    ))}
                </section>
                <p>Cook time: {item.cookTime} minutes</p>
                <p>Servings: {item.servings}</p>
                <button 
                    id="shopping-list-btn"
                    onClick={() => {
                        if(props.onAddToShoppingList && missingIngredients.length > 0)
                        {
                            props.onAddToShoppingList(missingIngredients, item.title)
                        }
                    }}
                >
                    Add Missing Ingredients ({missingIngredients.length})
                </button>
            </div>
        )
    })

    return (
        <div className="recipe-cards-container">
            {theRecipes}
        </div>
    )
}