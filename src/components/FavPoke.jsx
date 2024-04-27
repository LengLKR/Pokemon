import React from 'react';

function FavPoke({ fav }) {
  return (
    /*
    <div>
        <p>fav called</p>
    </div>
    */
    
    <div>
      
      {fav?.map((data, idx) => (
        <div key={idx}>
          <h3>YEET </h3> 
        </div>
      ))}
    </div>
    
  );
}

export default FavPoke;