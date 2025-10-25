import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Send, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Chat({ listingId, receiverId, receiverName, onClose, position = 'fixed' }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/messages/${receiverId}/${listingId}`,
          { withCredentials: true }
        );
        setMessages(response.data);
        setLoading(false);
        scrollToBottom();
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [listingId, receiverId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playMessageSound = () => {
    const audio = new Audio('/message-sound.mp3'); // Make sure to add this sound file
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:5002/api/messages',
        {
          content: newMessage.trim(),
          receiverId,
          listingId,
        },
        { withCredentials: true }
      );

      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
      scrollToBottom();
      playMessageSound();
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach((message) => {
      const date = formatMessageDate(message.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading messages...</div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        position === 'fixed' 
          ? 'fixed bottom-4 right-4 w-96 h-[500px]' 
          : 'h-full'
      } bg-white rounded-lg shadow-xl flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-teal-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Chat with {receiverName}</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-teal-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
      >
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {date}
                </span>
              </div>
              <div className="space-y-4">
                {msgs.map((message) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${
                      message.sender._id === user.id ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className={`text-xs mb-1 ${
                      message.sender._id === user.id ? 'text-gray-600' : 'text-gray-600'
                    }`}>
                      {message.sender._id === user.id ? 'You' : message.sender.username}
                    </span>
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        message.sender._id === user.id
                          ? 'bg-teal-600 text-white ml-auto'
                          : 'bg-gray-100 text-gray-900 mr-auto'
                      }`}
                    >
                      <p className="text-sm break-words">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender._id === user.id
                            ? 'text-teal-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="px-4 py-2 text-xs text-gray-500 animate-pulse">
          {receiverName} is typing...
        </div>
      )}

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Chat;