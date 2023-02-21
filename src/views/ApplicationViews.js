import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { GameList } from "../components/game/GameList"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="games" >
                    <Route index element={<GameList />} />
                    <Route path="new" element={<GameForm />} />
                </Route>
                <Route path="events" >
                    <Route index element={<EventList />} />
                </Route>

            </Route>
        </Routes>
    </>
}
