import type { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <article className="blog-post">
      <button onClick={onBack} className="back-button">
        ← Back to All Posts
      </button>
      <header className="post-header">
        <h1>{post.title}</h1>
        <time className="post-date">{new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</time>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </header>
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => {
          if (paragraph.startsWith('![')) {
            // Handle markdown images: ![alt text](url)
            const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
              const [, alt, src] = match;
              return <img key={index} src={src} alt={alt} className="post-image" />;
            }
          } else if (paragraph.startsWith('# ')) {
            return <h1 key={index}>{paragraph.substring(2)}</h1>;
          } else if (paragraph.startsWith('## ')) {
            return <h2 key={index}>{paragraph.substring(3)}</h2>;
          } else if (paragraph.startsWith('### ')) {
            return <h3 key={index}>{paragraph.substring(4)}</h3>;
          } else if (paragraph.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index}>{paragraph}</p>;
          }
        })}
      </div>
    </article>
  );
}
