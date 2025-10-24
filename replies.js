// Store all your replies organized by intent name
const replies = {
  greet_user: [
    "Hey there!",
    "Hello! How are you doing?",
    "Hi! Nice to meet you.",
    "Welcome back!",
  ],
  bye: [
    "Goodbye!",
    "See you soon!",
    "Take care and have a great day!",
  ],
  about: [
    "I'm your personal AI chatbot.",
    "I'm built using Wit.ai and Node.js!",
    "My job is to make your conversations smarter.",
  ],
  motivation: [
    "Keep going, you're doing great!",
    "Believe in yourself, you got this!",
    "Don't give up, amazing things take time.",
  ],
  unknown: [
    "Hmm... I didn't quite get that.",
    "Can you please rephrase?",
    "I'm still learning, try saying that another way!",
  ]
};

// Helper to get a random reply for an intent
function getReply(intent) {
  const options = replies[intent] || replies["unknown"];
  return options[Math.floor(Math.random() * options.length)];
}

module.exports = { getReply };




