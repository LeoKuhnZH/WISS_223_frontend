import { createContext, useState } from 'react';

// Context erstellen
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    // ==========================================
    // STATE
    // ==========================================
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ==========================================
    // FUNKTIONEN
    // ==========================================

    /**
     * Login Funktion (aktuell noch Fake)
     * Wird in Block 4A durch echten API Call ersetzt!
     *
     * @param {string} usernameOrEmail - Username ODER Email
     * @param {string} password - Passwort
     */
    const login = (usernameOrEmail, password) => {
        setIsLoading(true);

        // TODO: Später ersetzen durch echten API Call!
        setTimeout(() => {
            if (usernameOrEmail && password) {
                // Fake User erstellen (simuliert Backend Response)
                const fakeUser = {
                    id: 1,
                    username: usernameOrEmail.includes('@')
                        ? usernameOrEmail.split('@')[0]  // Email → Username extrahieren
                        : usernameOrEmail,                // Username direkt
                    email: usernameOrEmail.includes('@')
                        ? usernameOrEmail                 // Ist schon Email
                        : `${usernameOrEmail}@example.com`, // Username → Fake Email
                    role: usernameOrEmail === 'admin' || usernameOrEmail === 'admin@quiz.com'
                        ? 'ADMIN'
                        : 'USER'  // ← Backend verwendet "USER" nicht "PLAYER"!
                };

                // Fake Token
                const fakeToken = 'fake-jwt-token-' + Date.now();

                setUser(fakeUser);
                setToken(fakeToken);
                console.log('✅ Login erfolgreich (FAKE):', fakeUser);
            } else {
                console.error('❌ Login fehlgeschlagen');
            }

            setIsLoading(false);
        }, 1000);
    };

    /**
     * Logout Funktion
     */
    const logout = () => {
        setUser(null);
        setToken(null);
        console.log('👋 User ausgeloggt');
    };

    /**
     * Ist ein User eingeloggt?
     */
    const isAuthenticated = user !== null;

    // ==========================================
    // CONTEXT VALUE
    // ==========================================
    const value = {
        // State
        user,
        token,
        isLoading,
        isAuthenticated,
        // Funktionen
        login,
        logout
    };

    // ==========================================
    // PROVIDER
    // ==========================================
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;