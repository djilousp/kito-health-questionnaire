import axios from "axios";

export const getQuestions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:1337/api/questions?limit=5&offset=0"
    );
    return response;
  } catch (error) {
    console.error("Error fetching questions", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitQuiz = async (quizId: any, answers: any) => {
  try {
    const response = await axios.post(
      `http://localhost:1337/api/questionnaires/${quizId}/take`,
      {
        answers,
      }
    );
    return response;
  } catch (error) {
    console.error("Error submitting quiz", error);
  }
};
