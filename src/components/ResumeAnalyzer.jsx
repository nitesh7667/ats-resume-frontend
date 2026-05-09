import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  XCircle,
  Loader2,
  Award,
  FileText,
  Wand2,
} from "lucide-react";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        toast.error("Please upload a valid PDF file.");
        return;
      }
      setFile(selected);
    }
  };

  const fillSampleData = () => {
    setJobDescription(
      "We are looking for a highly skilled MERN Stack Developer. Requirements:\n- 2+ years of experience with MongoDB, Express.js, React.js, and Node.js.\n- Experience with state management (Redux, Context API).\n- Deep understanding of RESTful APIs and JWT.\n- Familiarity with Git, GitHub, and AWS.",
    );
    setSelfDescription(
      "I am a Full-Stack Developer with 3 years of experience. My core strength is the MERN stack, delivering e-commerce and chat applications. I use Redux and Git daily.",
    );
    toast.success("Sample text applied! Just upload any dummy PDF now.");
  };

  const handleAnalyze = async () => {
    if (!file) return toast.error("Please upload your resume.");
    if (!jobDescription.trim())
      return toast.error("Job description is required.");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    if (selfDescription.trim()) {
      formData.append("selfDescription", selfDescription);
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/resume/analyze`,
        formData,
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        },
      );

      if (res.data && res.data.data) {
        setResults(res.data.data);
        toast.success("Analysis Complete!");
      }
    } catch (error) {
      console.error("API Error Captured:", error);
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Network Error: Could not connect to the backend (Is it running on port 5000?)",
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Analysis failed due to a server error.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="min-h-screen text-white p-8 bg-transparent">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-slate-300 hover:text-white hover:bg-white/10 gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Hub
        </Button>
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            ATS Resume Analyzer
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[65vh]">
        {/* Input Section */}
        <div className="space-y-4 flex flex-col lg:col-span-4 lg:pr-2">
          <Card className="bg-black/40 border border-white/5 backdrop-blur-md shadow-2xl shrink-0 rounded-2xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-3 h-2 text-indigo-400" /> RESUME FILE
              </h2>
            </div>
            <CardContent className="p-4">
              <label className="border-[1.5px] border-dashed border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-500/10 transition-all rounded-xl p-3 flex flex-row items-center justify-center cursor-pointer group bg-black/20 gap-4 shadow-inner">
                <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/40 transition-colors shrink-0">
                  <UploadCloud className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="flex flex-col text-left flex-grow overflow-hidden">
                  <span className="text-white font-medium text-sm">
                    Upload your PDF
                  </span>
                  <span className="text-indigo-200/50 text-[11px] truncate w-full">
                    {file ? file.name : "Tap here to browse or drop"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col flex-grow rounded-2xl">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex flex-row items-center justify-between">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Wand2 className="w-3 h-3 text-purple-400" /> TARGET CONTEXT
              </h2>
              <button
                onClick={fillSampleData}
                className="text-[10px] font-semibold text-purple-300 hover:text-white bg-purple-500/20 hover:bg-purple-500/40 px-2 py-1 rounded-md transition-colors flex items-center tracking-wider"
              >
                DEMO TEXT
              </button>
            </div>
            <CardContent className="p-4 space-y-4 flex flex-col flex-grow">
              <div className="flex flex-col flex-grow relative group">
                <label className="text-[10px] font-semibold text-slate-400 mb-1.5 block uppercase tracking-widest">
                  Job Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-slate-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:bg-white/10 transition-all resize-none flex-grow min-h-[5rem] text-xs shadow-inner outline-none"
                  placeholder="Paste the target requirements..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="shrink-0 relative group">
                <label className="text-[10px] font-semibold text-slate-400 mb-1.5 block uppercase tracking-widest">
                  Self Description{" "}
                  <span className="text-slate-600 lowercase tracking-normal">
                    (Optional)
                  </span>
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-slate-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:bg-white/10 transition-all resize-none h-[52px] text-xs shadow-inner outline-none"
                  placeholder="Brief bio or specific instructions..."
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-purple-900/20 py-6 font-semibold text-sm rounded-xl border border-white/10 transform transition-transform hover:scale-[1.01] active:scale-[0.99] shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running Analysis...
                  </>
                ) : (
                  "✨ Run AI Analysis"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="relative h-full lg:overflow-y-auto lg:pr-4 pb-12 scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent lg:col-span-8">
          {results ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
              {/* Score Card */}
              <Card className="bg-black/40 border-white/10 backdrop-blur-md overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
                <CardContent className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-400 font-medium mb-1">
                      ATS Match Score
                    </h3>
                    <div className="text-5xl font-extrabold tracking-tighter">
                      <span className={getScoreColor(results.atsScore)}>
                        {results.atsScore}
                      </span>
                      <span className="text-slate-500 text-2xl">/100</span>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-slate-800"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${getScoreColor(results.atsScore)} transition-all duration-1000 ease-out`}
                        strokeDasharray={`${results.atsScore}, 100`}
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Keywords Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-emerald-950/20 border-emerald-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-emerald-400 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Matched Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedKeywords?.length > 0 ? (
                        results.matchedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md text-xs"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 text-xs text-center w-full">
                          None found
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-rose-950/20 border-rose-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-rose-400 text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Missing Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords?.length > 0 ? (
                        results.missingKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-md text-xs"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 text-xs text-center w-full">
                          None missing!
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Critical Mistakes Section */}
              {(results.spellingAndGrammarIssues?.length > 0 ||
                results.formattingIssues?.length > 0) && (
                <Card className="bg-rose-950/20 border-rose-500/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-rose-400 text-lg flex items-center gap-2">
                      ⚠️ Critical Mistakes Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.spellingAndGrammarIssues?.length > 0 && (
                      <div>
                        <h4 className="text-rose-300 font-semibold mb-2">
                          Spelling & Grammar Errors
                        </h4>
                        <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 marker:text-rose-500">
                          {results.spellingAndGrammarIssues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.formattingIssues?.length > 0 && (
                      <div>
                        <h4 className="text-rose-300 font-semibold mb-2">
                          Formatting & Structure Flaws
                        </h4>
                        <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 marker:text-rose-500">
                          {results.formattingIssues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Project Suggestions */}
              {results.projectSuggestions?.length > 0 && (
                <Card className="bg-blue-950/20 border-blue-500/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
                      <Award className="w-5 h-5" /> Industry-Ready Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-slate-300 text-sm space-y-2 marker:text-blue-500">
                      {results.projectSuggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Expert Feedback */}
              <Card className="bg-indigo-950/20 border-indigo-500/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-indigo-300 text-lg">
                    AI Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {results.aiFeedback}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : loading ? (
            <div className="h-full min-h-[400px] border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 rounded-2xl flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-0 border-t-2 border-indigo-400 rounded-full animate-spin"></div>
                <Loader2 className="w-16 h-16 text-indigo-400/20" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300 mt-6 mb-2 animate-pulse">
                Running AI Analysis...
              </h3>
              <p className="max-w-xs text-sm text-indigo-200/50">
                Gemini is reading the resume and extracting keywords.
              </p>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 bg-black/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-500 backdrop-blur-sm transition-all hover:border-white/10">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-300 mb-2">
                Awaiting Resume
              </h3>
              <p className="max-w-xs text-sm text-slate-500">
                Upload your PDF and job description on the left to instantly
                generate an ATS compatibility score.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background Decorators */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}
