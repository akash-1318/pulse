import { useState } from "react";

const initialRegisterState = {
  organizationName: "",
  name: "",
  email: "",
  password: "",
};
const initialLoginState = { email: "", password: "" };

export function AuthForm({ mode = "login", onSubmit, loading }) {
  const [form, setForm] = useState(
    mode === "register" ? initialRegisterState : initialLoginState,
  );

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="card space-y-6 w-full" onSubmit={handleSubmit}>
      <div>
        <h2 className="subsection-title">
          {mode === "login" ? "Sign In" : "Create Organization"}
        </h2>
        <p className="text-muted mt-2">
          {mode === "login"
            ? "Enter your credentials to access the platform"
            : "Register your organization and create an admin account"}
        </p>
      </div>

      {mode === "register" && (
        <>
          <div className="form-group">
            <label htmlFor="organizationName" className="input-label">
              Organization Name
            </label>
            <input
              id="organizationName"
              name="organizationName"
              type="text"
              value={form.organizationName}
              onChange={updateField}
              required
              placeholder="Your organization name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="input-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={updateField}
              required
              placeholder="Your full name"
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
          required
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full py-3 text-lg font-semibold"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Please wait...
          </span>
        ) : mode === "login" ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
