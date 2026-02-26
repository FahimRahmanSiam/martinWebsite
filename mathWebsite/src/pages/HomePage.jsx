import teacher from "../assets/martin.png";
import classroom1 from "../assets/classroom1.png";
import classroom2 from "../assets/classroom2.png";
import martinMath from "../assets/martinMath.PNG"
import fahimPhysicsFlyer from "../assets/fahimPhysicsFlyer.png"
import fahimCodingFlyer from "../assets/fahimCodingFlyer.png"
import students1 from "../assets/classroom3.png";
import teacherLogo from "../assets/cartoonHero.png" ;

function HomePage() {
  return (
    <div className="homepage-wrapper">

      {/* Wavy Background */}
      <div className="wave-bg"></div>

      {/* HERO SECTION */}
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-left" data-aos="fade-right" data-aos-delay="200">
          <h1 className="hero-title">
            A Place Where <span>Math Confidence</span> Grows.
          </h1>

          <p className="hero-subtext">
            Clear, patient, engaging and level based math lessons for kinder and middle school kids,
            created to build deep understanding, lifelong confidence, 
            and a true love for learning.
          </p>

          <div className="hero-buttons" data-aos="zoom-in" data-aos-delay="350">
            <a href="/courses" className="btn primary">Explore Courses</a>
            <a href="/contact" className="btn secondary">Book a Free Call</a>
          </div>

          <ul className="value-list" data-aos="fade-up" data-aos-delay="500">
            <li>Warm, encouraging teaching approach</li>
            <li>Strong foundations through visual learning</li>
            <li>Personalized support for every student</li>
            <li>Regular progress updates for parents</li>
          </ul>
        </div>

        <div className="hero-right" data-aos="zoom-in-up" data-aos-delay="300">
          <img src={teacher} alt="Teacher" className="hero-teacher-img" />
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="gallery-section" data-aos="fade-up" data-aos-delay="100">
        <h2 className="gallery-title">A Learning Environment Kids Enjoy</h2>

        <div className="gallery-grid">
          <img
            src={classroom1}
            alt="classroom"
            className="gallery-img"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
          <img
            src={classroom2}
            alt="classroom2"
            className="gallery-img"
            data-aos="zoom-in"
            data-aos-delay="350"
          />
          <img
            src={students1}
            alt="students"
            className="gallery-img"
            data-aos="zoom-in"
            data-aos-delay="500"
          />
        </div>
      </section>

{/* FEATURED PROGRAMS */}
<section className="flyer-section" data-aos="fade-up">
  <h2 className="flyer-title">Featured Learning Programs</h2>

  <p className="flyer-subtitle">
    We offer not only math courses but also other learning support like teaching how to code and special tutoring for physics. For more information, please call <b>813 500 1219</b> or send a email to <b>fahim.rahman1693@gmail.com</b>.
  </p>

  <div className="flyer-container">
    <img
      src={martinMath}
      alt="Program Flyer 1"
      className="flyer-image"
      data-aos="zoom-in"
      data-aos-delay="200"
    />

    <img
      src={fahimPhysicsFlyer}
      alt="Program Flyer 2"
      className="flyer-image"
      data-aos="zoom-in"
      data-aos-delay="350"
    />

    <img
      src={fahimCodingFlyer}
      alt="Program Flyer 2"
      className="flyer-image"
      data-aos="zoom-in"
      data-aos-delay="350"
    />

  </div>
</section>

      {/* ABOUT CARD */}
      <section className="teacher-card-section">
        <div
          className="teacher-card"
          data-aos="flip-up"
          data-aos-delay="200"
        >
        <img 
      src= {teacherLogo}
      alt="Ms. Martin"
      className="teacher-photo"
      />
          <h2>Meet Your Teacher</h2>
          <p>
            With years of classroom and tutoring experience, Ms. Martin brings 
            a nurturing, supportive teaching style that helps children feel 
            smart, capable, and excited to learn. She specializes in building 
            strong foundations in early maths and helping students overcome math anxiety. 
            With small and carefully designed courses and milestones, she promises to 
            extinguish the fear of math from a very early age.
          </p>
        </div>
      </section>

      {/* HOW MISS MARTIN HELPS */}
      <section className="focus-section">
        <h2 className="focus-title" data-aos="fade-up">How Miss Martin Helps Students Succeed</h2>

        <p className="focus-subtitle" data-aos="fade-up" data-aos-delay="200">
          Every child deserves a math teacher who understands how they learn.  
          Miss Martin uses a warm, personalized approach that builds clarity, confidence,  
          and long-term mastery — one step at a time.
        </p>

        <div className="focus-grid">

          <div className="focus-card" data-aos="fade-up" data-aos-delay="100">
            <div className="focus-icon">🧩</div>
            <h3>Breaks Down Complex Problems</h3>
            <p>Big ideas become simple steps that are easy to understand and apply.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="200">
            <div className="focus-icon">📅</div>
            <h3>Weekly Progress Monitoring</h3>
            <p>Consistent observation ensures each student learns at a healthy pace.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="300">
            <div className="focus-icon">👩‍🏫</div>
            <h3>One-to-One Support</h3>
            <p>Personalized help builds confidence and reinforces understanding.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="400">
            <div className="focus-icon">🧠</div>
            <h3>Focus on Understanding</h3>
            <p>Students learn the “why,” not just the answer — leading to long-term mastery.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="500">
            <div className="focus-icon">✨</div>
            <h3>Positive, Encouraging Teaching</h3>
            <p>A kind and motivating environment where kids feel safe to learn and grow.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="600">
            <div className="focus-icon">📘</div>
            <h3>Customized Learning Plans</h3>
            <p>Instruction tailored to each student’s level, strengths, and needs.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="700">
            <div className="focus-icon">🎯</div>
            <h3>Targeted Skill Building</h3>
            <p>Strengthening the exact areas that need improvement.</p>
          </div>

          <div className="focus-card" data-aos="fade-up" data-aos-delay="800">
            <div className="focus-icon">📣</div>
            <h3>Parent Communication</h3>
            <p>Clear updates so families always know how their child is progressing.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;
