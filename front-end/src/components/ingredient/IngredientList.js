import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'

import PageTitle from '../layout/PageTitle'
import GridCard from '../layout/GridCard'


export default function IngredientList() {

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/ingredient/`)
       .then((res) => {
            console.log(res)
            setIngredients(res.data)
       })
       .catch((err) => {
           console.log(err)
       })
    },[])

    return (    
        <Fragment>
            <PageTitle title="My Ingredients"/>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <GridCard 
                    name={'Add new'} 
                    isAdd={true}
                    link={'/ingredient'}
                    />
                </Grid>
                {ingredients.map((ingredient) => (
                    <Grid key={ingredient.id} item xs={2}>
                        <GridCard 
                            name={`${ingredient.name}`} 
                            isAdd={false} 
                            link={`/ingredient/${ingredient.id}/`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>    
    )
}
