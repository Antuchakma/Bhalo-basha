import React, { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ListingChatBot({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I can help you find the perfect place. What kind of property are you looking for?",
      options: ["Apartment", "House", "Room", "Hostel"],
    },
  ]);
  const [userPreferences, setUserPreferences] = useState({
    propertyType: "",
    location: "",
    minRent: "",
    maxRent: "",
    bedrooms: "",
  });

  const locationOptions = [
    'KUET Campus',
    'Fulbarigate',
    'Boyra',
    'Khulna City',
    'Daulatpur',
    'Sonadanga',
    'Khalishpur',
    'New Market',
    'Gollamari',
  ];

  const handleUserResponse = (response, currentQuestion) => {
    const newMessages = [...messages];
    newMessages.push({ type: "user", text: response });

    let nextQuestion = null;
    let options = null;

    // Update preferences based on current question
    const updatedPreferences = { ...userPreferences };

    if (!userPreferences.propertyType) {
      updatedPreferences.propertyType = response;
      nextQuestion = "Which area are you interested in?";
      options = locationOptions;
    } else if (!userPreferences.location) {
      updatedPreferences.location = response;
      nextQuestion = "What's your maximum budget per month (in ৳)?";
      options = ["5000", "10000", "15000", "20000", "25000", "30000+"];
    } else if (!userPreferences.maxRent) {
      updatedPreferences.maxRent = response === "30000+" ? "100000" : response;
      nextQuestion = "How many bedrooms do you need?";
      options = ["1", "2", "3", "4+"];
    } else if (!userPreferences.bedrooms) {
      updatedPreferences.bedrooms = response;
      nextQuestion = "Great! I'll help you find matching properties.";
      
      // Apply filters
      onFilterChange({
        propertyType: updatedPreferences.propertyType,
        location: updatedPreferences.location,
        maxRent: updatedPreferences.maxRent,
        bedrooms: updatedPreferences.bedrooms,
      });
    }

    setUserPreferences(updatedPreferences);

    if (nextQuestion) {
      newMessages.push({
        type: "bot",
        text: nextQuestion,
        options: options,
      });
    }

    setMessages(newMessages);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-teal-600 text-white rounded-t-xl">
              <h3 className="font-semibold">Listing Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-teal-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.options && (
                      <div className="mt-2 space-y-2">
                        {message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleUserResponse(option, message.text)}
                            className="block w-full text-left px-3 py-2 rounded bg-white hover:bg-gray-50 text-gray-800 text-sm transition"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ListingChatBot;