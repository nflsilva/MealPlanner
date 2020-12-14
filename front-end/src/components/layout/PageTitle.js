import React, { Fragment } from 'react'

export default function PageTitle(props) {

    return (
        <Fragment>
            <div className="page-header mx-5 text-center">
                <h1>{props.title ?? "PageTitle"}</h1>
            </div>
        </Fragment>
    )
}
