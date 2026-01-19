import type { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export function BlogList({ posts, onSelectPost }: BlogListProps) {
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="blog-list">
      <header className="blog-header">
        <h1>My Blog</h1>
        <p className="blog-subtitle">Thoughts, stories, and ideas</p>
      </header>
      <div className="posts-grid">
        {sortedPosts.map(post => (
          <article 
            key={post.id} 
            className="post-card"
            onClick={() => onSelectPost(post)}
          >
            <h2 className="post-card-title">{post.title}</h2>
            <time className="post-card-date">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <p className="post-card-excerpt">{post.excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="post-card-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <span className="read-more">Read more →</span>
          </article>
        ))}
      </div>
    </div>
  );
}
