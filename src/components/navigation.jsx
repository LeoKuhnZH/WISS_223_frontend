import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        console.log('🚪 Logout-Button geklickt');
        logout();
    };

    return (
        <nav className="layout-header-nav">
            <Link to="/">Home</Link>
            <Link to="/regeln">Regeln</Link>

            {isAuthenticated && (
                <>
                    <Link to="/quiz">Quiz</Link>
                    {user?.role === 'ADMIN' && (
                        <Link to="/admin">Fragen verwalten</Link>
                    )}
                </>
            )}

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <span>👤 {user?.username || 'User'}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navigation;