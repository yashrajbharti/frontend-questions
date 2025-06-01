export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
}) {
  return <div className="skeleton" style={{ width, height, borderRadius }} />;
}

/* Add this in your global CSS or in a styled component */

// .skeleton {
//   background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
//   background-size: 200% 100%;
//   animation: shimmer 1.5s infinite;
// }

// @keyframes shimmer {
//   0% {
//     background-position: -200% 0;
//   }
//   100% {
//     background-position: 200% 0;
//   }
// }


// import Skeleton from "./Skeleton";

export default function ProfileCard({ loading, user }) {
  return (
    <div style={{ width: 300, padding: 16, border: "1px solid #ccc" }}>
      {loading ? (
        <>
          <Skeleton width="100%" height="200px" borderRadius="8px" />
          <Skeleton width="60%" height="1.2rem" style={{ marginTop: 16 }} />
          <Skeleton width="80%" height="1rem" style={{ marginTop: 8 }} />
        </>
      ) : (
        <>
          <img src={user.avatar} width="100%" height="200" style={{ borderRadius: 8 }} />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </>
      )}
    </div>
  );
}
