import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AdminButton } from "../../components/admin/ui/AdminUi";
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import "../../assets/styles/pages/admin.css";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo" aria-hidden="true">
          UT
        </div>
        <h1 className="admin-login__title">Admin Access</h1>
        <p className="admin-login__sub">UnicodeTech Content Management</p>
        {error && (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        )}
        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className="admin-login__field">
            <label htmlFor="admin-email" className="admin-login__label">
              Email
            </label>
            <div className="admin-login__input-wrap">
              <Mail size={16} className="admin-login__input-icon" />
              <input
                id="admin-email"
                type="email"
                className="admin-login__input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@unicodetech.com"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div className="admin-login__field">
            <label htmlFor="admin-password" className="admin-login__label">
              Password
            </label>
            <div className="admin-login__input-wrap">
              <Lock size={16} className="admin-login__input-icon" />
              <input
                id="admin-password"
                type={showPass ? "text" : "password"}
                className="admin-login__input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-login__eye"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <AdminButton
            type="submit"
            variant="primary"
            loading={loading}
            icon={<LogIn size={16} />}
            className="admin-login__btn"
          >
            Sign In
          </AdminButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
