import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../images/cardDefaultImage.png'
import addImage from '../../images/cardDefaultImageAdd.png'

export default function GridCard(props) {

    const [isSelected, setSelected] = useState(false)

    const onSelectChange = (e) => {
        if(isSelected){
            props.onCheckboxDeselect(props.index)
        }
        else {
            props.onCheckboxSelect(props.index)
        }
        setSelected(!isSelected)
    }

    return (

        <div className="card bg-dark text-white" style={{height: "180px"}}>
            <Link to={props.link ?? "/"} >
                <div className="text-center" style={{height: "110px", backgroundColor: "white"}}>
                    <img 
                        style={{height: "100px", width:"auto", maxWidth:"100%", alignContent: "center", borderRadius: "23px", marginTop:"5px"}} 
                        className="card-img-top" 
                        src={props.isAdd ? addImage : (props.image !== null ? `${process.env.REACT_APP_BACKEND_HOST}${props.image}` : defaultImage)} 
                        alt={`${props.name}`} 
                    />
                </div>
            </Link>
            <div className="card-body">
                <h6 className="card-title">{props.name}</h6>
            </div>

            <div className="form-group card-header">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" onChange={onSelectChange}></input>
                </div>
            </div>
        </div>

    )
}
