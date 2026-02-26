import { Link } from "react-router-dom";
import blogs from "../data/blogs.json";

export default function BlogPage() {
  const featuredPost = blogs.find((post) => post.featured);
  const trendingPosts = blogs.filter((post) => !post.featured);

  return (
    <div className="blog-page">
      {/* LEFT – FEATURED */}
      <article className="blog-featured-card" data-aos="fade-down">
        <Link to={`/blog/${featuredPost.slug}`} className="blog-click-overlay">
          <div className="blog-featured-imageWrap">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="blog-featured-image" data-aos="fade-down"
            />
          </div>

          <div className="blog-featured-content">
            <p className="blog-chip blog-chip--brand">
              {featuredPost.category || "Blog"}
            </p>
            <h1 className="blog-featured-title">{featuredPost.title}</h1>
            <p className="blog-featured-description">
              {featuredPost.description}
            </p>

            <div className="blog-featured-meta">
              <div className="blog-avatar">
                {featuredPost.author.charAt(0)}
              </div>
              <div>
                <p className="blog-author">{featuredPost.author}</p>
                <p className="blog-metaText">
                  {featuredPost.date} • {featuredPost.readTime} •{" "}
                  <span className="blog-tag">{featuredPost.tag}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </article>

      {/* RIGHT – TRENDING */}
      <aside className="blog-sidebar" data-aos="fade-right">
        <section className="blog-sidebar-header">
          <h2>I like to share my stories</h2>
          <p>Open your door for knowledge</p>
        </section>

        <div className="blog-sidebar-list">
          {trendingPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-sidebar-item"
            >
              <div className="blog-sidebar-thumbWrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-sidebar-thumb"
                />
              </div>
              <div className="blog-sidebar-info">
                <h3 className="blog-sidebar-title">{post.title}</h3>
                <p className="blog-sidebar-meta">
                  {post.date} • {post.readTime}
                </p>
                <span className="blog-chip">{post.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
