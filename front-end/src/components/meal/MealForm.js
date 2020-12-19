import React, { Fragment, useEffect, useState  } from 'react'
import Axios from 'axios'
import { useAlert } from 'react-alert'
import AsyncSelect from 'react-select/async'
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'

import PageTitle from '../layout/PageTitle'

export default function MealForm({ match }) {

    const [name, setName] = useState('')
    const [ingredientAmounts, setIngredientAmounts] = useState([])
    const [removedIngredients, setRemovedIngredients] = useState([])
    const [image, setImage] = useState('')
    
    const [newIngredientAmout, setNewAmout] = useState(null)
    const [newIngredient, setNewIngredient] = useState(null)


    const alert = useAlert();

    const stateHandlers = {
        'name':setName,
        'amount':setNewAmout,
    }
    const onChange = (e) => {
        stateHandlers[e.target.name](e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const meal = {
          name: name,
          image: image,
          ingredientAmounts: ingredientAmounts,
          removedIngredients: removedIngredients,
        }

        var formData = new FormData();
        formData.append("name", meal.name)
        formData.append("image", meal.image)
        formData.append("ingredientAmounts", JSON.stringify(meal.ingredientAmounts))
        formData.append("removedIngredients", JSON.stringify(meal.removedIngredients))

        let headers = { headers: {'Content-Type': 'multipart/form-data'}}
        var promess
        var alertMessage
        if(match.params.id){
            promess = Axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/${match.params.id}/`, formData, headers);
            alertMessage = 'updated';
        }
        else {
            promess = Axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/`, formData, headers);
            alertMessage = 'added';
        }

        promess.then((res) => {
            alert.success(`${name} was successfully ${alertMessage}.`);
            setTimeout(() => {
                window.location.href = '/meals/'
            }, 2000);
        })
        .catch((err) => {
            console.log(err)
        })

    }
    const onNewIngredientChange = (v) => {
        setNewIngredient(v);
    }
    
    const loadOptions = (inputValue, callback) => {
        if(inputValue){
        
            Axios.get(
                `${process.env.REACT_APP_BACKEND_HOST}/api/ingredients/?name=${inputValue}`
            )
            .then((res) => {
                callback(
                    res.data.filter((e) => {
                        return !ingredientAmounts.some((i) => i.ingredient.id === e.id)
                    })
                )
            })
            .catch((err) => {
                if(Axios.isCancel(err)){
                    console.log("Canceled!")
                }
                else {
                    console.log(err)
                }
            })
        }
    }
    const onNewIngredientAdd = () => {
        if(newIngredientAmout && newIngredient){
            setIngredientAmounts([...ingredientAmounts, {amount: newIngredientAmout, ingredient: newIngredient}])
            setNewAmout(null)
            setNewIngredient(null)
        }

    }
    const onIngredientRemove = (index) => {
        setIngredientAmounts(ingredientAmounts.filter((e, i) => {
            var willRemove = i !== index
            if(!willRemove && e.id != null){
                setRemovedIngredients([...removedIngredients, e.id])
            }
            return willRemove
        }))
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        if(match.params.id){
            Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/${match.params.id}/`)
            .then((res) => {
                setName(res.data.name)
                setIngredientAmounts(res.data.ingredientAmounts)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [match.params.id, alert])


    return (
        <Fragment>
            <PageTitle title={"New Meal"} />
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Legend</legend>

                    <div className="form-group row">

                        <div className="col-sm-12 col-md-4">
                            <label className="col-form-label">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="type a name"
                                value={name} 
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="col-sm-12 col-md-4">
                            <label className="col-form-label">Time</label>
                            <input 
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </div>

                        <div className="col-sm-12 col-md-4">
                            <label className="col-form-label">Image</label>
                            <input 
                                type="file" 
                                className="form-control-file" 
                                name={"image"} 
                                id={"image"} 
                                onChange={onImageChange}
                            />
                        </div>


                    </div>

                    <div className="form-group row col-md-8 offset-md-2">
                        <table className="table table-striped">

                            <thead>
                                <th className="col-1"></th>
                                <th className="col-2"><label className="col-form-label">Amount</label></th>
                                <th className="col-9"><label className="col-form-label">Ingredient</label></th>
                            </thead>

                            <tbody>
                                {ingredientAmounts.map((ingredientAmount, index) => (
                                    <tr key={ingredientAmount.ingredient.id}>
                                        <td><div className="col-form-label"><MdRemoveCircleOutline onClick={() => onIngredientRemove(index)} /></div></td>
                                        <td><label className="col-form-label">{ingredientAmount.amount}</label></td>
                                        <td><label className="col-form-label">{ingredientAmount.ingredient.name}</label></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><MdAddCircleOutline onClick={onNewIngredientAdd}/></td>
                                    <td><input onChange={onChange} type="text" className="form-control" id="amount" name="amount" placeholder="100g" value={newIngredientAmout ?? ''}/></td>
                                    <td>
                                        <AsyncSelect 
                                            name="newIngredient"
                                            cacheOptions 
                                            defaultOptions
                                            value={newIngredient}
                                            loadOptions={loadOptions}
                                            onChange={onNewIngredientChange}
                                            getOptionLabel={e => e.name}
                                            getOptionValue={e => e.id}
                                        />
                                    </td>
                                </tr>
                            </tbody>


                        </table>


                    </div>


                    <button type="submit" className="btn btn-primary">{match.params.id ? "Update" : "Create"}</button>
                    
                </fieldset>
            </form>
        </Fragment>
    )
}
