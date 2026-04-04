import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../lib/axios';
import { MessageSquare, Clock, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Chat from '../../components/Chat';

const ConversationSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 animate-pulse">
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-12" />
        </div>
        <div className="h-3 bg-slate-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-4/5" />
      </div>
    ))}
  </div>
);

function MessagesPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (!user) { navigate('/login'); return; }

    const fetchConversations = async () => {
      try {
        const response = await api.get('/api/messages/conversations');
        setConversations(response.data);
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
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const formatDate = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'long' });
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleChatOpen = (conversation) => {
    setActiveChat(conversation);
    setUnreadCounts(prev => ({
      ...prev,
      [`${conversation.listing._id}-${conversation.otherUser._id}`]: 0
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
              <p className="text-sm text-slate-500">{conversations.length} conversation{conversations.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <Link to="/listings" className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition">
            <Home className="w-4 h-4" /> Browse Listings
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1"><ConversationSkeleton /></div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100 h-[600px] animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && conversations.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No messages yet</h3>
            <p className="text-sm text-slate-500 mb-6">Start a conversation by messaging a property owner</p>
            <Link to="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition">
              Browse Listings
            </Link>
          </motion.div>
        )}

        {/* Conversations */}
        {!loading && conversations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 space-y-2">
              {conversations.map((conv) => {
                const key = `${conv.listing._id}-${conv.otherUser._id}`;
                const isActive = activeChat?.listing._id === conv.listing._id && activeChat?.otherUser._id === conv.otherUser._id;
                const unread = unreadCounts[key] || 0;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleChatOpen(conv)}
                    className={`rounded-xl border cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-50 border-teal-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1.5">
                        <h3 className={`font-semibold text-sm line-clamp-1 ${isActive ? 'text-teal-900' : 'text-slate-800'}`}>
                          {conv.listing.title}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-[11px] text-slate-400">{formatDate(conv.lastMessage.createdAt)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">with {conv.otherUser.username}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-500 line-clamp-1 flex-1">{conv.lastMessage.content}</p>
                        {unread > 0 && (
                          <span className="bg-teal-600 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 ml-2">
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Chat */}
            <div className="lg:col-span-2">
              {activeChat ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[600px] relative overflow-hidden">
                  <Chat
                    listingId={activeChat.listing._id}
                    receiverId={activeChat.otherUser._id}
                    receiverName={activeChat.otherUser.username}
                    onClose={() => setActiveChat(null)}
                    position="full"
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-7 h-7 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm">Select a conversation to start chatting</p>
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
