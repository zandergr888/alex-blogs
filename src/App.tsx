import { useState } from 'react'
import './App.css'
import { BlogList } from './components/BlogList'
import { BlogPost as BlogPostComponent } from './components/BlogPost'
import type { BlogPost as BlogPostType } from './types/blog'
import postsData from './data/posts.json'

function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const posts = postsData as BlogPostType[];

  return (
    <div className="app">
      {selectedPost ? (
        <BlogPostComponent 
          post={selectedPost} 
          onBack={() => setSelectedPost(null)} 
        />
      ) : (
        <BlogList 
          posts={posts} 
          onSelectPost={setSelectedPost} 
        />
      )}
    </div>
  )
}

export default App
