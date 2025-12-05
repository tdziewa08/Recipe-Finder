import { FaStar, FaRegStar } from "react-icons/fa"

export default function RecipeCard(props) {

    const theRecipes = props.recipes.map(item => {
        return (
            <div key={item.id} className="recipe-card">
                <h3>
                    {item.title}
                    <span className="favorite-icon">
                        {(props.allAreFavorites || item.isFavorite) ? <FaStar onClick={() => props.toggleFavorite(item.id)}/> : <FaRegStar onClick={() => props.toggleFavorite(item.id)}/>
                    }</span>
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
                            // console.log("On the List")
                            return <span key={index}>{ing}{index < item.ingredients.length - 1 ? ', ' : ''}</span>
                        }
                        else if(props.allIngredients.includes(ing))
                        {
                            // console.log("Substitute on List")
                            return <span className="blue" key={index}>{ing}{index < item.ingredients.length - 1 ? ', ' : ''}</span>
                        }
                        else
                        {
                            // console.log("Its not on either and should be red")
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
                {/* <p>Cuisine: {item.cuisine}</p>
                <p>Difficulty: {item.difficulty}</p> */}
            </div>
        )
    })

    return (
        <div className="recipe-cards-container">
            {theRecipes}
        </div>
    )
}