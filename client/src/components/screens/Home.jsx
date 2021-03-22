import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import Card from "../Card";

const Home = (props) => {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setProgress(80);
      fetch("/allposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          // console.log(result.posts)
          setProgress(100);
          setTimeout(() => {
            setData(result.posts.reverse());
          }, 0);
        });
    }
  }, []);
  return (
    <>
      <div className="progress-bar" style={{ width: progress + "%" }}></div>
      {data ? (
        <div className="home">
          {data.map((post) => {
            // console.log(post)
            return (
              <Card
                payload={post}
                key={post._id}
                posts={data}
                setPosts={setData}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
