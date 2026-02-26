import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    parentName: "",
    parentEmail: "",
    phone: "",
    level: "",
    startDate: "",
    dob: "",
    zipCode: "",
  });


  function getToken() {
    return localStorage.getItem("admin_token");
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/login");
  }

  async function fetchStudents() {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.status === 401) return logout();
      if (!res.ok) return alert(data.message || "Failed to load students");

      setStudents(data);
    } catch (err) {
      console.error(err);
      alert("Server error while loading students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;

    return students.filter((s) => {
      const hay = [
        s.firstName,
        s.lastName,
        s.parentName,
        s.parentEmail,
        s.phone,
        s.level,
        s.zipCode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [students, query]);

  function startEdit(student) {
    setEditingId(student._id);
    setEditForm({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      parentName: student.parentName || "",
      parentEmail: student.parentEmail || "",
      phone: student.phone || "",
      level: student.level || "",
      startDate: student.startDate ? student.startDate.slice(0, 10) : "",
      dob: student.dob ? student.dob.slice(0, 10) : "",
      zipCode: student.zipCode || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({
      firstName: "",
      lastName: "",
      parentName: "",
      parentEmail: "",
      phone: "",
      level: "",
      startDate: "",
      dob: "",
      zipCode: "",
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  async function saveEdit(id) {
    const token = getToken();
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (res.status === 401) return logout();
      if (!res.ok) return alert(data.message || "Update failed");

      setStudents((prev) => prev.map((s) => (s._id === id ? data : s)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Server error while updating student.");
    }
  }

  async function deleteStudent(id) {
    const token = getToken();
    if (!token) return navigate("/login");

    const ok = window.confirm("Delete this student? This cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.status === 401) return logout();
      if (!res.ok) return alert(data.message || "Delete failed");

      setStudents((prev) => prev.filter((s) => s._id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Server error while deleting student.");
    }
  }

  return (
    <div className="admin-wrap">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-logo">M</div>
          <div>
            <div className="admin-title">Admin Panel</div>
            <div className="admin-subtitle">Enrollment Management</div>
          </div>
        </div>

        <div className="admin-actions">
          <div className="admin-search">
            <span className="admin-search-icon">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student, parent, email, phone, level..."
            />
          </div>

          <button className="admin-btn admin-btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Edit card */}
        {editingId && (
          <section className="admin-card">
            <div className="admin-card-head">
              <div>
                <h2>Edit Student</h2>
                <p>Update details then click Save.</p>
              </div>
              <button className="admin-btn admin-btn-ghost" onClick={cancelEdit}>
                Close
              </button>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>First Name</label>
                <input name="firstName" value={editForm.firstName} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Last Name</label>
                <input name="lastName" value={editForm.lastName} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Parent Name</label>
                <input name="parentName" value={editForm.parentName} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Parent Email</label>
                <input name="parentEmail" value={editForm.parentEmail} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Phone</label>
                <input name="phone" value={editForm.phone} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Level</label>
                <select name="level" value={editForm.level} onChange={handleEditChange}>
                  <option value="">Select a Level</option>
                  <option value="Level 1">Level 1 – Foundations</option>
                  <option value="Level 2">Level 2 – Builder</option>
                  <option value="Level 3">Level 3 – Intermediate</option>
                  <option value="Level 4">Level 4 – Advanced</option>
                  <option value="Level 5">Level 5 – Mastary</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Start Date</label>
                <input type="date" name="startDate" value={editForm.startDate} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>DOB</label>
                <input type="date" name="dob" value={editForm.dob} onChange={handleEditChange} />
              </div>
              <div className="admin-field">
                <label>Zip Code</label>
                <input name="zipCode" value={editForm.zipCode} onChange={handleEditChange} />
              </div>
            </div>

            <div className="admin-card-foot">
              <button className="admin-btn admin-btn-primary" onClick={() => saveEdit(editingId)}>
                Save Changes
              </button>
              <button className="admin-btn admin-btn-ghost" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </section>
        )}

        <section className="admin-card">
          <div className="admin-card-head">
            <div>
              <h2>Enrolled Students</h2>
              <p>
                {loading
                  ? "Loading..."
                  : `${filtered.length} student${filtered.length === 1 ? "" : "s"} shown`}
              </p>
            </div>

            <button className="admin-btn admin-btn-ghost" onClick={fetchStudents}>
              Refresh
            </button>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Parent</th>
                  <th>Contact</th>
                  <th>Level</th>
                  <th>Start</th>
                  <th>DOB</th>
                  <th>Zip</th>
                  <th className="admin-th-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="admin-empty">
                      Loading students...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="admin-empty">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <div className="admin-cell-title">
                          {s.firstName} {s.lastName}
                        </div>
                      </td>
                      <td>{s.parentName}</td>
                      <td>
                        <div className="admin-mini">
                          <div className="admin-mini-strong">{s.parentEmail}</div>
                          <div className="admin-mini-muted">{s.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-pill">{s.level}</span>
                      </td>
                      <td>{s.startDate ? new Date(s.startDate).toLocaleDateString() : "-"}</td>
                      <td>{s.dob ? new Date(s.dob).toLocaleDateString() : "-"}</td>
                      <td>{s.zipCode || "-"}</td>
                      <td className="admin-actions-cell">
                        <button className="admin-btn admin-btn-small" onClick={() => startEdit(s)}>
                          Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-small admin-btn-danger"
                          onClick={() => deleteStudent(s._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
