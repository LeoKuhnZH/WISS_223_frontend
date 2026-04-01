import { useState } from "react";

import { getQuizQuestions } from "../services/questionService.js";
import { getDemoQuizQuestions } from "../utils/demo-api";

import Button from "../components/button";
import GameSession from "../components/game-session";

const Game = () => {
  // Bestehende States
  const [showCategorySelector, setShowCategorySelector] = useState(true);
  const [apiQuestions, setApiQuestions] = useState([]);

  // Neue States für Ladezustand und Fehler
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJavaQuestions = async (category) => {
    setIsLoading(true);
    setError(null);

    // Fragen von der Java API laden
    try {
      await getDemoQuizQuestions();
      const questions = await getQuizQuestions(5, category);
      console.log("Java API Questions:", questions);
      setApiQuestions(questions);
    } catch (err) {
      console.error("Backend Error:", err);
      if (err.response?.status === 404) {
        setError(
          "Kategorie nicht gefunden. Bitte versuche eine andere Kategorie."
        );
      } else if (err.response?.status >= 500) {
        setError("Server-Fehler. Bitte versuche es später erneut.");
      } else {
        setError("Fehler beim Laden der Fragen. Bitte versuche es erneut.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Kategorie-Button-Klick-Handler
  // warum async? Damit wir await verwenden können
  // warum await? Damit wir warten, bis die Fragen geladen sind, bevor wir den Zustand ändern
  // warum setShowCategorySelector(false)? Damit die Kategorie-Auswahl ausgeblendet wird
  // warum kein useEffect?
  // Weil wir die Fragen nur laden wollen, wenn der Benutzer eine Kategorie auswählt
  // und nicht nicht automatisch beim Laden der Seite
  const handleCategoryClick = async (category) => {
    setShowCategorySelector(false);
    await fetchJavaQuestions(category);
  };

  // Reset-Handler, um das Spiel zurückzusetzen
  // warum setShowCategorySelector(true)?
  // Damit die Kategorie-Auswahl wieder angezeigt wird
  // warum setApiQuestions([])?
  // Damit die Fragen zurückgesetzt werden und das Spiel neu gestartet werden kann
  const handleResetGame = () => {
    setShowCategorySelector(true);
    setApiQuestions([]);
  };

  return (
    <div className="game">
      {/* Loading-Zustand anzeigen */}
      {isLoading && (
        <div className="loading">
          <h2>🔄 Fragen werden geladen...</h2>
          <p>Bitte warten Sie einen Moment.</p>
        </div>
      )}

      {/* Error-Zustand anzeigen */}
      {error && (
        <div className="error">
          <h2>❌ Fehler aufgetreten</h2>
          <p>{error}</p>
          <Button
            text="Zurück zur Auswahl"
            onAnswerClick={() => {
              setError(null);
              setShowCategorySelector(true);
            }}
          />
        </div>
      )}

      {/* Kategorienauswahl nur anzeigen wenn nicht geladen wird und kein Fehler */}
      {showCategorySelector && !isLoading && !error && (
        <div>
          <h2>Wähle eine Kategorie:</h2>
          <div className="category-buttons">
            <Button
              text="Sport"
              onAnswerClick={() => handleCategoryClick("sports")}
            />
            <Button
              text="Filme"
              onAnswerClick={() => handleCategoryClick("movies")}
            />
            <Button
              text="Geographie"
              onAnswerClick={() => handleCategoryClick("geography")}
            />
          </div>
        </div>
      )}

      {/* Quiz-Session nur anzeigen wenn Fragen vorhanden und nicht geladen wird */}
      {!showCategorySelector &&
        !isLoading &&
        !error &&
        apiQuestions.length > 0 && (
          <GameSession questions={apiQuestions} onResetGame={handleResetGame} />
        )}
    </div>
  );
};

export default Game;
