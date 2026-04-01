import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Forbidden from './pages/Forbidden.jsx'; // ← NEU
import ProtectedRoute from './components/protected-route.jsx'; // ← NEU


import Home from "./pages/Home";
import Game from "./pages/Game";
import QuestionManager from "./pages/QuestionManager";
import Impressum from "./pages/Impressum";
import Rules from "./pages/Rules";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Öffentliche Routes */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="regeln" element={<Rules />} />
                <Route path="blabli" element={<Impressum />} />
                <Route path="forbidden" element={<Forbidden />} />

                {/* Geschützte Routes - nur für eingeloggte User */}
                <Route
                    path="quiz"
                    element={
                        <ProtectedRoute>
                            <Game />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Route - nur für ADMIN Rolle */}
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <QuestionManager />
                        </ProtectedRoute>
                    }
                />

                {/* 404 Page */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;






