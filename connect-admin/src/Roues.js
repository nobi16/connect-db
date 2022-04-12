import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

function Roues() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                </Routes>
            </Router>

        </>
    )
}

export default Roues