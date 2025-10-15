import { useState } from "react";

export default function CommentForm({ postId, setPosts, me = "you" }) {
  const [text, setText] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;

    const newComment = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      author: me,
      text: t,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return { ...p, comments: [...(p.comments ?? []), newComment] };
      })
    );

    setText("");
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginTop: 10 }}>
      <input
        aria-label="Add a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        style={{ flex: 1 }}
      />
      <button type="submit">Post</button>
    </form>
  );
}
