// Updated ResultScreen Component - Replace your existing ResultScreen component with this
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4a4a4a',
  },
  summaryGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  scoreSection: {
    backgroundColor: '#eff6ff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    textAlign: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  passingStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  correct: {
    color: '#16a34a',
  },
  failed: {
    color: '#dc2626',
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 30,
    color: '#6b7280',
  },
  questionContainer: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  questionText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 10,
    marginBottom: 3,
  },
  correctAnswer: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  userAnswer: {
    color: '#2563eb',
  },
  incorrectAnswer: {
    color: '#dc2626',
  },
});

// PDF Document Component
const MyDocument = ({ questionsData, userAnswers, totalQuestions, obtainedMarks, notAttempted, percentage, passingStatus, timeTaken }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Assistant Election Commissioner (BS-17) Mock Test 1 Result</Text>
        <Text style={styles.text}>Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>

        <Text style={styles.subHeader}>Test Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Questions</Text>
            <Text style={styles.summaryValue}>{totalQuestions}</Text>
          </View>
          <View style={{ ...styles.summaryItem, borderColor: '#bbf7d0' }}>
            <Text style={{ ...styles.summaryLabel, color: '#16a34a' }}>Correct</Text>
            <Text style={{ ...styles.summaryValue, color: '#16a34a' }}>{obtainedMarks}</Text>
          </View>
          <View style={{ ...styles.summaryItem, borderColor: '#fecaca' }}>
            <Text style={{ ...styles.summaryLabel, color: '#dc2626' }}>Incorrect</Text>
            <Text style={{ ...styles.summaryValue, color: '#dc2626' }}>{totalQuestions - obtainedMarks - notAttempted}</Text>
          </View>
          <View style={{ ...styles.summaryItem, borderColor: '#fed7aa' }}>
            <Text style={{ ...styles.summaryLabel, color: '#f97316' }}>Not Attempted</Text>
            <Text style={{ ...styles.summaryValue, color: '#f97316' }}>{notAttempted}</Text>
          </View>
        </View>

        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabel}>Final Score</Text>
          <Text style={styles.scoreValue}>{percentage.toFixed(2)}%</Text>
          <Text style={{ ...styles.passingStatus, ...(passingStatus === 'Passed' ? styles.correct : styles.failed) }}>
            {passingStatus}
          </Text>
        </View>

        <Text style={styles.text}>Time Taken: {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</Text>

        <Text style={styles.subHeader}>Answer Review</Text>
        {questionsData.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correctOptionId;
          const attempted = userAnswer !== undefined;

          return (
            <View key={index} style={styles.questionContainer} break>
              <Text style={styles.questionText}>Q{index + 1}: {question.questionText}</Text>
              {question.options.map(option => (
                <Text
                  key={option.id}
                  style={{
                    ...styles.optionText,
                    ...(option.id === question.correctOptionId && styles.correctAnswer),
                    ...(attempted && option.id === userAnswer && !isCorrect && styles.incorrectAnswer),
                    ...(attempted && option.id === userAnswer && isCorrect && styles.userAnswer),
                  }}
                >
                  {option.id}. {option.text}
                </Text>
              ))}
              {attempted && !isCorrect && (
                <Text style={styles.optionText}>Your Answer: <Text style={styles.incorrectAnswer}>{userAnswer}. {question.options.find(opt => opt.id === userAnswer)?.text}</Text></Text>
              )}
              <Text style={styles.optionText}>Correct Answer: <Text style={styles.correctAnswer}>{question.correctOptionId}. {question.options.find(opt => opt.id === question.correctOptionId)?.text}</Text></Text>
            </View>
          );
        })}

        <Text style={styles.footer}>&copy; 2025 Assistant Election Commissioner Mock Test. Powered By Mock Test Hub.</Text>
      </View>
    </Page>
  </Document>
);

const ResultScreen = () => {
  // Replace these with your actual context and navigation hooks
  // const { questionsData, userAnswers, timeTaken, setIsAuthenticated, setIsTestCompleted, resetTestState } = useContext(TestContext);
  // const navigate = useNavigate();
  
  // For now, using dummy data - replace with your actual data
  const questionsData = []; // Your questions data
  const userAnswers = {}; // Your user answers
  const timeTaken = 0; // Time taken in seconds
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const totalQuestions = questionsData.length;
  const passingPercentage = 60;
  let obtainedMarks = 0;
  let notAttempted = 0;

  questionsData.forEach((question, index) => {
    if (userAnswers[index] && userAnswers[index] === question.correctOptionId) {
      obtainedMarks++;
    }
    if (userAnswers[index] === undefined) {
      notAttempted++;
    }
  });

  const percentage = (obtainedMarks / totalQuestions) * 100;
  const passingStatus = percentage >= passingPercentage ? 'Passed' : 'Failed';

  const handleRestartTest = () => {
    // resetTestState();
    // setIsAuthenticated(false);
    // navigate('/');
    console.log('Restart test clicked');
  };

  const handleSaveAsPdf = async () => {
    setIsLoadingPdf(true);
    try {
      const blob = await pdf(
        <MyDocument
          questionsData={questionsData}
          userAnswers={userAnswers}
          totalQuestions={totalQuestions}
          obtainedMarks={obtainedMarks}
          notAttempted={notAttempted}
          percentage={percentage}
          passingStatus={passingStatus}
          timeTaken={timeTaken}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'test_result.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
      {/* Loading Indicator */}
      {isLoadingPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-xl flex items-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-800 dark:text-white">Generating PDF...</p>
          </div>
        </div>
      )}

      {/* Visible content of the Result Screen */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl text-center transform transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Test Result</h2>
          {/* <ThemeToggle /> */}
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
          <button
            onClick={() => console.log('Review answers clicked')} // Replace with navigate('/review')
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Review Answers
          </button>
          <button
            onClick={handleSaveAsPdf}
            className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            disabled={isLoadingPdf}
          >
            {isLoadingPdf ? 'Generating...' : 'Save as PDF'}
          </button>
        </div>

        <button
          onClick={handleRestartTest}
          className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          disabled={isLoadingPdf}
        >
          Take Another Test
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
