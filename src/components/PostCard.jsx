import { useCallback } from "react";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='540'>
       <rect width='100%' height='100%' fill='#f2f2f2'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
             font-family='system-ui,Arial' font-size='20' fill='#888'>
         Image failed to load
       </text>
     </svg>`
  );

export default function PostCard({ post, setPosts }) {
  const toggleLike = useCallback(() => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== post.id) return p;
        const likedByMe = !p.likedByMe;
        const likeCount = p.likeCount + (likedByMe ? 1 : -1);
        return { ...p, likedByMe, likeCount };
      })
    );
  }, [post.id, setPosts]);

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
        margin: "16px 0",
        background: "white",
      }}
      aria-label={`post by ${post.author}`}
      className="post-card"
    >
      <header style={{ display: "flex", alignItems: "center", gap: 8, padding: 12 }}>
        <img
          src={post.avatar}
          alt={`${post.author} avatar`}
          width="44"
          height="44"
          style={{ borderRadius: "50%" }}
        />
        <strong>
          <Link
            to={`/u/${post.author}`}
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label={`View @${post.author}'s profile`}
          >
            @{post.author}
          </Link>
        </strong>
      </header>

      <img
        src={post.imageUrl}
        alt={post.caption ? post.caption : `Photo by @${post.author}`}
        className="post-image"
        style={{ width: "100%", display: "block" }}
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMG;
        }}
      />

      <div style={{ padding: 12 }}>
        <div className="like-section">
          <button
            onClick={toggleLike}
            aria-pressed={post.likedByMe}
            aria-label={post.likedByMe ? "Unlike" : "Like"}
            title={post.likedByMe ? "Unlike" : "Like"}
          >
            {post.likedByMe ? "❤️" : "🤍"}
          </button>
          <span>{post.likeCount} {post.likeCount === 1 ? "like" : "likes"}</span>
        </div>

        {post.caption && (
          <p className="caption" style={{ marginTop: 8 }}>
            <strong>@{post.author}</strong> {post.caption}
          </p>
        )}

        <CommentList comments={post.comments ?? []} />
        <CommentForm postId={post.id} setPosts={setPosts} />
      </div>
    </article>
  );
}
