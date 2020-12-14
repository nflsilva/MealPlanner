import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import MealsList from "./components/meal/MealList";
import IngredientsList from "./components/ingredient/IngredientList";
import IngredientForm from './components/ingredient/IngredientForm';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Dashboard}/>

          <Route exact path="/meals" component={MealsList}/>
          <Route exact path="/ingredients" component={IngredientsList}/>

          <Route exact path="/ingredient" component={IngredientForm}/>
          <Route path="/ingredient/:id/" component={IngredientForm}/>
          
        </Switch>

      </div>
    </div>
  );
}

export default App;
