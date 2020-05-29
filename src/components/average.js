import React from 'react'

const Average = ({ average }) => {
    let percentAverage = `${average}%`
    let starsStyle = { width: `${percentAverage}` }
    return (
        <div className="star-ratings-css">
            <div className="star-ratings-css-top" style={starsStyle}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        </div>
    )
}

export default Average;  