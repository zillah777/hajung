'use client';

import React from 'react';

const images = [
  '20241109_192022.jpg',
  '20250329_181930.jpg',
  '5e6d545e-5f75-4e13-923e-5905909e2218.jpeg',
  '900x660.jpg',
  '997eafe3-6a84-4711-9806-ddfa02f0fa6f.jpeg',
  'df876bd1-1fe9-4245-bd3e-683b1a3df60c.jpeg',
  'upload_03204b243b4bf6159d0a91e7129d5f44.jpeg',
  'upload_0fa78be00bb97837fc8341f441acef52.jpeg',
  'upload_1fc1fc67c6c3757b2b1321fb38bed9ca.jpg',
  'upload_3400f3b0099552460c46f64f566b2fed.jpg',
  'upload_37a599e8493aa710f669bab3644a3453.jpeg',
  'upload_6fbb77e91c191287de50d69042b5b83c.jpeg',
  'upload_8961bb7fd5950f2e09400c3cc7d4fb44.jpg',
  'upload_8d0d8e64498bfa646bb20e0b8989103a.jpeg',
  'upload_8e356c423ecc95a803e0318118ac0231.jpeg',
  'upload_c7336c8f4ea14cd51af7dd212da745b9.jpeg',
  'upload_cf4cb341d210dd03978a87b9cdddda3f.jpeg',
  'upload_ed5a0e3cb8430995e0af77bd8208e407.jpg'
];

export default function TempGallery() {
  return (
    <div style={{ padding: '20px', background: '#fff', color: '#000' }}>
      <h1>Hajung Pics Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {images.map((img) => (
          <div key={img} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3 style={{ wordBreak: 'break-all' }}>{img}</h3>
            <img
              src={`/images/hajung/${img}`}
              alt={img}
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
