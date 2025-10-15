import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { seedPosts } from "./data/posts";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Composer from "./components/Composer";
import Profile from "./components/Profile";

const STORAGE_KEY = "mini-insta-posts";

export default function App() {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : seedPosts;
    } catch {
      return seedPosts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {}
  }, [posts]);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Composer setPosts={setPosts} />
                <Feed posts={posts} setPosts={setPosts} />
              </>
            }
          />
          <Route
            path="/u/:handle"
            element={<Profile posts={posts} setPosts={setPosts} />}
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </main>
      <p className="footer-note">Built for CSCI-4360/5360 • SLU-stagram</p>
    </>
  );
}
