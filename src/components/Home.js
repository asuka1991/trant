import { useState } from "react";
import api from "../api/index";

export default function Home() {
  let [form, setForm] = useState({});

  const onPostMess = () => {
    api.post(`/api/chats`, { ...form }).then(res => {
      console.log(res);
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  return (
    <div className="box-chat">
      <input
        className="text-lg"
        id="content"
        type="text"
        placeholder="Content"
        onChange={handleChange}
      />
      <input
        className="text-lg"
        id="userId"
        type="text"
        placeholder="UserId"
        onChange={handleChange}
      />
      <button onClick={onPostMess}>
        Update
      </button>
    </div>
  )
}
