import "./App.css";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, DELETE_POST } from "./GraphQL/Mutation";
import { getALL } from "./GraphQL/Query";
import { useState } from "react";
function App() {
  const { loading, error, data } = useQuery(getALL);
  const [createPost, { err }] = useMutation(CREATE_POST);
  const [deletePost, { errr }] = useMutation(DELETE_POST);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  if (loading) return "Loading";
  const addPost = () => {
    createPost({
      variables: {
        title: title,
        description: description,
      },
    });
  };
  const removePost = (id) => {
    deletePost({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div className="App">
      {data.getAll.map((data) => (
        <>
        <div className="data">
          <p key={data.title}>
            <strong>TITLE : </strong>{data.title}<br></br>
            <strong>DESCRIPTION : </strong>{data.description}
          </p>
          <button onClick={() => removePost(data.id)}> Delete it </button>
          </div>
        </>
        
      ))}
      <br />
      <div className="post">
      <strong>TITLE ---</strong><input onChange={(e) => setTitle(e.target.value)} />
      <br />
      <strong>DESCRIPTION ---</strong>
      <input onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button onClick={() => addPost()}>Add Post</button>
      </div>
      </div>
  );
}

export default App;
