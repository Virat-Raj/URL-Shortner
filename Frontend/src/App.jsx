import React from 'react';
import { useState } from 'react';
import axios from "axios";
import CopyButton from '../Components/Copy-Button';

function App() {
  const [title, setTitle] = useState('');
  const [backendResponse, setBackendResponse] = useState('');
  const shortUrl = backendResponse ? `${window.location.origin}/api/${backendResponse}` : '';

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const url = title.trim();
    if (!url) return;

    try{
      const response= await axios.post("/api/",{
        url
      })
      const newLink = `${response.data.id}`;
      setBackendResponse(newLink);
      setTitle("")
    }
    catch(error){
      console.error("error communicating with the backend", error)
    }

  }

  return (
    <div className='w-full h-screen flex flex-col items-center gap-[15%]'>
      <div><h1 className='text-4xl  font-bold font-serif'>URL Shortner</h1></div>
      <div className='w-[75%] h-100 bg-zinc-300 rounded text-2xl font-bold flex flex-col items-center gap-[10%] shadow-xl/20'>
        <h1 >Give us your URLs and we will Short it for You </h1>
        <div>
          <form onSubmit={(e)=>{
            handleSubmit(e)
          }}>
            <input placeholder='Enter your URL here ...'type="text" className='mr-8 h-9 border-sky-200' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <button className='w-30 h-9 bg-zinc-500 text-white rounded cursor-pointer' >Submit </button>
          </form>
        </div>
          {backendResponse && (
            <a
              href={`/api/${backendResponse}`}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-500 h-10 rounded m-3.5 p-1 hover:text-zinc-500 font-bold mt-7'
            >
             Your Shorted Link
            </a>
          )}
          {backendResponse && (
            <CopyButton textToCopy={shortUrl} />
          )}
        </div>
      </div>
  )
}

export default App
