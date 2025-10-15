// Part 1 — Data Model (seed dataset)
export const seedPosts = [
  {
    id: "p1",
    author: "alice",
    avatar: "https://i.pravatar.cc/100?img=1",
    imageUrl: "https://picsum.photos/id/1015/900/540",
    caption: "Hiking day!",
    likedByMe: false,
    likeCount: 2,
    comments: [{ id: "c1", author: "bob", text: "Nice view!" }],
  },
  {
    id: "p2",
    author: "bob",
    avatar: "https://i.pravatar.cc/100?img=2",
    imageUrl: "https://picsum.photos/id/1025/900/540",
    caption: "Doggo at the beach",
    likedByMe: true,
    likeCount: 5,
    comments: [],
  },
];
