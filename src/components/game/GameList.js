import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

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
                    </section>
                })
            }
        </article>
    )
}