import EvoContext from './context'
import React, { useState } from "react";

function EvoProvider({children}) {
    const [player, setPlayer] = useState({})
    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [duration, setDuration] = useState(0)
    return <EvoContext.Provider value={{
        player: player,
        updatePlayer: player => {
            setPlayer(player)
        },
        score: score,
        updateScore: score => {
            setScore(score)
        },
        moves: moves,
        updateMoves: moves => {
            setMoves(moves)
        },
        duration: duration,
        setDuration: duration => {
            setDuration(duration)
        }
    }}>
        {children}
    </EvoContext.Provider>
}

export default EvoProvider