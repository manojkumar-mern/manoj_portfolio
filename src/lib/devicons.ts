// Centralized Devicon CDN URLs — single source of truth so the browser
// reuses the cached resource across Hero orbit, About, Skills, FloatingIcons.
const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const devicon = {
  react: `${BASE}/react/react-original.svg`,
  nodejs: `${BASE}/nodejs/nodejs-original.svg`,
  mongodb: `${BASE}/mongodb/mongodb-original.svg`,
  tailwind: `${BASE}/tailwindcss/tailwindcss-original.svg`,
  express: `${BASE}/express/express-original.svg`,
  html5: `${BASE}/html5/html5-original.svg`,
  css3: `${BASE}/css3/css3-original.svg`,
  mongoose: `${BASE}/mongoose/mongoose-original.svg`,
  javascript: `${BASE}/javascript/javascript-original.svg`,
  typescript: `${BASE}/typescript/typescript-original.svg`,
  socketio: `${BASE}/socketio/socketio-original.svg`,
  git: `${BASE}/git/git-original.svg`,
  github: `${BASE}/github/github-original.svg`,
  postman: `${BASE}/postman/postman-original.svg`,
  vercel: `${BASE}/vercel/vercel-original.svg`,
} as const;