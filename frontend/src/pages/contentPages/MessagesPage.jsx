import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { MessageSquare, Clock, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Chat from '../../components/Chat';

function MessagesPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/messages/conversations', {
          withCredentials: true
        });
        setConversations(response.data);
        
        // Extract unread counts
        const counts = {};
        response.data.forEach(conv => {
          counts[`${conv.listing._id}-${conv.otherUser._id}`] = conv.unreadCount;
        });
        setUnreadCounts(counts);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setLoading(false);
      }
    };

    fetchConversations();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const handleChatOpen = (conversation) => {
    setActiveChat(conversation);
    // Update unread count
    setUnreadCounts(prev => ({
      ...prev,
      [`${conversation.listing._id}-${conversation.otherUser._id}`]: 0
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          </div>
          <Link
            to="/listings"
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700"
          >
            <Home className="w-5 h-5" />
            <span>Browse Listings</span>
          </Link>
        </div>

        {conversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No messages yet</h3>
            <p className="text-gray-600 mb-4">Start conversations about listings you're interested in</p>
            <Link
              to="/listings"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Browse Listings
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-4">
              {conversations.map((conv) => (
                <motion.div
                  key={`${conv.listing._id}-${conv.otherUser._id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                    activeChat && activeChat.listing._id === conv.listing._id &&
                    activeChat.otherUser._id === conv.otherUser._id
                      ? 'border-2 border-teal-500'
                      : ''
                  }`}
                  onClick={() => handleChatOpen(conv)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {conv.listing.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatDate(conv.lastMessage.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Chat with {conv.otherUser.username}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {conv.lastMessage.content}
                      </p>
                      {unreadCounts[`${conv.listing._id}-${conv.otherUser._id}`] > 0 && (
                        <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                          {unreadCounts[`${conv.listing._id}-${conv.otherUser._id}`]}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Chat */}
            <div className="lg:col-span-2">
              {activeChat ? (
                <div className="bg-white rounded-xl shadow-md h-[600px] relative">
                  <Chat
                    listingId={activeChat.listing._id}
                    receiverId={activeChat.otherUser._id}
                    receiverName={activeChat.otherUser.username}
                    onClose={() => setActiveChat(null)}
                    position="full"
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md h-[600px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;