import courses from "../data/courses.json";
import level1Pic from "../assets/level1.png";
import level2Pic from "../assets/level2.png";
import level3Pic from "../assets/level3.png";
import level4Pic from "../assets/level4.png";
import level5Pic from "../assets/level5.png";
import { useState } from "react";



function CoursesPage() {
  const [openCourseId, setOpenCourseId] = useState(null);

  const toggleCourse = (id) => {
    setOpenCourseId((prev) => (prev === id ? null : id));
  };

  const bannerMap = {
    level1: level1Pic,
    level2: level2Pic,
    level3: level3Pic,
    level4: level4Pic,
    level5: level5Pic
  };

  return (
    <div className="courses-page">
      {/* HERO */}
      <section className="courses-hero" data-aos="fade-down">
        <h1 className="courses-title">In-Person Courses for Every Math Journey</h1>
        <p className="courses-subtitle">
          From building strong foundations to preparing for pre-algebra, each
          course is carefully designed by Miss Martin to support your child’s
          growth with clear structure, weekly goals, and joyful learning.
        </p>
      </section>

      {/* LEVEL CARDS */}
      <section className="courses-list">
        {courses.map((course, index) => (
          <article
            key={course.id}
            className="course-card"
            data-aos="fade-up"
            data-aos-delay={150 * index}
          >
            {/* Top banner */}
            <div className="course-banner-wrap" onClick={() => toggleCourse(course.id)}>
              <img
                src={bannerMap[course.id]}
                alt={course.title}
                className="course-banner"
              />
              <div className="course-level-pill">
                {course.level} · {course.gradeRange}
                {course.targetGrades ? ` · ${course.targetGrades}` : ""}
              </div>

              <div className="expand-hint">
                Click to view details
              </div>
            </div>

            {/* Content */}
            <div className={`course-body expandable ${openCourseId === course.id ? "expanded" : "" }`}>
              <div className="course-body-inner">
                <h2 className="course-heading">{course.title}</h2>

              {/* Optional short philosophy line */}
              {course.coursePhilosophy && (
                <p className="course-philosophy">{course.coursePhilosophy}</p>
              )}

              <div className="course-meta">
                <span>Duration: {course.duration}</span>
                <span>{course.sessionsPerWeek} sessions per week</span>
                {course.formatDetails?.sessionLengthMinutes ? (
                  <span>{course.formatDetails.sessionLengthMinutes} min/session</span>
                ) : null}
                {course.formatDetails?.maxClassSize ? (
                  <span>Max {course.formatDetails.maxClassSize} students</span>
                ) : null}
                {course.formatDetails?.format ? (
                  <span>{course.formatDetails.format}</span>
                ) : null}
              </div>

              {/* Original Learning outcomes + ideal for */}
              <div className="course-columns">
                <div className="course-column">
                  <h3>By the end, students will:</h3>
                  <ul>
                    {course.studentsWillLearn?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="course-column">
                  <h3>Perfect for students who:</h3>
                  <ul>
                    {course.idealFor?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NEW: Detail grid */}
              {(course.instructionalBackbone ||
                course.placementAndPacing ||
                course.homework ||
                course.assessment ||
                course.parentCommunication ||
                course.studentFit ||
                course.whatThisCourseDoesNotPromise ||
                course.coreTrainingFocus ||
                course.endOfCourseOutcomes) && (
                <div className="course-details">
                  {/* Curriculum */}
                  {course.instructionalBackbone && (
                    <div className="detail-card">
                      <h3>Curriculum</h3>
                      <p className="detail-strong">
                        {course.instructionalBackbone.curriculum}
                      </p>
                      {Array.isArray(course.instructionalBackbone.whyThisCurriculum) && (
                        <ul className="detail-list">
                          {course.instructionalBackbone.whyThisCurriculum.map((x, i) => (
                            <li key={i}>{x}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Course structure */}
                  {course.formatDetails && (
                    <div className="detail-card">
                      <h3>Structure</h3>
                      <ul className="detail-list">
                        {course.formatDetails.format && (
                          <li>Format: {course.formatDetails.format}</li>
                        )}
                        {course.formatDetails.sessionLengthMinutes && (
                          <li>Session length: {course.formatDetails.sessionLengthMinutes} minutes</li>
                        )}
                        {course.formatDetails.maxClassSize && (
                          <li>Class size: up to {course.formatDetails.maxClassSize} students</li>
                        )}
                      </ul>
                      {course.formatDetails.smallGroupBenefit && (
                        <p className="detail-note">{course.formatDetails.smallGroupBenefit}</p>
                      )}
                    </div>
                  )}

                  {/* Placement & pacing */}
                  {course.placementAndPacing && (
                    <div className="detail-card">
                      <h3>Placement & Pacing</h3>
                      <ul className="detail-list">
                        {course.placementAndPacing.placementAssessment && (
                          <li>Placement assessment included</li>
                        )}
                        {course.placementAndPacing.placementApproach && (
                          <li>{course.placementAndPacing.placementApproach}</li>
                        )}
                        {course.placementAndPacing.accelerationApproach && (
                          <li>{course.placementAndPacing.accelerationApproach}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Core training focus */}
                  {Array.isArray(course.coreTrainingFocus) && course.coreTrainingFocus.length > 0 && (
                    <div className="detail-card detail-card-wide">
                      <h3>Core Training Focus</h3>
                      <ul className="detail-list two-col">
                        {course.coreTrainingFocus.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                      {course.accuracyThenSpeed && (
                        <p className="detail-note">{course.accuracyThenSpeed}</p>
                      )}
                    </div>
                  )}

                  {/* Homework */}
                  {course.homework && (
                    <div className="detail-card">
                      <h3>Homework</h3>
                      <ul className="detail-list">
                        {course.homework.required != null && (
                          <li>Required: {course.homework.required ? "Yes" : "No"}</li>
                        )}
                        {course.homework.expectedPerDayMinutes && (
                          <li>Expected: ~{course.homework.expectedPerDayMinutes} minutes/day</li>
                        )}
                      </ul>
                      {course.homework.notes && (
                        <p className="detail-note">{course.homework.notes}</p>
                      )}
                    </div>
                  )}

                  {/* Assessment */}
                  {course.assessment && (
                    <div className="detail-card">
                      <h3>Assessment</h3>
                      <ul className="detail-list">
                        {course.assessment.ongoing != null && (
                          <li>Ongoing: {course.assessment.ongoing ? "Yes" : "No"}</li>
                        )}
                        {course.assessment.dailyInClassPractice && (
                          <li>{course.assessment.dailyInClassPractice}</li>
                        )}
                        {course.assessment.weeklyQuizzesOrExams && (
                          <li>Weekly quizzes/exams</li>
                        )}
                        {course.assessment.individualizedSupplementalPractice && (
                          <li>{course.assessment.individualizedSupplementalPractice}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Parent updates */}
                  {course.parentCommunication && (
                    <div className="detail-card">
                      <h3>Parent Updates</h3>
                      <ul className="detail-list">
                        {course.parentCommunication.weeklyProgressReports && (
                          <li>Weekly progress reports</li>
                        )}
                        {course.parentCommunication.purpose && (
                          <li>{course.parentCommunication.purpose}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Outcomes */}
                  {Array.isArray(course.endOfCourseOutcomes) && course.endOfCourseOutcomes.length > 0 && (
                    <div className="detail-card detail-card-wide">
                      <h3>End-of-Course Outcomes</h3>
                      <ul className="detail-list two-col">
                        {course.endOfCourseOutcomes.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Student fit */}
                  {course.studentFit && (
                    <div className="detail-card detail-card-wide">
                      <h3>Student Fit</h3>

                      {Array.isArray(course.studentFit.designedFor) && (
                        <>
                          <p className="detail-subhead">Best for:</p>
                          <ul className="detail-list two-col">
                            {course.studentFit.designedFor.map((x, i) => (
                              <li key={i}>{x}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {Array.isArray(course.studentFit.notAppropriateFor) && (
                        <>
                          <p className="detail-subhead warn">Not a fit if:</p>
                          <ul className="detail-list two-col warn">
                            {course.studentFit.notAppropriateFor.map((x, i) => (
                              <li key={i}>{x}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {course.studentFit.note && (
                        <p className="detail-note">{course.studentFit.note}</p>
                      )}
                    </div>
                  )}

                  {/* Not promised */}
                  {Array.isArray(course.whatThisCourseDoesNotPromise) &&
                    course.whatThisCourseDoesNotPromise.length > 0 && (
                      <div className="detail-card detail-card-wide subtle">
                        <h3>What This Course Does Not Promise</h3>
                        <ul className="detail-list two-col">
                          {course.whatThisCourseDoesNotPromise.map((x, i) => (
                            <li key={i}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              <div className="course-cta-wrap">
                <a href="/contact" className="btn primary course-cta">
                  Enroll in {course.level}
                </a>
                <p className="course-note">
                  Spaces are limited to keep groups small and personalized.
                </p>
              </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CoursesPage;
