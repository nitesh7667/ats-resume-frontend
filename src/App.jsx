import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Image as ImageIcon,
  Code,
  MessageSquare,
  LogOut,
  Settings,
  Zap,
  Award,
  LayoutTemplate
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const aiTools = [

    {
      title: "ATS Resume Analyzer",
      description:
        "Upload your resume, compare it to a Job Description, and get an AI score and feedback.",
      icon: <Award className="w-8 h-8 text-indigo-400" />,
      color: "from-indigo-500/20 to-indigo-600/5",
      path: "/ats",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-transparent flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            AI Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden sm:flex items-center gap-2 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-rose-500/80 hover:bg-rose-600/90 text-white shadow-lg shadow-rose-500/20 transition-all ml-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-6xl px-4 py-16 flex flex-col items-center">
        <div className="text-center space-y-6 max-w-3xl mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-indigo-200 mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Welcome to the future of AI tools</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Unleash Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
              Creative Potential
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light">
            Take full advantage of powerful artificial intelligence algorithms
            to boost your productivity. All your favorite AI tools in one
            unified dashboard.
          </p>
        </div>

        {/* Dashboard Tools Grid */}
        <div className="w-full flex flex-wrap justify-center gap-6 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-150 fill-mode-both">
          {aiTools.map((tool, index) => (
            <Card
              key={index}
              onClick={() => tool.path && navigate(tool.path)}
              className={`w-full max-w-xl overflow-hidden border-white/10 bg-gradient-to-br ${tool.color} backdrop-blur-xl hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold tracking-wide text-white drop-shadow-sm">
                  {tool.title}
                </CardTitle>
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors shadow-inner border border-white/5">
                  {tool.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300/80 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                  <span>Launch Tool</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Background Decorators */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

export default App;
