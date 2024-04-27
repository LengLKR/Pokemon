import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

// Components
import FavPoke from './components/FavPoke'

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");
  const [number,setNumber] = useState(1);
  const [fav,setFav] = useState([]);
  useEffect(() => {
    
    let abortController = new AbortController();

    const loadPoke = async () =>{
      try{

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,{
          signal:abortController.signal
        });
      
        setPoke(response.data)
        setError("");

      } catch (error){
        setError("Something went wrong",error);

      }finally{

        setLoading(false);
      }


    }

    loadPoke();
   
    return () => abortController.abort();
 
 
  }, [number])

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1)

  }

  const nextPoke = () => {
    setNumber((number) => number + 1)
  }
  const addFav = () =>{
    setFav((oldState) => [...oldState,poke])
  }

  console.log("Pokemon ID: ",number);
  console.log("You fav pokemon: ", fav)
  return (
    <div>
      <h1>{poke?.name}</h1>
      
      <br />
      {poke && (
        <img src={poke.sprites?.other?.home?.front_default} alt={poke.name} />
      )}
  
      {poke && (
        <ul>
          {poke.abilities.map((abil, idx) => (
            <b><li key={idx}> {abil.ability.name} </li></b>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <button onClick={prevPoke}>Previous</button>
      <button onClick={nextPoke}>Next</button>
      <div>
      
        <FavPoke fav={fav} />
      </div>
    </div>
  );
}

export default App 
