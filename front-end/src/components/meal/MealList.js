import React, { Fragment, useEffect, useState  } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'

import PageTitle from '../layout/PageTitle'
import GridCard from '../layout/GridCard'

export default function MealList() {

    const [meals, setMeals] = useState([])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/`)
       .then((res) => {
            setMeals(res.data)
       })
       .catch((err) => {
       })
    },[])

    return (
        <Fragment>
            <PageTitle title="My Meals"/>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={3} md={2} lm={1}>
                    <GridCard 
                        name={'Add new'} 
                        isAdd={true} 
                        link={'/meal'}
                    />
                </Grid>
                {meals.map((meal) => (
                    <Grid key={meal.id} item xs={6} sm={3} md={2} lm={1}>
                        <GridCard 
                            name={`${meal.name}`} 
                            isAdd={false} 
                            link={`/meal/${meal.id}/`} 
                            image={meal.image}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    )
}
