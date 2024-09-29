import { useState } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useFetchQuiz } from '../hooks/useFetchQuiz';
import axiosInstance from '../axiosInstance';
export const Quiz = () => {
  const { data, isLoading, isError } = useFetchQuiz('66f8075c60f3d0e97604070f');

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: string; answerId: string }[]
  >([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [results, setResults] = useState<{
    correctlyAnsweredQuestionsIds: string[];
    wronglyAnsweredQuestionsIds: string[];
    score: number;
  } | null>(null);

  const handleAnswerSelect = (answerId: string, questionId: string) => {
    const updatedAnswers = [...selectedAnswers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex].answerId = answerId;
    } else {
      updatedAnswers.push({ questionId, answerId });
    }

    setSelectedAnswers(updatedAnswers);
    setErrorMessage(null);
  };

  const handleNext = () => {
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const allAnswered = data.questions.every((question: { _id: string }) =>
      selectedAnswers.some((answer) => answer.questionId === question._id)
    );

    if (!allAnswered) {
      setErrorMessage('Please answer all the questions before submitting.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/api/questionnaires/66f8075c60f3d0e97604070f/take',
        {
          answers: selectedAnswers,
        }
      );

      if (response.status === 200) {
        setResults(response.data);
      } else {
        alert('Failed to submit quiz.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred during submission.');
    }
  };

  return (
    <section className="min-h-[80vh]">
      {isLoading ? (
        <div className="h-full flex justify-center">
          <AiOutlineLoading3Quarters className="animate-spin" size={50} />
        </div>
      ) : isError ? (
        <div className="h-full">
          <h1 className="text-red-600 text-4xl font-extrabold">
            Something Wrong happened
          </h1>
        </div>
      ) : (
        <div className="p-4 md:m-10 bg-primary rounded-3xl">
          <div className="h-full grid gap-4 md:px-12">
            <h1 className="font-extrabold md:p-4 md:text-6xl">{data.title}</h1>
            <>
              <h2 className="md:text-3xl font-semibold !text-left">
                {`${currentQuestion + 1}. ${
                  data.questions[currentQuestion].prompt
                }`}
              </h2>
              <div className="font-secondary row-span-4 grid md:gap-y-4 gap-y-2">
                {data.questions[currentQuestion].answers.map(
                  (answer: { answerText: string; _id: string }) => {
                    const isWronglyAnswered =
                      results?.wronglyAnsweredQuestionsIds.includes(
                        data.questions[currentQuestion]._id
                      );
                    const isSelected = selectedAnswers.some(
                      (a) =>
                        a.questionId === data.questions[currentQuestion]._id &&
                        a.answerId === answer._id
                    );

                    const isCorrectAnswer =
                      data.questions[currentQuestion].correctAnswerId ===
                      answer._id;

                    return (
                      <label
                        key={answer._id}
                        className={`flex justify-start block p-4 rounded-lg border cursor-pointer ${
                          results
                            ? isCorrectAnswer
                              ? 'border-green-500 bg-green-100'
                              : isSelected && isWronglyAnswered
                              ? 'border-red-500 bg-red-100'
                              : 'border-gray-300'
                            : isSelected
                            ? 'border-teal-500 bg-accent-hover text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          onClick={() =>
                            handleAnswerSelect(
                              answer._id,
                              data.questions[currentQuestion]._id
                            )
                          }
                          disabled={!!results}
                          checked={isSelected}
                        />
                        {answer.answerText}
                      </label>
                    );
                  }
                )}
              </div>
            </>

            {errorMessage && (
              <div className="text-red-500 font-bold">{errorMessage}</div>
            )}

            <div className="md:mt-12 flex justify-between">
              <button
                onClick={handlePrevious}
                className="hover:bg-accent-hover grid grid-cols-4 px-4 py-2 rounded-md bg-accent text-white font-semibold text-lg"
                disabled={currentQuestion === 0}
              >
                <GrLinkPrevious className="h-full flex" />
                <span className="col-span-3 text-white">Previous</span>
              </button>

              {currentQuestion !== data.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="hover:bg-accent-hover grid grid-cols-4 px-4 py-2 rounded-md bg-accent text-white font-semibold text-lg"
                >
                  <span className="col-span-3 text-white">Next</span>
                  <GrLinkNext className="h-full flex flex-col align-bottom" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="hover:bg-accent-hover grid grid-cols-4 px-4 py-2 rounded-md bg-accent text-white font-semibold text-lg"
                  disabled={!!results}
                >
                  <span className="col-span-4 text-white">Submit</span>
                </button>
              )}
            </div>

            {/* Display the score after submission */}
            {results && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold">
                  Your Score: {results.score}
                </h2>
                <p className="text-lg">
                  Correctly Answered:{' '}
                  {results.correctlyAnsweredQuestionsIds.length}
                </p>
                <p className="text-lg">
                  Wrongly Answered: {results.wronglyAnsweredQuestionsIds.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
