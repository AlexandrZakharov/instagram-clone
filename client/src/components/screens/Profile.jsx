import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Profile = (props) => {
  const { state, dispath } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/myposts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.post);
      });
  }, []);
  return (
    <div className="profile">
      <div className="profile-wrapper">
        <div className="profile-header">
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src="https://upload.wikimedia.org/wikipedia/ru/4/4c/Neo2.jpg"
              alt="profile-avatar"
            />
          </div>
          <div style={{ marginLeft: "100px" }}>
            <h4>{state.name}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300px",
              }}
            >
              <h6>{posts.length} posts</h6>
              <h6>180 followers</h6>
              <h6>19 following</h6>
            </div>
          </div>
        </div>
        <div className="gallery">
          {posts.map((post) => {
            return (
              <img
                key={post._id}
                className="item"
                src={post.photo}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
