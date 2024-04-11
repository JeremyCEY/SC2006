import React, { useState, useEffect } from 'react';
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar";

function FAQ() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  }, []);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    if (activeQuestionIndex === index) {
      setActiveQuestionIndex(null);
    } else {
      setActiveQuestionIndex(index);
    }
  };

  return (
    <>
      {isAuthenticated ? <LoggedInNavbar /> : <LoggedOutNavbar />}
      <div className="text-4xl font-bold border-b border-gray-300 p-5">
        Frequently Asked Questions
      </div>

      {/* FAQ Items */}
      <div className="p-5">
        {[{
          question: "Do I need an account?",
          answer: "No, an account is not required to access the basic features."
        }, {
          question: "What does this do?",
          answer: "This platform provides various services based on user needs."
        }, {
          question: "How are the prices calculated?",
          answer: "Prices are calculated using a comprehensive database and algorithms."
        }].map((faq, index) => (
          <div key={index} className="mb-2">
            <div
              className="text-lg font-semibold cursor-pointer p-3 bg-gray-100 rounded-md"
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
              <span className={`float-right transform transition-transform ${activeQuestionIndex === index ? 'rotate-45' : ''}`}>+</span>
            </div>
            <div
              className={`p-3 text-gray-700 ${activeQuestionIndex === index ? 'block' : 'hidden'}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQ;
