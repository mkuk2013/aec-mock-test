import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Button from './components/ui/button.jsx';
import { Moon, Sun, Download, Lock } from 'lucide-react';
import jsPDF from 'jspdf';
import './App.css';
import logo from './logo.png';

// Import TestProvider and useTest from TestContext.js
import { TestProvider as AppTestProvider, useTest } from './context/TestContext';

// Theme Context for managing dark/light mode
const ThemeContext = createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- COMPONENTS ---

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="h-12 w-12 rounded-full bg-background/20 hover:bg-background/40 transition-all duration-300"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-400 transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="h-6 w-6 text-slate-600 transition-all duration-300 rotate-0 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useTest();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

// 1. LoginScreen Component
const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useTest();

  const correctPassword = "aectestbyayesharani";

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      navigate('/test');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-sm transform transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-slate-700">
        <div className="flex justify-center gap-3 items-center mb-6">
 <Lock className="h-7 w-7 text-blue-600 dark:text-blue-400"/>
<h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Secure Access</h2>
          <ThemeToggle />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Enter the password to begin the test.</p>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm appearance-none border border-gray-300 dark:border-slate-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white bg-white dark:bg-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            placeholder="Enter password"
          />
          {error && <p className="text-red-600 dark:text-red-400 text-sm mt-3 text-center">{error}</p>}
        </div>
        <Button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Access
        </Button>
      </div>
    </div>
  );
};

// 2. Header Component
const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white p-4 flex items-center fixed top-0 left-0 right-0 z-20 shadow-lg backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 transition-colors duration-300">
      {/* This div will take available space and center its content */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={logo}
          alt="Company Logo"
          className="h-10 w-10 mr-3 rounded-full dark:filter dark:brightness-0 dark:invert"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=Error"; }}
        />
        {/* h1 styling for dark mode text is white */}
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Assistant Election Commissioner (BS-17) Mock Test 1
        </h1>
      </div>
      {/* This div ensures the ThemeToggle maintains its size and stays to the right */}
      <div className="flex-shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
};

// 3. Question Component
// *** FIX APPLIED: Added 'questionIndex' to props and used it in onChange ***
const Question = ({ question, selectedOption, onOptionSelect, questionIndex }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg">
      {/* Ensure question.id is a valid number from your TestContext.js */}
      <p className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">Q{question.id}. {question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]
              ${selectedOption === index
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-500 text-blue-800 dark:text-blue-300 font-medium border shadow-md'
                : 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600'}
            `}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => onOptionSelect(questionIndex, index)} // *** FIXED: Using questionIndex for correct array update ***
              className="form-radio h-5 w-5 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-slate-500 focus:ring-blue-500 dark:focus:ring-400"
            />
            <span className="ml-3 text-base sm:text-lg text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// 4. NavigationButtons Component
const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  onFlag,
  isFlagged
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <Button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md
          ${currentQuestionIndex === 0 ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}
        `}
      >
        Previous
      </Button>
      <Button
        onClick={onFlag}
        className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md
          ${isFlagged ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700' : 'bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700'}
        `}
      >
        {isFlagged ? 'Unflag' : 'Flag'}
      </Button>
      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="flex-1 py-3 px-6 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Submit Test
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex-1 py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Next
        </Button>
      )}
    </div>
  );
};

// 5. QuestionPalette Component
const QuestionPalette = ({ totalQuestions, currentQuestionIndex, userAnswers, flaggedQuestions, onQuestionJump }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg mt-6 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-slate-600 scrollbar-track-gray-200 dark:scrollbar-track-slate-700 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="inline-flex space-x-2 pb-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAttempted = userAnswers[index] !== undefined;
          const isFlagged = flaggedQuestions.includes(index);
          const isCurrent = index === currentQuestionIndex;

          let buttonClass = 'flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold flex-shrink-0 transition-all duration-200 hover:scale-110';

          if (isCurrent) {
            buttonClass += ' bg-blue-600 dark:bg-blue-700 text-white border-2 border-blue-800 dark:border-blue-500 shadow-md';
          } else if (isFlagged) {
            buttonClass += ' bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 border-2 border-yellow-600 dark:border-yellow-400';
          } else if (isAttempted) {
            buttonClass += ' bg-green-500 dark:bg-green-600 text-white';
          } else {
            buttonClass += ' bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-500';
          }

          return (
            <button
              key={index}
              onClick={() => onQuestionJump(index)}
              className={buttonClass}
              title={
                isCurrent ? 'Current Question' :
                isFlagged ? 'Flagged' :
                isAttempted ? 'Attempted' : 'Not Attempted'
              }
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 6. Footer Component
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 p-4 text-center text-sm fixed bottom-0 left-0 right-0 z-20 shadow-lg backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 transition-colors duration-300">
      &copy; {new Date().getFullYear()} Assistant Election Commissioner Mock Test. All rights reserved.
    </footer>
  );
};

// 7. TestScreen Component
const TestScreen = () => {
  const {
    questions,
    userAnswers,
    setUserAnswers,
    flaggedQuestions,
    setFlaggedQuestions,
    setTimeTaken,
    setIsTestCompleted
  } = useTest();

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100 * 60);
  const [startTime] = useState(Date.now());

  // IMPORTANT: Declare handleSubmit BEFORE the useEffect that references it
  const handleSubmit = useCallback(() => {
    const endTime = Date.now();
    const durationInSeconds = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(durationInSeconds);
    setIsTestCompleted(true);
    navigate('/result');
  }, [navigate, startTime, setTimeTaken, setIsTestCompleted]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [handleSubmit]);

  // *** FIXED: Changed 'questionId' to 'questionIndex' and removed '- 1' ***
  const handleOptionSelect = useCallback((questionIndex, selectedOptionIndex) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedOptionIndex; // Direct use of 0-based index
      return newAnswers;
    });
  }, [setUserAnswers]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
  }, [questions.length]);

  const handleQuestionJump = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  const handleFlag = useCallback(() => {
    setFlaggedQuestions((prevFlagged) => {
      if (prevFlagged.includes(currentQuestionIndex)) {
        return prevFlagged.filter((idx) => idx !== currentQuestionIndex);
      } else {
        return [...prevFlagged, currentQuestionIndex];
      }
    });
  }, [currentQuestionIndex, setFlaggedQuestions]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-grow p-4 pt-20 pb-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
              Time Left: <span className="text-blue-600 dark:text-blue-400 font-mono">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </p>
          </div>

          <Question
            question={questions[currentQuestionIndex]}
            selectedOption={userAnswers[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
            questionIndex={currentQuestionIndex} // *** FIXED: Passed 'currentQuestionIndex' as 'questionIndex' ***
          />
          <NavigationButtons
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            onFlag={handleFlag}
            isFlagged={flaggedQuestions.includes(currentQuestionIndex)}
          />
          <QuestionPalette
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onQuestionJump={handleQuestionJump}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// PDF Generation Function
const generatePDF = async (questionsData, userAnswers, resultData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
    };

  // Header
  pdf.setFontSize(18);
  pdf.setFont(undefined, 'bold');
  pdf.text('Assistant Election Commissioner Mock Test', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.text('Test Result Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Result Summary
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('Test Summary:', margin, yPosition);
  yPosition += 8;

  pdf.setFont(undefined, 'normal');
  const summaryLines = [
    `Total Questions: ${resultData.totalQuestions}`,
    `Correct Answers: ${resultData.obtainedMarks}`,
    `Incorrect Answers: ${resultData.totalQuestions - resultData.obtainedMarks - resultData.notAttempted}`,
    `Not Attempted: ${resultData.notAttempted}`,
    `Percentage: ${resultData.percentage.toFixed(2)}%`,
    `Status: ${resultData.passingStatus}`,
    `Time Taken: ${Math.floor(resultData.timeTaken / 60)}:${(resultData.timeTaken % 60).toString().padStart(2, '0')}`
  ];

  summaryLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Answer Review
  pdf.setFont(undefined, 'bold');
  pdf.text('Answer Review:', margin, yPosition);
  yPosition += 10;

  questionsData.forEach((question, index) => {
    checkPageBreak(30);

    const userAnswerIndex = userAnswers[index];
    const isCorrect = userAnswerIndex === question.answer;
    const isAttempted = userAnswerIndex !== undefined;

    // Question
    pdf.setFont(undefined, 'bold');
    pdf.setFontSize(10);
    const questionText = `Q${index + 1}. ${question.question}`;
    const questionLines = pdf.splitTextToSize(questionText, pageWidth - 2 * margin);
    questionLines.forEach(line => {
      checkPageBreak(5);
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 2;

    // Options
    pdf.setFont(undefined, 'normal');
    question.options.forEach((option, optionIndex) => {
      checkPageBreak(5);
      const isSelected = optionIndex === userAnswerIndex;
      const isCorrectOption = optionIndex === question.answer;

      let optionText = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
      if (isCorrectOption) {
        optionText += ' (Correct Answer)';
        pdf.setTextColor(0, 128, 0); // Green
      } else if (isSelected && !isCorrect) {
        optionText += ' (Your Answer - Incorrect)';
        pdf.setTextColor(255, 0, 0); // Red
      } else {
        pdf.setTextColor(0, 0, 0); // Black
      }

      const optionLines = pdf.splitTextToSize(optionText, pageWidth - 2 * margin - 10);
      optionLines.forEach(line => {
        pdf.text(line, margin + 5, yPosition);
        yPosition += 4;
      });
    });

    if (!isAttempted) {
      checkPageBreak(5);
      pdf.setTextColor(255, 165, 0); // Orange
      pdf.text('Status: Not Attempted', margin + 5, yPosition);
      yPosition += 5;
    }

    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += 5;
  });

  // Footer
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 8, pageHeight - 10, { align: 'right' });
     pdf.text(`© ${new Date().getFullYear()} Assistant Election Commissioner Mock Test. Powered By Mock Test Hub.`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save the PDF
  pdf.save('Test_Result_Report.pdf');
};

// Component to render Answer Review content
const AnswerReviewContent = ({ questionsData, userAnswers }) => {
  if (!questionsData.length) {
    return <div className="text-center p-8 text-gray-700 dark:text-gray-300">No review data available. Please complete a test first.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Answer Review</h2>
      {questionsData.map((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === question.answer;
        const isAttempted = userAnswerIndex !== undefined;

        return (
          <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 break-inside-avoid transition-colors duration-300">
            <p className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Q{index + 1}. {question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = optionIndex === userAnswerIndex;
                const isCorrectOption = optionIndex === question.answer;

                let optionClass = 'p-2 rounded border text-sm transition-colors duration-200';
                if (isCorrectOption) {
                  optionClass += ' bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionClass += ' bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300';
                } else {
                  optionClass += ' bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300';
                }

                return (
                  <div key={optionIndex} className={optionClass}>
                    <span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                    {isSelected && isCorrect && <span className="ml-2 text-green-600 dark:text-green-400">(Your Answer - Correct)</span>}
                    {isSelected && !isCorrect && <span className="ml-2 text-red-600 dark:text-red-400">(Your Answer - Incorrect)</span>}
                    {isCorrectOption && !isSelected && <span className="ml-2 text-green-600 dark:text-green-400">(Correct Answer)</span>}
                  </div>
                );
              })}
            </div>
            {!isAttempted && (
              <p className="mt-2 text-orange-600 dark:text-orange-400 font-medium text-sm">Status: Not Attempted</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// 8. ResultScreen Component
const ResultScreen = () => {
  const { questions, userAnswers, timeTaken, setIsAuthenticated, resetTestState } = useTest();
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const passingPercentage = 60;
  let obtainedMarks = 0;
  let notAttempted = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] !== undefined && userAnswers[index] === question.answer) {
      obtainedMarks++;
    }
    if (userAnswers[index] === undefined) {
      notAttempted++;
    }
  });

  const percentage = (obtainedMarks / totalQuestions) * 100;
  const passingStatus = percentage >= passingPercentage ? 'Passed' : 'Failed';

  const resultData = {
    totalQuestions,
    obtainedMarks,
    notAttempted,
    percentage,
    passingStatus,
    timeTaken
  };

  const handleRestartTest = () => {
    resetTestState();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSaveAsPDF = async () => {
    try {
      await generatePDF(questions, userAnswers, resultData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl text-center transform transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Test Result</h2>
          <ThemeToggle />
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalQuestions}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Correct</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-300">{obtainedMarks}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Incorrect</p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-300">{totalQuestions - obtainedMarks - notAttempted}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <p className="text-sm text-orange-600 dark:text-orange-400">Not Attempted</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">{notAttempted}</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">Final Score</p>
            <p className="text-4xl font-bold text-blue-800 dark:text-blue-300">{percentage.toFixed(2)}%</p>
            <p className={`text-lg font-semibold mt-2 ${passingStatus === 'Passed' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {passingStatus}
            </p>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Time Taken: <span className="font-semibold font-mono">{Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={handleSaveAsPDF}
            className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Save as PDF
          </Button>
          <Button
            onClick={() => navigate('/review')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Review Answers
          </Button>
        </div>

        <Button
          onClick={handleRestartTest}
          variant="outline"
          className="w-full border-gray-300 dark:border-slate-600 text-white bg-green-500 hover:bg-green-600 dark:hover:bg-green-700 font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Take Another Test
        </Button>
      </div>
    </div>
  );
};

// 9. AnswerReviewScreen Component
const AnswerReviewScreen = () => {
  const { questions, userAnswers, resetTestState, setIsAuthenticated } = useTest();
  const navigate = useNavigate();

  const handleBackToResult = () => {
    navigate('/result');
  };

  const handleRestartTest = () => {
    resetTestState();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Answer Review</h1>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button
            onClick={handleBackToResult}
            variant="outline"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
          >
            Back to Result
          </Button>
          <Button
            onClick={handleRestartTest}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
          >
            New Test
          </Button>
        </div>
      </div>
      <main className="p-4 pb-16">
        <AnswerReviewContent questionsData={questions} userAnswers={userAnswers} />
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AppTestProvider>
        <Router>
          <div className="App transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/test" element={
                <ProtectedRoute>
                  <TestScreen />
                </ProtectedRoute>
              } />
              <Route path="/result" element={
                <ProtectedRoute>
                  <ResultScreen />
                </ProtectedRoute>
              } />
              <Route path="/review" element={
                <ProtectedRoute>
                  <AnswerReviewScreen />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AppTestProvider>
    </ThemeProvider>
  );
}

export default App;