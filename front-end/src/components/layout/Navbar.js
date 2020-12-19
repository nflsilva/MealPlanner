import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar} from 'react-bootstrap';

export default function TopNavbar() {
    return (

        <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Meal Planner</Link>
            <Navbar.Toggle className="navbar-toggler" />
            <Navbar.Collapse>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link className="nav-link" to="/meals/">Meals</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/ingredients/">Ingredients</Link>
                    </li>
                </ul>
            </Navbar.Collapse>
        </Navbar>

    )
}
