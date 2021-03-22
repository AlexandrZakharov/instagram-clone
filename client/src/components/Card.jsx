import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Card = (props) => {
  const [likes, setLikes] = useState(props.payload.likes); //All users like
  const [comments, setComments] = useState(props.payload.comments);
  const [commentText, setCommentText] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const like = () => {
    if (!likes.includes(state._id)) {
      setLikes([...likes, state._id]);
      fetch("/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: props.payload._id,
        }),
      });
    } else {
      setLikes([...likes.filter((id) => id !== state._id)]);
      fetch("/unlike", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: props.payload._id,
        }),
      });
    }
  };

  const addComment = () => {
    if (commentText) {
      fetch("/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: props.payload._id,
          text: commentText,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setComments(result.comments);
        });
      setCommentText("");
    }
  };

  const deletePost = () => {
    fetch(`/deletepost/${props.payload._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        props.setPosts([
          ...props.posts.filter((post) => post._id !== props.payload._id),
        ]);
      });
  };

  const deleteComment = (commentId) => {
    fetch(`/deletecomment/${props.payload._id}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setComments([
          ...comments.filter((comment) => commentId !== comment._id),
        ]);
      });
  };

  const linkToProfile = `/profile/${props.payload.postedBy._id}`;
  return (
    <div className="card home-card">
      <div className="card__header">
        <Link to={`/profile/${props.payload.postedBy._id}`}>
          <h5>{props.payload.postedBy.name}</h5>
        </Link>
        {state._id === props.payload.postedBy._id ? (
          <i
            className="material-icons"
            onClick={deletePost}
            style={{ cursor: "pointer" }}
          >
            delete
          </i>
        ) : (
          ""
        )}
      </div>
      <div className="card-image">
        <img src={props.payload.photo} alt="" />
      </div>
      <div className="card-content">
        <i
          className="material-icons"
          style={
            !likes.includes(state._id)
              ? {
                  color: "#000",
                  cursor: "pointer",
                }
              : { color: "red", cursor: "pointer" }
          }
          onClick={like}
        >
          favorite
        </i>
        <h6>{likes.length} likes</h6>
        <h4>{props.payload.title}</h4>
        <p>{props.payload.body}</p>
        <div className="comments">
          {comments.map((comment, i) => {
            return (
              <div className="comment" key={comment.postedBy + i}>
                <img
                  className="comment__avatar"
                  src="https://upload.wikimedia.org/wikipedia/ru/thumb/4/4c/Neo2.jpg/274px-Neo2.jpg"
                  alt=""
                />
                <div className="comment__body">
                  <Link to={`/profile/${comment.postedBy._id}`}>
                    <span className="comment__name">
                      {comment.postedBy.name}
                    </span>
                  </Link>
                  <span className="comment__text">{comment.text}</span>
                </div>
                <span className="comment__date">16 feb 23:57</span>
                {state._id === comment.postedBy._id ? (
                  <i
                    className="material-icons"
                    onClick={() => deleteComment(comment._id)}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      position: "absolute",
                      right: "16px",
                      top: "34px",
                    }}
                  >
                    delete
                  </i>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="btn waves-effect waves-light" onClick={addComment}>
          Add comment
        </button>
      </div>
    </div>
  );
};

export default Card;
