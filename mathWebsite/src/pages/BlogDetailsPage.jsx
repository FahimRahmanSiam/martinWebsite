import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs.json";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="main-content">
        <p>Blog not found.</p>
        <Link to="/blog" className="detail-back-link">
          ← Back to all posts
        </Link>
      </div>
    );
  }

  // split content by line breaks into paragraphs
  const paragraphs = post.content.split("\n").filter(Boolean);

  return (
    <div className="main-content detail-wrapper" data-aos="zoom-in" data-aos-delay="150">
      <Link to="/blog" className="detail-back-link">
        ← Back to blog
      </Link>

      <article className="detail-article">
        <p className="detail-category">{post.category}</p>
        <h1 className="detail-title">{post.title}</h1>
        <p className="detail-meta">
          {post.author} • {post.date} • {post.readTime} • {post.tag}
        </p>

        <div className="detail-hero">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="detail-body">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
