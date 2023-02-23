import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, leaveEvent, joinEvent, getEvents } from "../../managers/EventManager.js"
import "./event.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleClick = (id) => {
        deleteEvent(id).then(refreshPage)
    }   

    return (
        <article className="events">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">

                        <div className="event__game">{event.game.title}</div>
                        <div className="event_location">Location: {event.location}</div>
                        <div className="event_date">Date: {event.date_of_event} at {event.start_time}</div>
                        <div className="event__organizer">Event Organizer: {event.organizing_gamer.full_name}</div>
                        <div className="event__footer">
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    navigate({ pathname: `edit/${event.id}` })
                                    }}>Edit</button>
                        </div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    handleClick(event.id)
                                }}>Delete</button>
                            {
                                event.joined 
                                ?
                                    <button
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Leave</button>
                                :
                                    <button
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Join</button>
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )
}