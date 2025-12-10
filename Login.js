import React, {useState} from 'react';
import API, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    const res = await API.post('/users/login',{email,password});
    const token = res.data.token;
    setAuthToken(token);
    localStorage.setItem('token', token);
    nav('/');
  }
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /><br/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /><br/>
      <button>Login</button>
    </form>
  );
}
