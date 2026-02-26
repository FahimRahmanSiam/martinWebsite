import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">M</div>
        <div>
          <div className="sidebar-title">Math Admin</div>
          <div className="sidebar-subtitle">Control Panel</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin" end className="sidebar-link">
          Students
        </NavLink>

        <NavLink to="/admin/tuition" className="sidebar-link">
          Tuition
        </NavLink>

        {/* Add more later */}
        <NavLink to="/admin/batches" className="sidebar-link">
          Batches
        </NavLink>

        <NavLink to="/admin/reports" className="sidebar-link">
          Reports
        </NavLink>
      </nav>
    </aside>
  );
}
