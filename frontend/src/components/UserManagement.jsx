import { useState } from "react";

const defaultState = { name: "", email: "", password: "", role: "viewer" };

export function UserManagement({ users, onCreateUser, loading }) {
  const [form, setForm] = useState(defaultState);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    await onCreateUser(form);
    setForm(defaultState);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create User Form */}
      <form className="card space-y-6 lg:col-span-1" onSubmit={submit}>
        <div>
          <h3 className="subsection-title flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 16A4 4 0 100 8a4 4 0 008 0z" />
              <path d="M15 17H9v-2a4 4 0 018 0v2z" />
            </svg>
            Create User
          </h3>
          <p className="text-muted mt-2 text-sm">
            Add a new team member to your organization
          </p>
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
            placeholder="John Doe"
          />
        </div>

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
            placeholder="john@example.com"
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

        <div className="form-group">
          <label htmlFor="role" className="input-label">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={updateField}
            className="cursor-pointer"
          >
            <option value="viewer">Viewer - View videos only</option>
            <option value="editor">Editor - Upload & manage videos</option>
            <option value="admin">Admin - Full access</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 font-semibold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create User
            </>
          )}
        </button>
      </form>

      {/* Users Table */}
      <div className="card lg:col-span-2 space-y-4">
        <h3 className="subsection-title flex items-center gap-2">
          <svg
            className="w-6 h-6 text-primary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 10a6 6 0 1-12 0A6 6 0 019 10z" />
            <path d="M14.5 12a6.8 6.8 0 00-1.5-.3m-4 0c-.55 0-1.08.05-1.6.15m5.5 3a6 6 0 10-12 0" />
          </svg>
          Team Members ({users.length})
        </h3>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">
              No team members yet. Create one to get started.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id || user._id}>
                    <td className="font-medium">{user.name}</td>
                    <td className="text-gray-400">{user.email}</td>
                    <td>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-950/40 text-red-300"
                            : user.role === "editor"
                              ? "bg-primary-950/40 text-primary-300"
                              : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
