import React from 'react'
import Filter from "../containers/filter"


const Header = () => {
    return (
        <div className="header">
            <h1 className="titre-app">Avis & Restaurants</h1>
            <Filter />
        </div>
    )

}

export default Header