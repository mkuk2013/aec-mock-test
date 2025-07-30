import React, { createContext, useContext, useState, useCallback } from "react";

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const questions = [
    {
      "question": "Synonym of “benevolent”:",
      "options": [
        "Cruel",
        "Kind",
        "Harsh",
        "Proud"
      ],
      "answer": 1,
      "subject": "English"
    },
    {
      "question": "Antonym of “Transparent”:",
      "options": [
        "Opaque",
        "Clear",
        "Honest",
        "Glassy"
      ],
      "answer": 0,
      "subject": "English"
    },
    {
      "question": "Correct spelling:",
      "options": [
        "Comitte",
        "Committee",
        "Comittee",
        "Commitee"
      ],
      "answer": 1,
      "subject": "English"
    },
    {
      "question": "He is good ___ mathematics.",
      "options": [
        "in",
        "on",
        "with",
        "at"
      ],
      "answer": 3,
      "subject": "English"
    },
    {
      "question": "Correct sentence:",
      "options": [
        "He don’t likes tea.",
        "He doesn’t likes tea.",
        "He doesn’t like tea.",
        "He don’t like tea."
      ],
      "answer": 2,
      "subject": "English"
    },
    {
      "question": "Passive voice: “They built a house.”",
      "options": [
        "A house was built by them.",
        "A house is built by them.",
        "A house were built by them.",
        "A house are built by them."
      ],
      "answer": 0,
      "subject": "English"
    },
    {
      "question": "He has ___ his work.",
      "options": [
        "do",
        "did",
        "done",
        "doing"
      ],
      "answer": 2,
      "subject": "English"
    },
    {
      "question": "Which word is a noun?",
      "options": [
        "Quickly",
        "Happiness",
        "Bright",
        "Eat"
      ],
      "answer": 1,
      "subject": "English"
    },
    {
      "question": "She is ___ honest woman.",
      "options": [
        "a",
        "an",
        "the",
        "no article"
      ],
      "answer": 1,
      "subject": "English"
    },
    {
      "question": "By next week, I ___ this book.",
      "options": [
        "will finish",
        "had finished",
        "will have finished",
        "finish"
      ],
      "answer": 2,
      "subject": "English"
    },
    {
      "question": "First revelation was received in:",
      "options": [
        "Makkah",
        "Madina",
        "Taif",
        "Cave Hira"
      ],
      "answer": 0,
      "subject": "Islamiat"
    },
    {
      "question": "First Surah of the Quran:",
      "options": [
        "Al-Baqarah",
        "Al-Fatiha",
        "Al-Nas",
        "Al-Ikhlas"
      ],
      "answer": 1,
      "subject": "Islamiat"
    },
    {
      "question": "Who compiled the Quran in one book form?",
      "options": [
        "Hazrat Umar",
        "Hazrat Usman",
        "Hazrat Abu Bakr",
        "Hazrat Ali"
      ],
      "answer": 2,
      "subject": "Islamiat"
    },
    {
      "question": "Number of Makki Surahs:",
      "options": [
        "114",
        "86",
        "28",
        "92"
      ],
      "answer": 1,
      "subject": "Islamiat"
    },
    {
      "question": "Namaz was made obligatory during:",
      "options": [
        "Miraj",
        "Hijrah",
        "Battle of Badr",
        "Treaty of Hudaibiya"
      ],
      "answer": 0,
      "subject": "Islamiat"
    },
    {
      "question": "First Islamic month:",
      "options": [
        "Safar",
        "Rajab",
        "Muharram",
        "Rabi-ul-Awwal"
      ],
      "answer": 2,
      "subject": "Islamiat"
    },
    {
      "question": "Zakat is:",
      "options": [
        "Tax",
        "Charity",
        "Compulsory charity",
        "Voluntary"
      ],
      "answer": 2,
      "subject": "Islamiat"
    },
    {
      "question": "Total number of Farz in Wudu:",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "answer": 2,
      "subject": "Islamiat"
    },
    {
      "question": "Kalma Tayyaba is also known as:",
      "options": [
        "First Kalma",
        "Second Kalma",
        "Third Kalma",
        "Shahadat Kalma"
      ],
      "answer": 0,
      "subject": "Islamiat"
    },
    {
      "question": "Qibla was changed to:",
      "options": [
        "Masjid-e-Nabvi",
        "Masjid-e-Quba",
        "Kaaba",
        "Jerusalem"
      ],
      "answer": 2,
      "subject": "Islamiat"
    },
    {
      "question": "Current Secretary-General of the UN (2025):",
      "options": [
        "Ban Ki-moon",
        "António Guterres",
        "Kofi Annan",
        "Jens Stoltenberg"
      ],
      "answer": 1,
      "subject": "Current Affairs"
    },
    {
      "question": "Host of 2024 Olympics:",
      "options": [
        "Japan",
        "USA",
        "France",
        "Brazil"
      ],
      "answer": 2,
      "subject": "Current Affairs"
    },
    {
      "question": "Current Prime Minister of UK (2025):",
      "options": [
        "Rishi Sunak",
        "Boris Johnson",
        "Liz Truss",
        "Keir Starmer"
      ],
      "answer": 0,
      "subject": "Current Affairs"
    },
    {
      "question": "COP28 was held in:",
      "options": [
        "Egypt",
        "UAE",
        "UK",
        "Germany"
      ],
      "answer": 1,
      "subject": "Current Affairs"
    },
    {
      "question": "Country with highest inflation in 2025:",
      "options": [
        "Venezuela",
        "India",
        "Pakistan",
        "Argentina"
      ],
      "answer": 0,
      "subject": "Current Affairs"
    },
    {
      "question": "OIC stands for:",
      "options": [
        "Organization of Indian Culture",
        "Organization of Islamic Cooperation",
        "Organization of International Cooperation",
        "Oil Industry Council"
      ],
      "answer": 1,
      "subject": "Current Affairs"
    },
    {
      "question": "Recently elected US President (2024):",
      "options": [
        "Joe Biden",
        "Donald Trump",
        "Hillary Clinton",
        "Ron DeSantis"
      ],
      "answer": 0,
      "subject": "Current Affairs"
    },
    {
      "question": "BRICS now includes:",
      "options": [
        "5 countries",
        "6 countries",
        "7 countries",
        "8 countries"
      ],
      "answer": 2,
      "subject": "Current Affairs"
    },
    {
      "question": "World Economic Forum 2025 was held in:",
      "options": [
        "Geneva",
        "New York",
        "Davos",
        "Berlin"
      ],
      "answer": 2,
      "subject": "Current Affairs"
    },
    {
      "question": "Nobel Peace Prize 2024 went to:",
      "options": [
        "Greta Thunberg",
        "WHO",
        "Human Rights Activist",
        "UNHCR"
      ],
      "answer": 2,
      "subject": "Current Affairs"
    },
    {
      "question": "Founder of Pakistan:",
      "options": [
        "Allama Iqbal",
        "Quaid-e-Azam",
        "Liaquat Ali Khan",
        "Sir Syed Ahmad Khan"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Lahore Resolution was passed in:",
      "options": [
        "1930",
        "1940",
        "1947",
        "1948"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "First Prime Minister of Pakistan:",
      "options": [
        "Muhammad Ali Jinnah",
        "Liaquat Ali Khan",
        "Ayub Khan",
        "Iskander Mirza"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "First Constitution of Pakistan:",
      "options": [
        "1947",
        "1956",
        "1962",
        "1973"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Pakistan became a republic in:",
      "options": [
        "1947",
        "1956",
        "1962",
        "1971"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Indus Waters Treaty was signed in:",
      "options": [
        "1948",
        "1956",
        "1960",
        "1965"
      ],
      "answer": 2,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Largest dam in Pakistan:",
      "options": [
        "Tarbela",
        "Mangla",
        "Warsak",
        "Diamer-Bhasha"
      ],
      "answer": 0,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "National language of Pakistan:",
      "options": [
        "Punjabi",
        "Urdu",
        "English",
        "Sindhi"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Pakistan’s nuclear tests were conducted in:",
      "options": [
        "1997",
        "1998",
        "1999",
        "2001"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Pakistan’s first female PM:",
      "options": [
        "Fatima Jinnah",
        "Benazir Bhutto",
        "Hina Rabbani",
        "Maryam Nawaz"
      ],
      "answer": 1,
      "subject": "Pakistan Affairs"
    },
    {
      "question": "Tallest mountain in the world:",
      "options": [
        "K2",
        "Mount Everest",
        "Nanga Parbat",
        "Kilimanjaro"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "Fastest animal on land:",
      "options": [
        "Lion",
        "Tiger",
        "Cheetah",
        "Horse"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Light travels at:",
      "options": [
        "300,000 km/s",
        "150,000 km/s",
        "100,000 km/s",
        "1,000 km/s"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "Currency of Japan:",
      "options": [
        "Won",
        "Dollar",
        "Yen",
        "Yuan"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Human blood has:",
      "options": [
        "2 groups",
        "3 groups",
        "4 groups",
        "5 groups"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Largest organ in the body:",
      "options": [
        "Heart",
        "Liver",
        "Skin",
        "Kidney"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Brain is protected by:",
      "options": [
        "Ribs",
        "Skull",
        "Spine",
        "Membrane"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "H2O is:",
      "options": [
        "Oxygen",
        "Hydrogen",
        "Water",
        "Carbon"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Pakistan joined UNO in:",
      "options": [
        "1945",
        "1947",
        "1950",
        "1951"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "Olympic Games are held every:",
      "options": [
        "2 years",
        "3 years",
        "4 years",
        "5 years"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "4, 8, 16, 32, ?",
      "options": [
        "64",
        "48",
        "40",
        "60"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "Which is the odd one out?",
      "options": [
        "Apple",
        "Banana",
        "Carrot",
        "Mango"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "If 2 + 3 = 13, 3 + 4 = 25, then 4 + 5 = ?",
      "options": [
        "35",
        "29",
        "32",
        "36"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "Complete: A, C, E, G, ?",
      "options": [
        "H",
        "J",
        "I",
        "K"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "Which number is missing: 7, 14, 28, __, 112?",
      "options": [
        "42",
        "56",
        "84",
        "70"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "Mirror image of \"SON\":",
      "options": [
        "NOS",
        "ᴎOƧ",
        "ᄅON",
        "S∩O"
      ],
      "answer": 1,
      "subject": "General Knowledge"
    },
    {
      "question": "If MONDAY = 123456, then what is DAY?",
      "options": [
        "456",
        "654",
        "321",
        "234"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "8, 6, 9, 23, ?, 109",
      "options": [
        "45",
        "46",
        "55",
        "60"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "Which one does not belong?",
      "options": [
        "Circle",
        "Square",
        "Triangle",
        "Straight"
      ],
      "answer": 3,
      "subject": "General Knowledge"
    },
    {
      "question": "3:9 :: 4: ?",
      "options": [
        "16",
        "12",
        "20",
        "24"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "Book is to Reading as Fork is to:",
      "options": [
        "Drawing",
        "Writing",
        "Stirring",
        "Eating"
      ],
      "answer": 3,
      "subject": "General Knowledge"
    },
    {
      "question": "12 ÷ 3(4) = ?",
      "options": [
        "16",
        "1",
        "12",
        "3"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Clock: Time :: Thermometer: ?",
      "options": [
        "Heat",
        "Mercury",
        "Temperature",
        "Pressure"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Find next: 2, 6, 12, 20, ?",
      "options": [
        "30",
        "28",
        "24",
        "36"
      ],
      "answer": 0,
      "subject": "General Knowledge"
    },
    {
      "question": "81 is to 9 as 64 is to ?",
      "options": [
        "6",
        "7",
        "8",
        "9"
      ],
      "answer": 2,
      "subject": "General Knowledge"
    },
    {
      "question": "Constitution of 1973 was passed on:",
      "options": [
        "March 23",
        "April 10",
        "August 14",
        "June 1"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Number of Articles in Constitution:",
      "options": [
        "240",
        "280",
        "289",
        "300"
      ],
      "answer": 2,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Objective Resolution passed in:",
      "options": [
        "1949",
        "1956",
        "1962",
        "1973"
      ],
      "answer": 0,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Constitution 1973 was enforced on:",
      "options": [
        "August 14, 1973",
        "March 23, 1973",
        "July 1, 1973",
        "June 10, 1973"
      ],
      "answer": 0,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "18th Amendment passed in:",
      "options": [
        "2008",
        "2010",
        "2012",
        "2015"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Pakistan is declared as:",
      "options": [
        "Democratic",
        "Islamic Republic",
        "Federal",
        "Presidential"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Fundamental rights are in:",
      "options": [
        "Chapter I",
        "Chapter II",
        "Chapter III",
        "Chapter IV"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Who can dissolve the National Assembly?",
      "options": [
        "President",
        "Prime Minister",
        "Senate",
        "Chief Justice"
      ],
      "answer": 0,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Supreme Court is under which Article?",
      "options": [
        "175",
        "185",
        "190",
        "200"
      ],
      "answer": 0,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Highest law in Pakistan:",
      "options": [
        "Quran",
        "Constitution",
        "Civil Code",
        "Penal Code"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Who is Head of State?",
      "options": [
        "PM",
        "CJP",
        "President",
        "Speaker"
      ],
      "answer": 2,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Pakistan is a ___ federation.",
      "options": [
        "Presidential",
        "Federal",
        "Unitary",
        "Confederal"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Amendment for women's reserved seats:",
      "options": [
        "16th",
        "17th",
        "18th",
        "19th"
      ],
      "answer": 2,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Article 25 relates to:",
      "options": [
        "Freedom of Speech",
        "Right to Education",
        "Equality of Citizens",
        "Religion"
      ],
      "answer": 2,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "Tenure of National Assembly:",
      "options": [
        "4 years",
        "5 years",
        "6 years",
        "3 years"
      ],
      "answer": 1,
      "subject": "Constitution of Pakistan"
    },
    {
      "question": "The Elections Act was enacted in:",
      "options": [
        "2016",
        "2017",
        "2018",
        "2015"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "The main body responsible for elections:",
      "options": [
        "SC",
        "ECP",
        "NAB",
        "NADRA"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Which Section deals with delimitation?",
      "options": [
        "17",
        "21",
        "32",
        "50"
      ],
      "answer": 0,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "ECP stands for:",
      "options": [
        "Election Coordination Panel",
        "Election Commission of Pakistan",
        "Electoral Council of Pakistan",
        "None"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "The term of Election Commissioner is:",
      "options": [
        "4 years",
        "5 years",
        "3 years",
        "6 years"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Elections must be held within how many days after assembly dissolution?",
      "options": [
        "30",
        "45",
        "60",
        "90"
      ],
      "answer": 3,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Minimum age to contest National Assembly election:",
      "options": [
        "18",
        "21",
        "25",
        "30"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Which body finalizes the voter list?",
      "options": [
        "NADRA",
        "ECP",
        "Census",
        "Cabinet"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Who appoints the CEC?",
      "options": [
        "Prime Minister",
        "President",
        "Senate",
        "Parliament"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Which house confirms CEC?",
      "options": [
        "Senate",
        "National Assembly",
        "Parliament",
        "None"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Election dispute appeals go to:",
      "options": [
        "President",
        "High Court",
        "ECP",
        "Senate"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Polling day must be:",
      "options": [
        "Friday",
        "Weekend",
        "Public Holiday",
        "Any Day"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Use of fake vote results in:",
      "options": [
        "Fine",
        "Disqualification",
        "Warning",
        "Re-polling"
      ],
      "answer": 1,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Every citizen of age ___ is eligible to vote.",
      "options": [
        "16",
        "17",
        "18",
        "21"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Voter can be disqualified for:",
      "options": [
        "Criminal record",
        "Minor illness",
        "No ID card",
        "Financial debt"
      ],
      "answer": 0,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Election symbols are allotted by:",
      "options": [
        "Supreme Court",
        "Political Party",
        "ECP",
        "Local Govt"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Vote casting is:",
      "options": [
        "Verbal",
        "Fingerprint",
        "Secret",
        "Public"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Which form is used for nomination?",
      "options": [
        "Form 32",
        "Form 45",
        "Form 60",
        "Form 33"
      ],
      "answer": 3,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Who is a 'Returning Officer'?",
      "options": [
        "PM",
        "ECP employee",
        "Officer conducting election",
        "NADRA official"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    },
    {
      "question": "Electoral Rolls are prepared under:",
      "options": [
        "ECP Act",
        "Constitution",
        "Elections Act",
        "Civil Code"
      ],
      "answer": 2,
      "subject": "The Elections Act, 2017"
    }
  ];

  // State management for the test application
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(undefined)); // Initialize with undefined for each question
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);

  // Reset function for test state
  const resetTestState = useCallback(() => {
    setIsTestCompleted(false);
    setUserAnswers(Array(questions.length).fill(undefined)); // Reset answers
    setFlaggedQuestions([]);
    setTimeTaken(0);
    // Do NOT reset isAuthenticated here, as it's handled by login screen
  }, [questions.length]); // Depend on questions.length to re-initialize userAnswers correctly

  return (
    <TestContext.Provider value={{ 
      questions, 
      isAuthenticated, 
      setIsAuthenticated,
      isTestCompleted,
      setIsTestCompleted,
      userAnswers,
      setUserAnswers,
      flaggedQuestions,
      setFlaggedQuestions,
      timeTaken,
      setTimeTaken,
      resetTestState
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);
