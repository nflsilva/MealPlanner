import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../images/cardDefaultImage.png'
import addImage from '../../images/cardDefaultImageAdd.png'

export default function GridCard(props) {
    return (

        <div className="card bg-dark text-white" style={{maxWidth: "10rem"}}>
            <Link to={props.link ?? "/"}>
                <img className="card-img-top" src={props.isAdd ? addImage : (props.image ?? defaultImage)} alt={`${props.name}`} />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text"></p>
            </div>
        </div>

    )
}
