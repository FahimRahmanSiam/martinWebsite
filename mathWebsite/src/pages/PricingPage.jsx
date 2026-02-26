function PricingPage() {
  return (
    <div className="pricing-wrapper">

      {/* PAGE HEADER */}
      <section className="pricing-hero" data-aos="fade-down">
        <h1 className="pricing-title">Choose the Perfect Math Plan</h1>
        <p className="pricing-subtitle">
          Flexible, effective, and thoughtfully designed learning paths  
          that help every child build confidence and mastery.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section className="pricing-cards">
        
        {/* LEVEL 1 */}
        <div
          className="price-card"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <h2>Level 1</h2>
          <p className="price-amount">$175 / Month</p>

          <ul className="price-features">
          <li>Perfect for beginner in math</li>
          <li>Strong foundation building</li>
          <li>Weekly reviews included</li>
          <li>Parent updates every 2 weeks</li>
          </ul>

          <div className="price-save">
            Save 10% on the full course by paying full
          </div>

          <a href="/contact" className="btn primary price-btn">
            Enroll Now
          </a>
        </div>

        {/* LEVEL 2 */}
        <div
          className="price-card"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <h2>Level 2</h2>
          <p className="price-amount">$225 / Month</p>

          <ul className="price-features">
          <li>Designed for student who understands basic math</li>
          <li>Skill strengthening & accuracy</li>
          <li>Weekly practice sessions</li>
          <li>Monthly parent reports</li>
          </ul>

          <div className="price-save">
            Save 10% on the full course by paying full
          </div>

          <a href="/contact" className="btn primary price-btn">
            Enroll Now
          </a>
        </div>

        {/* LEVEL 3 */}
        <div
          className="price-card"
          data-aos="zoom-in"
          data-aos-delay="450"
        >
          <h2>Level 3</h2>
          <p className="price-amount">$225 / Month</p>

          <ul className="price-features">
            <li>Ideal for students who wants to learn beyond the textbook</li>
            <li>Advanced problem-solving focus</li>
            <li>Topic-based mastery</li>
            <li>Regular progress feedback</li>
          </ul>

          <div className="price-save">
          Save 10% on the full course by paying full
          </div>

          <a href="/contact" className="btn primary price-btn">
            Enroll Now
          </a>
        </div>

                {/* LEVEL 4 */}
                <div
          className="price-card"
          data-aos="zoom-in"
          data-aos-delay="450"
        >
          <h2>Level 4</h2>
          <p className="price-amount">$275 / Month</p>

          <ul className="price-features">
          <li>Advanced math concepts</li>
          <li>Pre-algebra & logical reasoning</li>
          <li>Weekly challenge problems</li>
          <li>Bi-weekly parent updates</li>
          </ul>

          <div className="price-save">
          Save 10% on the full course by paying full
          </div>

          <a href="/contact" className="btn primary price-btn">
            Enroll Now
          </a>
        </div>

                {/* LEVEL 5 */}
                <div
          className="price-card"
          data-aos="zoom-in"
          data-aos-delay="450"
        >
          <h2>Level 5</h2>
          <p className="price-amount">$275 / Month</p>

          <ul className="price-features">
          <li>Elite & competitive preparation</li>
          <li>High-level problem solving</li>
          <li>Exam & olympiad-style questions</li>
          <li>Personalized performance guidance</li>
          </ul>

          <div className="price-save">
            Save $50 monthly with a 6-month plan
          </div>

          <a href="/contact" className="btn primary price-btn">
            Enroll Now
          </a>
        </div>

      </section>

    </div>
  );
}

export default PricingPage;
