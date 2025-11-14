flash-connect/
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Loader.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── PhoneAuth.jsx
│   │   │   └── AuthProvider.jsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── ChatList.jsx
│   │   │   └── ChatHeader.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── common/
│   │       ├── Profile.jsx
│   │       ├── FileUpload.jsx
│   │       └── TypingIndicator.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ChatContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useChat.js
│   │   └── useFirebase.js
│   ├── utils/
│   │   ├── firebase.js
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── pages/
│   │   ├── index.js
│   │   ├── chat/
│   │   │   ├── [id].js
│   │   │   └── index.js
│   │   ├── auth/
│   │   │   └── login.js
│   │   └── profile/
│   │       └── index.js
│   └── lib/
│       └── ai-bot.js
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── .env.local
├── .gitignore
└── package.json
