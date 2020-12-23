import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';

export default function TopNavbar() {
    return (

        <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Meal Planner</Link>
            <Navbar.Toggle className="navbar-toggler" />
            <Navbar.Collapse>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/meals/">Meals</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ingredients/">Ingredients</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/plans/">Plans</Link>
                    </li>
                </ul>
            </Navbar.Collapse>
        </Navbar>

    )
}
