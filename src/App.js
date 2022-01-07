import axios from "axios";
import  { useEffect, useState } from "react";
export default function App() {
  return(
    <>
    <MyComponent />
    </>
  );
}
function MyComponent() {
  const[messages,setMessages] = useState("");
  const[list,setList] = useState("");

  const handleMessagesChange = (e) =>{
    setMessages(e.target.value);
  }
const sendMessages = async () =>{
  const url ="http://localhost:4000/send-messages";
  const data ={
    messages:messages,
  };

  await axios.post(url,data);

  const newList = [data, ...list];
  setList(newList);

  setMessages("");
};

const getMessages = async () =>{
  const url = "http://localhost:4000/messages";
  const result = await axios.get(url);
  const list = result.data;
  const newList =[...list];
  setList(newList);
}

useEffect(() => getMessages(),[]);

  return(
    <div>
    <div className="container-fluid bg-success">
      <h2 className="bg-dark text-light p-3">MyChatApp<h5>045_Harshad Kale_kh </h5></h2> 
    </div>
      <div>
      <input className="form-control form-control-lg mb-1" type="text" value={messages} onChange={handleMessagesChange} placeholder="lets chat here" />
      <input className="btn btn-green w-100" type="button" value="send" onClick={sendMessages} />
      </div>
    
    {
      list.map((item,index) =>(
        <div key={index} className="alert border border secondary fs-3">
          {item.messages}
        </div>
      ))
    }
    </div>
  );
}

