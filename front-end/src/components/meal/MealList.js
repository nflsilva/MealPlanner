import React, { Fragment, useEffect, useState  } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'

import PageTitle from '../layout/PageTitle'
import GridCard from '../layout/GridCard'

export default function MealList() {

    const [meals, setMeals] = useState([])
    const [selectedMeals, setSelectedMeals] = useState([])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/meals/`)
       .then((res) => {
            setMeals(res.data)
       })
       .catch((err) => {
       })
    },[])

    const onSelectMeal = (index) => {
        setSelectedMeals([...selectedMeals, index])
    }
    const onDeselectMeal = (index) => {
        var newMeals = selectedMeals
        newMeals.splice(newMeals.indexOf(index), 1)
        setSelectedMeals([...newMeals])
    }

    const onCreateMealPlan = (e) => {
        alert(selectedMeals)
    }

    return (
        <Fragment>
            <PageTitle title="My Meals"/>
            <button className="btn btn-primary" onClick={onCreateMealPlan}>Create Mealplan</button>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={3} md={2} lm={1}>
                    <GridCard 
                        name={'Add new'} 
                        isAdd={true} 
                        link={'/meal'}
                    />
                </Grid>
                {meals.map((meal, index) => (
                    <Grid key={meal.id} item xs={6} sm={3} md={2} lm={1}>
                        <GridCard 
                            index={index}
                            name={`${meal.name}`} 
                            isAdd={false} 
                            link={`/meal/${meal.id}/`} 
                            image={meal.image}
                            onCheckboxSelect={onSelectMeal}
                            onCheckboxDeselect={onDeselectMeal}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    )
}
