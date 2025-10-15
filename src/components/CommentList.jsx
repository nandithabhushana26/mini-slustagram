export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p style={{ opacity: 0.7 }}>Be the first to comment.</p>;
  }
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
      {comments.map((c) => (
        <li key={c.id} style={{ marginBottom: 6 }}>
          <strong>@{c.author}</strong> {c.text}
        </li>
      ))}
    </ul>
  );
}
