import React, { Fragment, useEffect, useState } from 'react'
import Axios from 'axios'
import { useAlert } from 'react-alert'

import PageTitle from '../layout/PageTitle'

export default function IngredientForm({ match }) {

    const [name, setName] = useState('')
    const [proteins, setProteins] = useState('')
    const [fats, setFats] = useState('')
    const [carbohydrates, setCarbohydrates] = useState('')

    const alert = useAlert();

    const stateHandlers = {
        'name':setName,
        'proteins':setProteins,
        'fats':setFats,
        'carbohydrates':setCarbohydrates,
    }

    const onChange = (e) => {
        stateHandlers[e.target.name](e.target.value)
    }

    const onAmountChange = (e) => {
        const amount = e.target.value;
        const maxLen = amount.includes('.') ? 5 : 4
        if (amount.length < maxLen && (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/))) {
            onChange(e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const ing = {
          name: name,
          proteins: proteins==='' ? 0.0 : proteins,
          fats: fats==='' ? 0.0 : fats,
          carbohydrates: carbohydrates==='' ? 0.0 : carbohydrates
        }

        var promess
        var alertMessage
        if(match.params.id){
            promess = Axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/ingredient/${match.params.id}/`, ing);
            alertMessage = 'updated';
        }
        else {
            promess = Axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/ingredient/`, ing);
            alertMessage = 'added';
        }

        promess.then((res) => {
            alert.success(`${name} was successfully ${alertMessage}.`);
            setTimeout(() => {
                window.location.href = '/ingredients/'
            }, 2000);
        })
        .catch((err) => {
            alert.error(err)
        })

    }

    useEffect(() => {
        if(match.params.id){
            Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/ingredient/${match.params.id}/`)
            .then((res) => {
                setName(res.data.name)
                setProteins(res.data.proteins)
                setFats(res.data.fats)
                setCarbohydrates(res.data.carbohydrates)
            })
            .catch((err) => {
                alert.error(err)
            })
        }
    }, [match.params.id, alert])


    return (
        <Fragment>
            <PageTitle title="Ingredient" />
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
                        <label className="col-sm-2 col-form-label">Proteins</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name={"proteins"} 
                                id={"proteins"} 
                                value={proteins} 
                                onChange={onAmountChange}
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Fats</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name={"fats"} 
                                id={"fats"} 
                                value={fats} 
                                onChange={onAmountChange}
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Carbohydrates</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name={"carbohydrates"} 
                                id={"carbohydrates"} 
                                value={carbohydrates} 
                                onChange={onAmountChange}
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">{match.params.id ? "Update" : "Create"}</button>
                    
                </fieldset>
            </form>
        </Fragment>
    )
}
