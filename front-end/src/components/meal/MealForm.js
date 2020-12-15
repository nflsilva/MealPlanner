import React, { Fragment, useEffect, useState  } from 'react'
import Axios from 'axios'
import { useAlert } from 'react-alert'
import Select from 'react-select'

import PageTitle from '../layout/PageTitle'

export default function MealForm({ match }) {

    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState(['Cebola', 'Alho', 'Sal'])

    const alert = useAlert();

    const stateHandlers = {
        'name':setName,
    }

    const onChange = (e) => {
        stateHandlers[e.target.name](e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const meal = {
          name: name,
        }

        var promess
        var alertMessage
        if(match.params.id){
            promess = Axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/meal/${match.params.id}/`, meal);
            alertMessage = 'updated';
        }
        else {
            promess = Axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/meal/`, meal);
            alertMessage = 'added';
        }

        promess.then((res) => {
            alert.success(`${name} was successfully ${alertMessage}.`);
            setTimeout(() => {
                window.location.href = '/meals/'
            }, 2000);
        })
        .catch((err) => {
            alert.error(err)
        })

    }

    useEffect(() => {
        if(match.params.id){
            Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/meal/${match.params.id}/`)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)
                setIngredients(res.data.ingredients)
            })
            .catch((err) => {
                alert.error(err)
            })
        }
    }, [match.params.id, alert])

    const aquaticCreatures = [
        { label: 'Shark', value: 'Shark' },
        { label: 'Dolphin', value: 'Dolphin' },
        { label: 'Whale', value: 'Whale' },
        { label: 'Octopus', value: 'Octopus' },
        { label: 'Crab', value: 'Crab' },
        { label: 'Lobster', value: 'Lobster' },
      ];


    return (
        <Fragment>
            <PageTitle />
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Legend</legend>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
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
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ingredients</label>
                        <div className="col-sm-10">
                        
                            <Select options={aquaticCreatures}/>

                            <ul className="form-control-plaintext">
                                {ingredients.map((ingredient) => (
                                    <li key={ingredient}>ingredient</li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">{match.params.id ? "Update" : "Create"}</button>
                    
                </fieldset>
            </form>
        </Fragment>
    )
}
