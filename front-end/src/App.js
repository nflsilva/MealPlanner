import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



import TopNavbar from "./components/layout/Navbar";
import MealsList from "./components/meal/MealList";
import MealForm from './components/meal/MealForm';
import IngredientsList from "./components/ingredient/IngredientList";
import IngredientForm from './components/ingredient/IngredientForm';
import BuildPlan from './components/plan/BuildPlan';


function App() {
  return (
    <div className="App">
      <div className="container">
        <TopNavbar />

        <Switch>
          <Route exact path="/" component={MealsList}/>

          <Route exact path="/meals" component={MealsList}/>
          <Route exact path="/ingredients" component={IngredientsList}/>

          <Route exact path="/ingredient" component={IngredientForm}/>
          <Route path="/ingredient/:id/" component={IngredientForm}/>
          
          <Route exact path="/meal" component={MealForm}/>
          <Route path="/meal/:id/" component={MealForm}/>

          <Route path="/plans/" component={BuildPlan}/>

        </Switch>

      </div>
    </div>
  );
}

export default App;
