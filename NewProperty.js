import React, {useState} from 'react';
import API from '../api';
export default function NewProperty(){
  const [title,setTitle]=useState('');
  const [price,setPrice]=useState('');
  const [images,setImages]=useState(null);

  async function submit(e){
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('price', price);
    if(images) for(let i=0;i<images.length;i++) form.append('images', images[i]);
    await API.post('/properties', form, { headers: {'Content-Type': 'multipart/form-data'}});
    alert('Created');
  }
  return (
    <form onSubmit={submit}>
      <h2>Add Property</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" /><br/>
      <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="price" /><br/>
      <input type="file" multiple onChange={e=>setImages(e.target.files)} /><br/>
      <button>Add</button>
    </form>
  );
}
