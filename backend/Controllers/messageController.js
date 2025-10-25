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

    const validMessages = messages.filter(message => 
      message.listing && message.sender && message.receiver &&
      message.sender.username && message.receiver.username && message.listing.title
    );

    validMessages.forEach(message => {
      const senderIsCurrentUser = message.sender._id.toString() === userId;
      const otherUser = senderIsCurrentUser ? message.receiver : message.sender;
      const listingId = message.listing._id.toString();
      const key = `${listingId}-${otherUser._id}`;

      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          _id: key,
          listing: {
            _id: message.listing._id,
            title: message.listing.title
          },
          otherUser: {
            _id: otherUser._id,
            username: otherUser.username
          },
          lastMessage: {
            _id: message._id,
            content: message.content,
            createdAt: message.createdAt
          },
          unreadCount: message.receiver._id.toString() === userId && !message.read ? 1 : 0
        });
      } else {
        // Update last message if this one is more recent
        const existing = conversationsMap.get(key);
        if (new Date(message.createdAt) > new Date(existing.lastMessage.createdAt)) {
          existing.lastMessage = {
            _id: message._id,
            content: message.content,
            createdAt: message.createdAt
          };
        }

        // Update unread count only if message is unread and user is receiver
        if (message.receiver._id.toString() === userId && !message.read) {
          existing.unreadCount += 1;
        }
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

    // First, verify that the listing exists
    const listing = await Product.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Get messages between the two users for this listing
    const messages = await Message.find({
      listing: listingId,
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .populate("listing", "title")
      .sort({ createdAt: 1 });

    // Filter out any messages with missing references
    const validMessages = messages.filter(
      message => message.sender && message.receiver && message.listing
    );

    // Mark messages as read
    await Message.updateMany(
      {
        listing: listingId,
        receiver: currentUserId,
        read: false,
      },
      { read: true }
    );

    res.status(200).json(validMessages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

async function getUnreadCount(req, res) {
  try {
    const userId = req.user.id;

    // Get distinct conversations with unread messages
    const unreadConversations = await Message.aggregate([
      {
        $match: {
          receiver: userId,
          read: false
        }
      },
      {
        $group: {
          _id: {
            listing: "$listing",
            sender: "$sender"
          },
          unreadCount: { $sum: 1 }
        }
      }
    ]);

    // Get total count of unread messages
    const totalUnread = unreadConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

    res.status(200).json({ count: totalUnread });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};