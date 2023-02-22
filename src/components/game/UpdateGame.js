// A react route that renders a form
// The form should be filled out with the existing data
// When changes are made in the form the state of the component updates
// When the submit button is clicked, it should make a PUT request to the correct resource with the updated data in the body
// After the fetch call is resolved, the page should route to the game/event’s detail page

import { useState, useEffect } from "react"
import { useNavigate,useParams } from 'react-router-dom'
import { getGameById, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const UpdateGame = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        min_players:0,
        max_players:0,
        min_age: 0,
        gamer: 0,
        game_type: {},
        // gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
        getGameById(gameId).then((data) => {
            data.gameTypeId = data.game_type.id
            setCurrentGame(data)
        })
    }, [gameId])

    const changeGameState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="min_players">Minimum Number of Players: </label>
                    <input type="number" name="min_players" required autofocus className="form-control"
                        value={parseInt(currentGame.min_players)}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_players">Maximum Number of Players: </label>
                    <input type="number" name="max_players" required autofocus className="form-control"
                        value={parseInt(currentGame.max_players)}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="min_age">Minimum Age Requirement: </label>
                    <input type="number" name="min_age" required autoFocus className="form-control"
                        value={currentGame.min_age}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                <label className="label">Type of Game: </label>
                <select
                        name="game_type"
                        className="form-control"
                        value={currentGame.game_type}
                        onChange={(event) => {
                            const copy = { ...currentGame }
                            copy.game_type = parseInt(event.target.value)
                            setCurrentGame(copy)
                        }}>
                        <option value="0">Choose:</option>
                        {gameTypes.map(type => ( 
                                    <option key={`game_type--${type.id}`} value={type.id} name={type.label}>{type.label}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        min_players: currentGame.min_players,
                        max_players: currentGame.max_players,
                        min_age: currentGame.min_age,
                        game_type: currentGame.game_type
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}