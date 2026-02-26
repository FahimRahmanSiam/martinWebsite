import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function getToken() {
  return localStorage.getItem("admin_token");
}

export default function TuitionPage() {
  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // payment panel state
  const [payingStudentId, setPayingStudentId] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([1]);
  const [method, setMethod] = useState("zelle");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [reference, setReference] = useState("");

  const [expandedId, setExpandedId] = useState(null);

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/login");

  }

  async function fetchLedgers() {
    const token = getToken();
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tuition`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.status === 401) return logout();
      if (!res.ok) return alert(data.message || "Failed to load tuition");

      setLedgers(data);
    } catch (e) {
      console.error(e);
      alert("Server error while loading tuition.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLedgers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ledgers;

    return ledgers.filter((l) => {
      const s = l.studentId || {};
      const hay = [s.firstName, s.lastName, s.level, s.parentEmail, s.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [ledgers, query]);

  // ---------- helpers for month data ----------
  function getMonthByIndex(ledger, i) {
    return ledger.months?.find((m) => m.monthIndex === i);
  }

  function getStatus(ledger, i) {
    return getMonthByIndex(ledger, i)?.status || "unpaid";
  }

  function getPaid(ledger, i) {
    return getMonthByIndex(ledger, i)?.amountPaid || 0;
  }

  function getDue(ledger, i) {
    return getMonthByIndex(ledger, i)?.amountDue || 0;
  }

  // ---------- month selection ----------
  function toggleMonth(m) {
    setSelectedMonths((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m].sort()
    );
  }

  // ---------- open payment panel ----------
  function openMonthPayment(studentId, monthIndex) {
    setPayingStudentId(studentId);
    setSelectedMonths([monthIndex]); // lock default to clicked month
    setMethod("zelle");
    setAmount("");
    setNote("");
    setReference("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPayment(studentId) {
    // manual open from button (defaults to Month 1)
    setPayingStudentId(studentId);
    setSelectedMonths([1]);
    setMethod("zelle");
    setAmount("");
    setNote("");
    setReference("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closePayment() {
    setPayingStudentId(null);
  }

  // ---------- submit payment ----------
  async function submitPayment() {
    const token = getToken();
    if (!token) return navigate("/login");

    if (!amount || Number(amount) <= 0) return alert("Enter a valid amount.");
    if (selectedMonths.length === 0) return alert("Select at least 1 month.");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tuition/pay/${payingStudentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            monthIndexes: selectedMonths,
            amount: Number(amount),
            method,
            note,
            reference,
          }),
        }
      );

      const data = await res.json();
      if (res.status === 401) return logout();
      if (!res.ok) return alert(data.message || "Payment failed");

      await fetchLedgers();
      closePayment();
      alert("Payment recorded ✅");
    } catch (e) {
      console.error(e);
      alert("Server error while recording payment.");
    }
  }

  function statusClass(status) {
    if (status === "paid") return "tu-pill tu-paid";
    if (status === "partial") return "tu-pill tu-partial";
    return "tu-pill tu-unpaid";
  }

  return (
    <div className="tu-wrap">
      <header className="tu-topbar">
        <div>
          <div className="tu-title">Tuition Control Panel</div>
          <div className="tu-subtitle">
            Track monthly payments (5-month courses)
          </div>
        </div>

        <div className="tu-actions">
          <div className="tu-search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, level..."
            />
          </div>

          <button className="tu-btn tu-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="tu-main">
        {/* empty state */}
        {/* {!loading && ledgers.length === 0 && (
          <section className="tu-card">
            <div className="tu-card-head">
              <h2>Getting Started</h2>
            </div>
            <div style={{ padding: 18, opacity: 0.85 }}>
              <p>You haven’t created any tuition ledgers yet.</p>
              <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                <li>Create students from the enrollment form</li>
                <li>Create a tuition ledger for each student</li>
                <li>Track monthly or advance payments</li>
              </ul>
            </div>
          </section>
        )} */}
        

        {/* payment panel */}
        {payingStudentId && (
          <section className="tu-card">
            <div className="tu-card-head">
              <div>
                <h2>Record Payment</h2>
                <p>
                  Recording payment for:{" "}
                  <b>Month {selectedMonths[0]}</b>
                </p>
                <p>
                  You can also select multiple months for advance payments.
                </p>
              </div>
              <button className="tu-btn tu-ghost" onClick={closePayment}>
                Close
              </button>
            </div>

            <div className="tu-pay-grid">
              <div className="tu-field">
                <label>Months</label>
                <div className="tu-months">
                  {[1, 2, 3, 4, 5].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`tu-month ${
                        selectedMonths.includes(m) ? "tu-month-on" : ""
                      }`}
                      onClick={() => toggleMonth(m)}
                    >
                      Month {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tu-field">
                <label>Payment Method</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="zelle">Zelle</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div className="tu-field">
                <label>Amount (Total)</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 225 or 675 for 3 months"
                />
              </div>

              <div className="tu-field">
                <label>Reference (optional)</label>
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Zelle confirmation / receipt note"
                />
              </div>

              <div className="tu-field tu-span-2">
                <label>Note (optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any note for your records"
                />
              </div>
            </div>

            <div className="tu-card-foot">
              <button className="tu-btn tu-primary" onClick={submitPayment}>
                Save Payment
              </button>
              <button className="tu-btn tu-ghost" onClick={closePayment}>
                Cancel
              </button>
            </div>
          </section>
        )}

        {/* main table */}
        <section className="tu-card">
          <div className="tu-card-head">
            <div>
              <h2>Students</h2>
              <p>{loading ? "Loading..." : `${filtered.length} ledger(s)`}</p>
            </div>
            <button className="tu-btn tu-ghost" onClick={fetchLedgers}>
              Refresh
            </button>
          </div>

          <div className="tu-table-wrap">
            <table className="tu-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Level</th>
                  <th>Phone</th>
                  <th>M1</th>
                  <th>M2</th>
                  <th>M3</th>
                  <th>M4</th>
                  <th>M5</th>
                  <th className="tu-th-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="tu-empty">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="tu-empty">
                      No tuition records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((l) => {
                    const s = l.studentId || {};

                    return (
                      <>
                        <tr key={l._id}>
                          <td className="tu-strong">
                            {s.firstName} {s.lastName}
                          </td>

                          <td>
                            <span className="tu-pill tu-level">{s.level}</span>
                          </td>
                          <td>{s.phone}</td>

                          {/* clickable month cells */}
                          {[1, 2, 3, 4, 5].map((i) => (
                            <td key={i}>
                              <button
                                type="button"
                                className={`tu-monthcell tu-${getStatus(l, i)}`}
                                onClick={() => openMonthPayment(s._id, i)}
                                title="Click to record payment"
                              >
                                <div className="tu-monthcell-status">
                                  {getStatus(l, i).toUpperCase()}
                                </div>
                                <div className="tu-monthcell-amount">
                                  ${getPaid(l, i)} / ${getDue(l, i)}
                                </div>
                              </button>
                            </td>
                          ))}

                          <td className="tu-actions-cell">
                            <button
                              className="tu-btn tu-small"
                              onClick={() => openPayment(s._id)}
                            >
                              Add Payment
                            </button>

                            <button
                              className="tu-btn tu-small tu-ghost"
                              onClick={() =>
                                setExpandedId(expandedId === l._id ? null : l._id)
                              }
                            >
                              {expandedId === l._id ? "Hide" : "History"}
                            </button>
                          </td>
                        </tr>

                        {/* history drawer */}
                        {expandedId === l._id && (
                          <tr>
                            <td colSpan="10" className="tu-history">
                              <div className="tu-history-grid">
                                {(l.months || []).map((m) => (
                                  <div key={m.monthIndex} className="tu-history-card">
                                    <div className="tu-history-title">
                                      Month {m.monthIndex} —{" "}
                                      {m.status.toUpperCase()}
                                    </div>
                                    <div className="tu-history-meta">
                                      Due: {new Date(m.dueDate).toLocaleDateString()}
                                    </div>
                                    <div className="tu-history-meta">
                                      Paid: ${m.amountPaid} / ${m.amountDue}
                                    </div>

                                    <div className="tu-history-list">
                                      {m.payments?.length ? (
                                        m.payments.map((p, idx) => (
                                        <div key={idx} className="tu-history-item">
                                          <div className="tu-history-item-strong">
                                            ${p.amount} — {p.method.toUpperCase()}
                                          </div>

                                          <div className="tu-history-item-muted">
                                            {new Date(p.paidAt).toLocaleString()}
                                            {p.reference ? ` • Ref: ${p.reference}` : ""}
                                            {p.note ? ` • ${p.note}` : ""}
                                          </div>

                                          {p.paymentId && (
                                            <button
                                              className="tu-delete-pay"
                                              onClick={async () => {
                                                const ok = confirm("Delete this payment? This will subtract the amount.");
                                                if (!ok) return;

                                                const token = localStorage.getItem("admin_token");

                                                const res = await fetch(
                                                  `${import.meta.env.VITE_API_URL}/api/tuition/pay/${l.studentId._id}/${m.monthIndex}/${p.paymentId}`,
                                                  {
                                                    method: "DELETE",
                                                    headers: { Authorization: `Bearer ${token}` },
                                                  }
                                                );

                                                const data = await res.json();
                                                if (!res.ok) return alert(data.message || "Failed to delete payment");

                                                await fetchLedgers();
                                              }}
                                            >
                                              Delete
                                            </button>
                                          )}
                                        </div>

                                        ))
                                      ) : (
                                        <div className="tu-history-item-muted">
                                          No payments yet.
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
