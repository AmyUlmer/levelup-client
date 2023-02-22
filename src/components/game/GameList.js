import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame,getGames } from "../../managers/GameManager.js"
import "./game.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([
            {id:0,
            title: "",
            game_type: {},
            min_player: 0,
            max_player: 0,
            min_age: 0,
            gamer:{}
            }
        ])

    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const handleClick = (id) => {
        deleteGame(id).then(refreshPage)
    }   

    return (
        
        <article className="games">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title}</div>
                        <div className="game__type">Type:{game?.game_type?.label}</div>
                        <div className="game__players">{game.min_players}-{game.max_players} players needed</div>
                        <div className="game__min_age">Minimum age is {game.min_age}</div>
                        <div className="game__footer">
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    navigate({ pathname: `edit/${game.id}` })
                                    }}>Edit</button>
                        </div>
                        <div className="game__footer">
                            <button
                                onClick={() => {
                                    handleClick(game.id)
                                }}>Delete</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}