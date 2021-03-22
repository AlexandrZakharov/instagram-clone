import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

const UserProfile = (props) => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  
  const { state, dispatch } = useContext(UserContext);
  console.log(state);
  useEffect(() => {
    fetch(`/user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfileData(result);
      });
  }, [userId]);

  const onFollow = () => {
    fetch(
      `/${
        profileData.user.followers.includes(state._id) ? "unfollow" : "follow"
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id: profileData.user._id,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setProfileData({
          ...profileData,
          user: result
        });
        // if(userId !== state._id) {
        //   dispatch({type: 'UPDATE', payload: {
        //     followers: result.followers,
        //     following: result.following,
        //   }})
        //   localStorage.setItem("user", JSON.stringify(state))
        // }
        
      });
  };

  return (
    <div className="profile">
      {profileData ? (
        <div className="profile-wrapper">
          <div className="profile-header" style={{ position: "relative" }}>
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://upload.wikimedia.org/wikipedia/ru/4/4c/Neo2.jpg"
                alt="profile-avatar"
              />
            </div>
            <div style={{ marginLeft: "100px" }}>
              <h4>{profileData.user.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "300px",
                }}
              >
                <h6>{profileData.posts.length} posts</h6>
                <h6>{profileData.user.followers.length} followers</h6>
                <h6>{profileData.user.following.length} following</h6>
              </div>
            </div>
            {userId !== state._id ? (
              <button
                className="btn waves-effect waves-light"
                onClick={onFollow}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "230px",
                }}
              >
                {profileData.user.followers.includes(state._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="gallery">
            {profileData.posts.map((post) => {
              return (
                <img key={post._id} className="item" src={post.photo} alt="" />
              );
            })}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default UserProfile;
