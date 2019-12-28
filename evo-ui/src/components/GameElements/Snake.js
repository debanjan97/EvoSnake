import React from 'react'

const Snake = (props) => {
    return (<div style={{

    }}>
        {props.snakeBod.map((dot, i) => {
            return (<div className="snake-dot" key={i} style={{
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }}></div>)
        })}
    </div>)
}

export default Snake;