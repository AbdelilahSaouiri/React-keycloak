import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users.jsx";
import Details from "./components/Details.jsx";
import Update from "./components/Update.jsx";
import NoAccess from "./components/NoAccess.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

function App() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/">Users</Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Users />} />
                <Route
                    path="/update/:id"
                    element={
                        <RequireAuth requiredRoles={["ADMIN"]}>
                            <Update />
                        </RequireAuth>
                    }
                />
                <Route path="/details/:id" element={
                    <RequireAuth requiredRoles={["ADMIN"]}>
                        <Details />
                    </RequireAuth>
                } />
                <Route path="/no-access" element={<NoAccess />} />
            </Routes>
        </div>
    );
}

export default App;
