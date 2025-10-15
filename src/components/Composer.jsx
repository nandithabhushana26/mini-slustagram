import { useState } from "react";

// Controlled form that prepends a new post to the feed.
// Validation allows normal image extensions OR known image CDNs (which often omit extensions).
export default function Composer({ setPosts, me = "you" }) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  function urlLooksOk(url) {
    if (!url) return false;
    try {
      const u = new URL(url);
      if (!/^https?:$/.test(u.protocol)) return false;

      const path = u.pathname || "";
      const hasExt = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i.test(
        path + (u.search || "")
      );

      // Permit common image CDNs without extensions
      const knownImageHost = /(unsplash|gstatic|imgur|picsum|pexels|wikimedia|googleusercontent|fbcdn)/i
        .test(u.hostname);

      return hasExt || knownImageHost;
    } catch {
      return false;
    }
  }

  function submit(e) {
    e.preventDefault();
    const url = imageUrl.trim();
    if (!urlLooksOk(url)) return;

    const post = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "p" + Date.now(),
      author: me,
      avatar: "https://i.pravatar.cc/100?u=" + encodeURIComponent(me),
      imageUrl: url,
      caption: caption.trim(),
      likedByMe: false,
      likeCount: 0,
      comments: [],
    };

    setPosts((prev) => [post, ...prev]);
    setImageUrl("");
    setCaption("");
  }

  const valid = urlLooksOk(imageUrl);

  return (
    <form
      onSubmit={submit}
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        margin: "16px 0",
        background: "white",
      }}
      aria-label="Create post form"
      className="composer"
    >
      <h3 style={{ marginTop: 0 }}>Create Post</h3>

      <input
        aria-label="Image URL"
        placeholder="https://example.com/photo.jpg (Unsplash/Imgs/Picsum OK)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <input
        aria-label="Caption (optional)"
        placeholder="Write a caption…"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ width: "100%" }}
      />

      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={!valid} aria-disabled={!valid}>
          Share
        </button>
      </div>

      {!valid && imageUrl && (
        <p style={{ marginTop: 6, fontSize: 13, color: "#777" }}>
          Tip: URLs with <code>.jpg/.png/.webp</code> work, and common image CDNs
          (Unsplash, gstatic, picsum, imgur, pexels, wikimedia) are allowed even
          without an extension.
        </p>
      )}
    </form>
  );
}
