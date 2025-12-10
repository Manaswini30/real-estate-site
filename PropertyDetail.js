import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
export default function PropertyDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=> {
    API.get(`/properties/${id}`).then(r=> setP(r.data)).catch(console.error);
  },[id]);
  if(!p) return <div>Loading...</div>;
  return (
    <div>
      <h2>{p.title}</h2>
      <div style={{display:'flex',gap:12}}>
        <div style={{flex:1}}>
          <img src={p.PropertyImages?.[0]?.url || '/placeholder.png'} alt="" style={{width:'100%'}} />
        </div>
        <div style={{flex:1}}>
          <p><b>Price</b>: ₹{p.price}</p>
          <p><b>Bedrooms</b>: {p.bedrooms}</p>
          <p>{p.description}</p>
          <p><b>Address</b>: {p.address}, {p.city}</p>
        </div>
      </div>
    </div>
  );
}
