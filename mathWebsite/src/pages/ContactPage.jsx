import { useEffect,useState } from "react";
import cartoon from "../assets/enroll.png"; // ← add your image here
import girlCartoon from "../assets/enroll2.png";

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    parentName: "",
    parentEmail: "",
    phone: "",
    level: "",
    startDate: "",
    zipCode: "",
    dob: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {  // change has been made here!
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Failed to submit enrollment.");
        return;
      }
  
      alert("Enrollment submitted ✅");
  
      setFormData({
        firstName: "",
        lastName: "",
        parentName: "",
        parentEmail: "",
        phone: "",
        level: "",
        startDate: "",
        zipCode: "",
        dob: "",
      });
    } catch (err) {
      console.error(err);
      alert("Backend not reachable. Is the server running on port 5001?");
    }
  }
  

  return (
    <div className="contact-wrapper">

      <section className="contact-hero" data-aos="fade-down">
        <h1 className="contact-title">Enrollment Form</h1>
        <p className="contact-subtitle">
          Fill out the form if you are willing to enroll into the course. For questions please send an email to <b>v.martin22@outlook.com</b>
        </p>
      </section>

      {/* -------- NEW LAYOUT: FORM + CARTOON SIDE BY SIDE -------- */}
      <div className="enroll-container">

      <div className="left-cartoon-box" data-aos="fade-right">
          <img src={girlCartoon} alt="Girl Cartoon" className="left-cartoon-img" />
        </div>

        {/* FORM SECTION */}
        <form className="enroll-form" onSubmit={handleSubmit} data-aos="zoom-in">

          {/* FIRST + LAST NAME */}
          <div className="form-row">
            <div className="form-group">
              <label>Student's First Name</label>
              <input type="text" name="firstName" value={formData.firstName} required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Student's Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} required onChange={handleChange} />
            </div>
          </div>

          {/* PARENT NAME */}
          <div className="form-group">
            <label>Parent/Guardian Name</label>
            <input type="text" name="parentName" value={formData.parentName} required onChange={handleChange} />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Parent Email</label>
            <input type="email" name="parentEmail" value={formData.parentEmail} required onChange={handleChange} />
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} required onChange={handleChange} />
          </div>

          {/* LEVEL DROPDOWN */}
          <div className="form-group">
            <label>Course Level</label>
            <select name="level" value={formData.level} required onChange={handleChange}>
              <option value="">Select a Level</option>
              <option value="Level 1">Level 1 – Foundations</option>
              <option value="Level 2">Level 2 – Builder</option>
              <option value="Level 3">Level 3 – Intermediate</option>
              <option value="Level 4">Level 4 – Advanced</option>
              <option value="Level 5">Level 5 – Mastary</option>
            </select>
          </div>

          {/* START DATE */}
          <div className="form-group">
            <label>Preferred Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} required onChange={handleChange} />
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>Child’s Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} required onChange={handleChange} />
          </div>

          {/* Zip code */}
          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" name="zipCode" value={formData.zipCode} required onChange={handleChange}></input>
          </div>

          <button type="submit" className="btn primary submit-btn">
            Submit Enrollment
          </button>

        </form>

        {/* CARTOON IMAGE SECTION */}
        <div className="cartoon-box" data-aos="fade-left" data-aos-delay="300">
          <img src={cartoon} alt="Enroll Cartoon" className="cartoon-img" />
        </div>

      </div>
    </div>
  );
}

export default ContactPage;
