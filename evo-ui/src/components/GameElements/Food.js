import React from 'react'

const Food = (props) => {
    return (<div className="snake-food" style={{
        left: `${props.food[0]}%`,
        top: `${props.food[1]}%`
    }}></div>)
}

export default Food;