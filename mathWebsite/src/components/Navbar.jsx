import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-bar" data-aos="fade-down">

      {/* Logo Section */}
      <div className="nav-logo">
        <Link to="/" className="nav-logo-text">
          Acclerated <strong>Math</strong>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><NavLink to="/" onClick={() => window.scrollTo(0, 0)} className="nav-item">Home</NavLink> </li>
        <li><NavLink to="/courses"  onClick={() => window.scrollTo(0, 0)} className="nav-item">Courses</NavLink></li>
        <li><NavLink to="/pricing" onClick={() => window.scrollTo(0, 0)} className="nav-item">Pricing</NavLink> </li>
        <li><NavLink to="/blog" onClick={() => window.scrollTo(0, 0)} className="nav-item">Blogs</NavLink></li>
      </ul>

      {/* CTA Button */}
      <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="nav-cta">Enroll Now </Link>

      {/* Mobile Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div></div><div></div><div></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show-menu" : ""}`}>
        <NavLink onClick={() => setMenuOpen(false)} to="/" className="mobile-item">Home</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/courses" className="mobile-item">Courses</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/pricing" className="mobile-item">Pricing</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/success" className="mobile-item">Blogs</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/contact" className="mobile-item">Enroll</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
