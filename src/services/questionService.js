import apiClient from "../services/api-client.js";

// Quiz-Fragen laden
export const getQuizQuestions = async (amount = 5, category = null) => {
  try {
    console.log(`Lade ${amount} Quiz-Fragen für Kategorie:`, category);

    let url = `/questions/random?limit=${amount}`;
    if (category) {
      url = `/questions/random?category=${category}&limit=${amount}`;
    }

    const response = await apiClient.get(url);

    console.log("✅ Quiz-Fragen geladen:", response.data.length);
    return response.data;

  } catch (error) {
    console.error("❌ Fehler beim Quiz-Laden:", error);
    return [];
  }
};

// Alle Quiz-Fragen laden
export const getAllQuizQuestions = async () => {
  try {
    console.log("Lade alle Fragen...");

    const response = await apiClient.get("/questions");

    console.log("✅ Alle Fragen geladen:", response.data.length);
    return response.data;

  } catch (error) {
    console.error("❌ Fehler beim Laden aller Fragen:", error);
    return [];
  }
};

// Neue Frage erstellen
export const createQuizQuestion = async (questionData) => {
  try {
    console.log("Erstelle Frage:", questionData);

    const response = await apiClient.post("/questions", questionData);

    console.log("✅ Frage erstellt:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Fehler beim Erstellen:", error);
    throw error;
  }
};

// Frage updaten
export const updateQuizQuestion = async (questionId, updatedData) => {
  try {
    console.log(`Update Frage ${questionId}`);

    const response = await apiClient.put(`/questions/${questionId}`, updatedData);

    console.log("✅ Frage aktualisiert:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Fehler beim Aktualisieren:", error);
    throw error;
  }
};

// Frage löschen
export const deleteQuizQuestion = async (questionId) => {
  try {
    console.log(`Lösche Frage ${questionId}`);

    await apiClient.delete(`/questions/${questionId}`);

    console.log("✅ Frage gelöscht");
    return true;

  } catch (error) {
    console.error("❌ Fehler beim Löschen:", error);
    throw error;
  }
};