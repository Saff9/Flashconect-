// FlashConnect - Chat Context
// src/contexts/ChatContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/utils/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's chats
  useEffect(() => {
    if (!user) return;

    const chatsQuery = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch messages for active chat
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    const messagesQuery = query(
      collection(db, 'chats', activeChat, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [activeChat]);

  const sendMessage = async (text, chatId = activeChat) => {
    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: text.trim(),
        senderId: user.uid,
        senderName: user.displayName || user.email,
        timestamp: serverTimestamp(),
        type: 'text',
        status: 'sent'
      });

      // Update chat's last message
      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: text.trim(),
        lastMessageAt: serverTimestamp()
      });

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (messageId, forEveryone = false) => {
    if (!user) return;

    try {
      if (forEveryone) {
        await updateDoc(doc(db, 'chats', activeChat, 'messages', messageId), {
          deleted: true,
          text: 'This message was deleted',
          deletedAt: serverTimestamp(),
          deletedBy: user.uid
        });
      } else {
        await deleteDoc(doc(db, 'chats', activeChat, 'messages', messageId));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const addReaction = async (messageId, emoji) => {
    if (!user) return;

    try {
      const messageRef = doc(db, 'chats', activeChat, 'messages', messageId);
      await updateDoc(messageRef, {
        [`reactions.${emoji}`]: arrayUnion(user.uid)
      });
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const createChat = async (participants, type = 'direct', name = null) => {
    if (!user) return;

    try {
      const chatData = {
        participants: [...participants, user.uid],
        type,
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        createdBy: user.uid
      };

      if (name) chatData.name = name;
      if (type === 'channel') chatData.isPublic = true;

      const docRef = await addDoc(collection(db, 'chats'), chatData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const value = {
    chats,
    activeChat,
    setActiveChat,
    messages,
    loading,
    sendMessage,
    deleteMessage,
    addReaction,
    createChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
