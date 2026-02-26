import footerPic from "../assets/footer.png"
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      {/* Footer Top */}
      <div className="footer-main">

        {/* Brand Section */}
        <div className="footer-section" data-aos="fade-up">
          <h2 className="footer-logo">Acclerated <strong>Math</strong></h2>
          <p className="footer-text">
            Helping children build confidence, clarity, and a love for math.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section" data-aos="fade-up" data-aos-delay="150">
        <img src={footerPic} alt="" srcset="" />
        </div>

        {/* Social Media Reach */}
        <div className="footer-section" data-aos="fade-up" data-aos-delay="300">
          <h3 className="footer-title">Stay Connected</h3>
          <p className="footer-text">Follow Miss Martin for tips, updates, and learning insights. <b>email: v.martin22@outlook.com</b></p>

          <div className="social-icons">
            <a href="#" target="_blank" className="social-icon fb"><FaFacebookF /></a>
            <a href="#" target="_blank" className="social-icon ig"><FaInstagram /></a>
            <a href="#" target="_blank" className="social-icon yt"><FaYoutube /></a>
            <a href="#" target="_blank" className="social-icon tk"><FaTiktok /></a>
            <a href="mailto:hello@mathmastery.com" className="social-icon em"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom" data-aos="fade-up" data-aos-delay="500">
        <p>© {new Date().getFullYear()} SchoolOfMath. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;
