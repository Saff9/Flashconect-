// FlashConnect - AI Bot Integration
// src/lib/ai-bot.js

/**
 * AI Bot service for FlashConnect
 * Integrates with Hugging Face API for intelligent responses
 */

class AIBot {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api-inference.huggingface.co/models';
    this.model = 'microsoft/DialoGPT-medium'; // You can change this model
  }

  /**
   * Generate response using Hugging Face API
   */
  async generateResponse(message, conversationHistory = []) {
    try {
      if (!this.apiKey) {
        throw new Error('Hugging Face API key not configured');
      }

      const response = await fetch(
        `${this.baseURL}/${this.model}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: {
              text: message,
              past_user_inputs: conversationHistory.slice(-5), // Last 5 messages
              generated_responses: []
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return this.cleanResponse(data.generated_text || "I'm here to help! How can I assist you today?");
      
    } catch (error) {
      console.error('AI Bot Error:', error);
      
      // Fallback responses
      return this.getFallbackResponse(message);
    }
  }

  /**
   * Clean and format the AI response
   */
  cleanResponse(response) {
    if (!response) return "I'm here to help! How can I assist you today?";
    
    // Remove any unwanted prefixes or formatting
    let cleaned = response
      .replace(/<\|.*?\|>/g, '') // Remove special tokens
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    // Ensure the response ends with proper punctuation
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += '.';
    }
    
    return cleaned;
  }

  /**
   * Get fallback response when AI fails
   */
  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    const fallbacks = [
      "I understand you're saying: \"" + message + "\". How can I help you with that?",
      "That's interesting! Tell me more about what you need.",
      "I'm here to assist you. Could you rephrase your question?",
      "Thanks for your message! How can I help you today?",
      "I appreciate your message. What would you like to know?"
    ];
    
    // Context-aware fallbacks
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm FlashConnect AI. How can I help you today?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you with various tasks like answering questions, providing information, or just having a friendly chat!";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Random fallback
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  /**
   * Check if message should be handled by AI
   */
  shouldHandleMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // AI triggers - messages that should be handled by AI
    const aiTriggers = [
      '/ai',
      '/bot',
      '/help',
      'flashconnect ai',
      'hey flash',
      'hello bot'
    ];
    
    return aiTriggers.some(trigger => lowerMessage.includes(trigger));
  }

  /**
   * Process message and determine if AI should respond
   */
  async processMessage(message, userId, conversationHistory = []) {
    if (!this.shouldHandleMessage(message)) {
      return null; // AI shouldn't handle this message
    }
    
    const response = await this.generateResponse(message, conversationHistory);
    
    return {
      text: response,
      sender: 'ai-bot',
      timestamp: new Date(),
      type: 'ai_response'
    };
  }

  /**
   * Get AI bot introduction
   */
  getIntroduction() {
    return {
      text: "👋 Hello! I'm FlashConnect AI, your intelligent assistant. I can help you with questions, information, or just chat! Try mentioning me with '/ai' or 'hey flash'.",
      sender: 'ai-bot',
      timestamp: new Date(),
      type: 'system'
    };
  }
}

// Create singleton instance
let aiBotInstance = null;

export const getAIBot = (apiKey = null) => {
  if (!aiBotInstance && apiKey) {
    aiBotInstance = new AIBot(apiKey);
  }
  return aiBotInstance;
};

export default AIBot;
