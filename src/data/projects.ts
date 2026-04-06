export interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  tech: string[];
  demo: string | null;
  github: string;
  image: string;
}

export const featuredProjects: Project[] = [
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging application built with MERN stack and Socket.io. Users can send instant messages, see online status, and experience live communication using WebSockets.",
    problem:
      "Traditional web-based messaging relies on constant polling, causing delays, wasted bandwidth, and a poor user experience for real-time communication.",
    solution:
      "Built a full-stack chat app using the MERN stack with Socket.io for persistent WebSocket connections, enabling instant bi-directional messaging without page reloads.",
    features: [
      "Instant real-time messaging with Socket.io WebSockets",
      "Online/offline user status indicators",
      "Responsive UI built with React and Vite",
      "RESTful API for user authentication and message history",
      "MongoDB for persistent message and user storage",
    ],
    challenges: [
      "Managing WebSocket connection lifecycle and reconnection logic",
      "Synchronizing online status across multiple clients in real time",
      "Handling message ordering and delivery guarantees",
      "Optimizing re-renders when new messages arrive rapidly",
    ],
    learnings: [
      "Deep understanding of WebSocket protocol and Socket.io event system",
      "State management patterns for real-time data streams",
      "Building scalable REST + WebSocket hybrid architectures",
      "Performance optimization for high-frequency UI updates",
    ],
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    demo: "https://chat-app-manoj.vercel.app",
    github: "https://github.com/manojkumar-mern/chat-app",
    image: "/projects/chat-app.webp",
  },
  {
    title: "Postly – Social Media Feed",
    description:
      "A full-stack social media style feed where users can create posts and view posts dynamically. Built with React and REST APIs with MongoDB backend.",
    problem:
      "Users need a simple, clean platform to share thoughts and browse a dynamic feed without the complexity and noise of mainstream social media.",
    solution:
      "Created a lightweight social feed application using MERN stack with RESTful CRUD APIs, allowing users to create, read, and manage posts in a clean, responsive interface.",
    features: [
      "Create, read, and delete posts with a clean UI",
      "Dynamic feed that updates in real time",
      "RESTful API with Express.js and MongoDB",
      "Responsive design for mobile and desktop",
    ],
    challenges: [
      "Designing an efficient REST API structure for feed pagination",
      "Handling optimistic UI updates for instant feedback",
      "Managing state consistency between client and server",
    ],
    learnings: [
      "Full CRUD implementation with MERN stack end-to-end",
      "REST API design patterns and best practices",
      "React state management for dynamic content feeds",
      "Deploying full-stack apps on Vercel",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    demo: "https://postly-react.vercel.app",
    github: "https://github.com/manojkumar-mern/postly",
    image: "/projects/postly.webp",
  },
  {
    title: "Task Manager Authentication",
    description:
      "A secure task management system with authentication. Users can register, login, and manage their tasks with protected routes and JWT authentication.",
    problem:
      "Task management tools often lack proper user isolation — anyone can see or modify tasks without authentication, creating security and privacy issues.",
    solution:
      "Built a secure task manager with JWT-based authentication, ensuring each user can only access their own tasks through protected API routes and client-side route guards.",
    features: [
      "User registration and login with JWT authentication",
      "Protected routes on both client and server side",
      "Full CRUD operations for personal task management",
      "Secure password hashing with bcrypt",
      "Persistent sessions with token-based auth",
    ],
    challenges: [
      "Implementing secure JWT token flow (access + refresh tokens)",
      "Protecting API routes with middleware authentication",
      "Handling token expiration and auto-logout gracefully",
      "Securing passwords with proper hashing algorithms",
    ],
    learnings: [
      "JWT authentication flow and security best practices",
      "Middleware-based route protection in Express.js",
      "Secure password storage with bcrypt",
      "Building protected client-side routes in React",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    demo: "https://task-manager-auth-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/task-manager-auth",
    image: "/projects/task-manager.webp",
  },
];

export const miniProjects: Project[] = [
  {
    title: "To-Do List Application",
    description:
      "A simple and responsive task tracking application where users can add, search, and manage daily tasks efficiently.",
    problem:
      "People need a quick, lightweight tool to organize daily tasks without the overhead of complex project management software.",
    solution:
      "Built a clean, vanilla JavaScript to-do app with search functionality and local persistence for fast, distraction-free task management.",
    features: [
      "Add, complete, and delete tasks",
      "Search and filter tasks in real time",
      "Clean, responsive UI for mobile and desktop",
    ],
    challenges: [
      "Implementing efficient search filtering on the client side",
      "Managing DOM updates without a framework",
    ],
    learnings: [
      "Vanilla JavaScript DOM manipulation techniques",
      "Building responsive layouts with pure CSS",
      "Client-side data persistence strategies",
    ],
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://to-do-list-app-87.vercel.app",
    github: "https://github.com/manojkumar-mern/to-do-list",
    image: "/projects/todo-list.webp",
  },
  {
    title: "React Live Color Generator",
    description:
      "An interactive React application that generates colors dynamically and allows users to preview and save color combinations.",
    problem:
      "Designers and developers often struggle to find and preview color palettes quickly during the design process.",
    solution:
      "Created an interactive color generator in React that lets users generate, preview, and copy color values instantly with a clean visual interface.",
    features: [
      "Dynamic color generation with live preview",
      "Click-to-copy color codes",
      "Responsive grid layout for color swatches",
    ],
    challenges: [
      "Generating visually pleasing random color palettes",
      "Implementing clipboard API for color code copying",
    ],
    learnings: [
      "React state management for dynamic UI updates",
      "Working with color spaces and HSL values",
      "Clipboard API integration in web apps",
    ],
    tech: ["React", "JavaScript", "CSS"],
    demo: "https://react-live-color.vercel.app",
    github: "https://github.com/manojkumar-mern/react-live-color",
    image: "/projects/color-generator.webp",
  },
  {
    title: "Rock Paper Scissors – Elite RPS Arena",
    description:
      "An interactive browser game with smooth animations and modern UI where users can play Rock Paper Scissors against the computer.",
    problem:
      "Classic browser games often feel outdated with poor UI and no engagement — there's room for a polished, modern take.",
    solution:
      "Built a visually appealing Rock Paper Scissors game with smooth animations, score tracking, and a modern dark-themed UI.",
    features: [
      "Play against computer with randomized AI logic",
      "Smooth animations and visual feedback",
      "Score tracking across rounds",
      "Modern, responsive dark-themed UI",
    ],
    challenges: [
      "Creating engaging animations without JavaScript frameworks",
      "Implementing fair randomization for computer moves",
    ],
    learnings: [
      "CSS animations and transitions for game UIs",
      "Game logic implementation in vanilla JavaScript",
      "Building interactive experiences without frameworks",
    ],
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://rock-paper-scissors-game-online.vercel.app",
    github: "https://github.com/manojkumar-mern/rock-paper-scissors-game",
    image: "/projects/rps-game.webp",
  },
  {
    title: "Notes API",
    description:
      "A RESTful API built with Node.js and Express for creating, updating, deleting, and retrieving notes with MongoDB database integration.",
    problem:
      "Backend developers need a clean, well-structured REST API template for CRUD operations that follows best practices.",
    solution:
      "Designed a RESTful Notes API with Express.js and MongoDB, following MVC architecture with proper error handling and validation.",
    features: [
      "Full CRUD operations (Create, Read, Update, Delete)",
      "MongoDB integration with Mongoose ODM",
      "RESTful endpoint design following conventions",
      "Error handling and input validation",
    ],
    challenges: [
      "Structuring the API with clean MVC architecture",
      "Implementing proper error handling middleware",
      "Designing consistent RESTful endpoint patterns",
    ],
    learnings: [
      "RESTful API design principles and conventions",
      "MongoDB and Mongoose schema design",
      "Express.js middleware patterns",
      "API testing and documentation practices",
    ],
    tech: ["Node.js", "Express.js", "MongoDB"],
    demo: "https://notes-api-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/notes-api",
    image: "/projects/notes-api.webp",
  },
];
