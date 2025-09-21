import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Clock } from "lucide-react";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Check user's role and status
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  // If user is logged in and approved admin, redirect to dashboard
  if (user && user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If user is logged in but pending approval, show pending message
  if (user && user.role === "pending") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Request Pending</h1>
            <p className="text-gray-400 mb-8">Your admin access request is being reviewed</p>
            
            <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <h3 className="text-yellow-500 font-semibold">Access Pending</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Hello <span className="text-white font-medium">{user.firstName} {user.lastName}</span>,
                <br /><br />
                Your request for admin access to the CarePulse system has been submitted successfully. 
                An existing administrator will review your request and approve access accordingly.
                <br /><br />
                You will receive notification once your access has been approved.
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-md text-white font-medium border border-gray-700 mb-4"
            >
              Sign Out
            </button>
            
            <p className="text-center text-sm text-gray-500">
              Go back to <Link to="/" className="text-blue-400 hover:underline">Home</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
        } else {
          setMessage("Account created successfully! Please sign in to continue. Your admin access request is pending approval.");
          setIsLogin(true);
          setFormData({ email: "", username: "", firstName: "", lastName: "", password: "" });
        }
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Admin Sign In" : "Request Admin Access"}
          </h1>
          <p className="text-gray-400 mb-8">CarePulse Hospital Management System</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        {message && (
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
            <span className="text-green-400 text-sm">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 py-3 rounded-lg text-white font-medium transition-colors"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Request Access")}
          </button>
        </form>

        <div className="text-center space-y-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
              setFormData({ email: "", username: "", firstName: "", lastName: "", password: "" });
            }}
            className="text-blue-400 hover:underline text-sm"
          >
            {isLogin ? "Need admin access? Request here" : "Already have access? Sign in"}
          </button>
          
          <p className="text-center text-sm text-gray-500">
            Go back to <Link to="/" className="text-blue-400 hover:underline">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
