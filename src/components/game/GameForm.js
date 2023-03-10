import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

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
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(res => setGameTypes(res))
    }, [])

    const changeGameState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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
                    <label htmlFor="min_player">Minimum Number of Players: </label>
                    <input type="number" name="min_player" required autofocus className="form-control"
                        value={parseInt(currentGame.min_player)}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_player">Maximum Number of Players: </label>
                    <input type="number" name="max_player" required autofocus className="form-control"
                        value={parseInt(currentGame.max_player)}
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
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}