import React, { useEffect, useState  } from 'react'
import Axios from 'axios'

export default function BuildPlan() {


    const [ingredients, setIngredients] = useState([])

    useEffect(() => {

        let ids = this.props.mealIds

        for(var id in ids){

            Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/${id}/`)
            .then((res) => {
                setIngredients([...ingredients, ...res.ingredients])
            })
            .catch((err) => {
                
            })

        }
    },[])

    return (
        <table className="table table-striped">

            <thead>
                <th><label className="col-form-label">Ingredient</label></th>
            </thead>

            <tbody>
                {ingredients.map((ingredients) => (
                    <tr key={ingredients.ingredient.id}>
                        <td><label className="col-form-label">{ingredients.ingredient.name}</label></td>
                    </tr>
                ))}
            </tbody>


        </table>
    )
}
