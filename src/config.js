// Automatically use localhost during development, and the live Render URL in production.
export const BACKEND_URL = import.meta.env.DEV 
  ? "http://localhost:5000" 
  : "https://ats-resume-backend-3.onrender.com";

// If you want to force it to use a specific one, comment out the code above and uncomment one of these:
// export const BACKEND_URL = "http://localhost:5000";
// export const BACKEND_URL = "https://ats-resume-backend-3.onrender.com";
