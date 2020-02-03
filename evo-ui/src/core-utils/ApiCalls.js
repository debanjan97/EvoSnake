import axios from "axios"

export const fetchData = (type, key) => {
    axios.get(`http://localhost:50000/get/${type}/${key}`).then(response => {
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

export const fetchMostRecentPlayer = () => {
    // if player is cached, no need to make a server call
    let cachedPlayer = localStorage.getItem('stored_player_ign')
    if(!cachedPlayer) {
        console.log("api called")
        return axios.get('http://localhost:50000/get_previous_player').then(response => {
            if(response.status != 200) {
                //failure
                console.log("Internal server error");
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
                resolve({'username': "player1"})
            })
        })
    }
    return new Promise((resolve)=>{
        resolve({'username': cachedPlayer})
    })
}

export const savePlayer = username => {
    return axios.put('http://localhost:50000/add/player', {
        "username": username
    }).then(response => {
        if(response.status != 200) {
            console.log("Internal server error");
            console.log("player not saved")
        }
        else {
            // cache the player
            localStorage.setItem('stored_player_ign', username)
        }
    }).catch(e => {
        console.error("Error in reaching the servers, Stack Trace => ", e);
    })
}

export const saveSnake = (player, score) => {
    return axios.put('http://localhost:50000/add/snake', {
        'player': player,
        'score': score
    }).then(response => {
        if(response.status != 200) {
            console.log("Internal server error");
            console.log("Snake not saved")
        }
        else {
            console.log(response.data)
        }
    }).catch(e => {
        console.error("Error in reaching the servers, Stack Trace => ", e);
    })
}
