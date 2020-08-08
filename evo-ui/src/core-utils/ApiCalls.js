import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:50000',
});


export const fetchData = (type, key) => {
    instance.get(`/get/${type}/${key}`).then(response => {
        if(response.status != 200) {
            //failure
            console.error("Internal server error");
            return new Promise((resolve)=>{
                resolve({'username': 'player1'})
            })
        }
        else {
            //success
            return response.data
        }
    }).catch(e => {
        console.error("Error in reaching the servers, Stack Trace => ", e);
        return new Promise((resolve)=>{
            resolve({'username': 'player1'})
        })
    })
}

export const fetchMostRecentPlayer = async () => {
    // if player is cached, no need to make a server call
    let cachedPlayer = localStorage.getItem('stored_player')
    if(!cachedPlayer) {
        try {
            const response = await instance.get('/get_previous_player');
            if (response.status != 200) {
                //failure
                console.log("Internal server error");
                return new Promise((resolve) => {
                    resolve({ 'username': 'player1' });
                });
            }
            else {
                //success
                return response.data;
            }
        }
        catch (e) {
            console.error("Error in reaching the servers, Stack Trace => ", e);
            return new Promise((resolve) => {
                resolve({ 'username': "player1" });
            });
        }
    }
    return new Promise((resolve)=>{
        resolve({'username': cachedPlayer})
    })
}

export const savePlayer = async username => {
    try {
        const response = await instance.put('/add/player', {
            "username": username
        });
        if (response.status != 200) {
            console.log("Internal server error");
            console.log("player not saved");
        }
        else {
            // cache the player
            localStorage.setItem('stored_player_ign', username);
        }
    }
    catch (e) {
        console.error("Error in reaching the servers, Stack Trace => ", e);
    }
}

export const saveSnake = async (player, score) => {
    try {
        const response = await instance.put('/add/snake', {
            'player': player,
            'score': score
        });
        if (response.status != 200) {
            console.log("Internal server error");
            console.log("Snake not saved");
        }
        else {
            console.log(response.data);
        }
    }
    catch (e) {
        console.error("Error in reaching the servers, Stack Trace => ", e);
    }
}

export const getPlayerHighScore = async (playerId) => {
    const response = await instance.get(`/${playerId}/highscore`);
    if (response.status != 200) {
        console.error("Cannot fetch highscores");
        return new Promise(resolve => {
            resolve("Could not fetch highscore");
        });
    }
    return response.data;
}

export const getTotalHighScore = async () => {
    const response = await instance.get('/total_highscore');
    if (response.status != 200) {
        console.error("Cannot fetch highscores");
        return new Promise(resolve => {
            resolve("Could not fetch highscore");
        });
    }
    return response.data;
}

export const getPlayerAverageScore = async (playerId) => {
    const response = await instance.get(`/${playerId}/average_score`);
    if (response.status != 200) {
        console.error("Cannot fetch highscores");
        return new Promise(resolve => {
            resolve("Could not fetch highscore");
        });
    }
    return response.data;
}
