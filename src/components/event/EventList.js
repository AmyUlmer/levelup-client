import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">

                        <div className="event__game">{event.game.title}</div>
                        <div className="event_location">Location: {event.location}</div>
                        <div className="event_date">Date: {event.date_of_event} at {event.start_time}</div>
                        <div className="event__organizer">Event Organizer: {event.organizing_gamer.full_name}</div>
                    </section>
                })
            }
        </article>
    )
}