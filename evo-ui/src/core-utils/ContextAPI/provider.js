import EvoContext from './context'
import React, { useState } from "react";

function EvoProvider({children}) {
    const [player, setPlayer] = useState({})
    return <EvoContext.Provider value={{
        player: player,
        updatePlayer: player => {
            setPlayer(player)
        }
    }}>
        {children}
    </EvoContext.Provider>
}

export default EvoProvider