import { Routes, Route } from 'react-router-dom'
import './App.css'
import { BlogList } from './components/BlogList'
import { BlogPost as BlogPostComponent } from './components/BlogPost'
import type { BlogPost as BlogPostType } from './types/blog'
import postsData from './data/posts.json'
import { useParams, useNavigate } from 'react-router-dom'

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const posts = postsData as BlogPostType[];
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <div className="app">Post not found</div>;
  }

  return (
    <div className="app">
      <BlogPostComponent 
        post={post} 
        onBack={() => navigate('/')} 
      />
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const posts = postsData as BlogPostType[];

  return (
    <div className="app">
      <BlogList 
        posts={posts} 
        onSelectPost={(post) => navigate(`/post/${post.id}`)} 
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  )
}

export default App
