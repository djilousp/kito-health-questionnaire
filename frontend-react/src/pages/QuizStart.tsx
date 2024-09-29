import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizStart = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name) {
      navigate('/quiz');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full ">
        <h1 className="text-3xl font-bold text-center mb-6">QuizAppLogo.</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={handleStart}
          className="w-full bg-body-color text-primary-text font-bold py-2 px-4 rounded-md hover:bg-purple-500 transition-colors"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default QuizStart;
