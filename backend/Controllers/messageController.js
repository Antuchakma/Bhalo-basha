import Message from "../models/message.model.js";
import Product from "../models/product.model.js";

// Export all functions at the top for clarity
export { getConversations, sendMessage, getMessages, getUnreadCount };

async function getConversations(req, res) {
  try {
    const userId = req.user.id;

    // Get all messages where user is either sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('receiver', 'username')
    .populate('listing', 'title');

    // Group messages by listing and other user
    const conversationsMap = new Map();

    messages.forEach(message => {
      const otherUser = message.sender._id.toString() === userId ? message.receiver : message.sender;
      const listingId = message.listing._id.toString();
      const key = `${listingId}-${otherUser._id}`;

      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          _id: key,
          listing: message.listing,
          otherUser,
          lastMessage: message,
          unreadCount: message.receiver._id.toString() === userId && !message.read ? 1 : 0
        });
      } else if (message.receiver._id.toString() === userId && !message.read) {
        conversationsMap.get(key).unreadCount += 1;
      }
    });

    const conversations = Array.from(conversationsMap.values());
    res.json(conversations);
  } catch (error) {
    console.error("Error getting conversations:", error);
    res.status(500).json({ error: "Failed to get conversations" });
  }
};

async function sendMessage(req, res) {
  try {
    const { content, receiverId, listingId } = req.body;
    const senderId = req.user.id;

    if (senderId === receiverId) {
      return res.status(400).json({ error: "You cannot message yourself" });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      listing: listingId,
      content,
    });

    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "username")
      .populate("receiver", "username");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

async function getMessages(req, res) {
  try {
    const { userId, listingId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      listing: listingId,
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      {
        listing: listingId,
        receiver: currentUserId,
        read: false,
      },
      { read: true }
    );

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

async function getUnreadCount(req, res) {
  try {
    const userId = req.user.id;

    const count = await Message.countDocuments({
      receiver: userId,
      read: false,
    });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};