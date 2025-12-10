import React, {useEffect, useState} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function PropertyList(){
  const [props, setProps] = useState([]);
  useEffect(()=> {
    API.get('/properties').then(r=> setProps(r.data)).catch(console.error);
  },[]);
  return (
    <div>
      <h2>Properties</h2>
      {props.length===0 && <p>No properties yet.</p>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
        {props.map(p=> (
          <div key={p.id} style={{border:'1px solid #ddd',padding:10,borderRadius:6}}>
            <img src={p.PropertyImages?.[0]?.url || '/placeholder.png'} alt="" style={{width:'100%',height:160,objectFit:'cover'}} />
            <h3>{p.title}</h3>
            <p>₹{p.price} • {p.bedrooms} BHK</p>
            <Link to={`/property/${p.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
