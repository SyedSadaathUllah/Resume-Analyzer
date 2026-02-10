import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("frontend developer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const analyzeResume = async () => {
    setError("");
    setResult(null);

    if (!file) {
      setError("Please upload a PDF or DOCX resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Server error");
      }

      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900">

      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade">

        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 animate-float">
          🤖 AI Resume Analyzer
        </h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Upload your resume & check skill match instantly
        </p>

        {/* Role */}
        <label className="text-sm font-medium text-slate-600">
          Select Job Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 mb-4 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="frontend developer">Frontend Developer</option>
          <option value="backend developer">Backend Developer</option>
          <option value="ai ml intern">AI / ML Intern</option>
        </select>

        {/* File */}
        <label className="text-sm font-medium text-slate-600">
          Upload Resume
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 mb-6 w-full text-sm rounded-lg border
          file:mr-4 file:rounded-lg file:border-0
          file:bg-blue-600 file:px-4 file:py-2 file:text-white
          hover:file:bg-blue-700 cursor-pointer"
        />

        {/* Button */}
        <button
          onClick={analyzeResume}
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition active:scale-95"
        >
          Analyze Resume
        </button>

        {/* Loader */}
        {loading && (
          <div className="mt-4 text-center text-sm text-blue-600 animate-pulse">
            Analyzing resume...
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 animate-fade">
            <p className="font-semibold text-slate-700 mb-2">
              Match Percentage
            </p>

            {/* Progress */}
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
                style={{ width: `${result.match_percentage}%` }}
              />
            </div>

            {/* Skills */}
            <div className="space-y-4 text-sm">

              <div>
                <p className="font-semibold text-green-700 mb-2">
                  Found Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.found_skills.length
                    ? result.found_skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium animate-pop"
                        >
                          {skill}
                        </span>
                      ))
                    : <span className="text-slate-400">None</span>
                  }
                </div>
              </div>

              <div>
                <p className="font-semibold text-red-600 mb-2">
                  Missing Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.length
                    ? result.missing_skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium animate-pop"
                        >
                          {skill}
                        </span>
                      ))
                    : <span className="text-slate-400">No gaps 🎉</span>
                  }
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
