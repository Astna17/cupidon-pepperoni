import { useState } from 'react'
import './App.css'

function App() {
  const [boysName, setBoysName] = useState('');
  const [girlsName, setGirlsName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateLove = async () => {
    if (!boysName || !girlsName) return alert("Remplis les prénoms !");
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/love', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boysName, girlsName }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Erreur API:", error);
      alert("Le serveur ne répond pas ! Vérifie si le Backend est lancé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Love Meter</h1>
      
      <div className="card">
        <input 
          type="text" 
          placeholder="Nom du garçon" 
          value={boysName}
          onChange={(e) => setBoysName(e.target.value)} 
        />

        <span className="heart-separator"> & </span>

        <input 
          type="text" 
          placeholder="Nom de la fille" 
          value={girlsName}
          onChange={(e) => setGirlsName(e.target.value)}
        />

        <br /><br />

        <button onClick={calculateLove} disabled={loading}>
          {loading ? "Calcul..." : "Entrer"}
        </button>
      </div>

      {result && (
        <div className="result">
          <h2>Score : {result.score}%</h2>
          <p>La probabilité entre {result.boys_name} et {result.girls_name} est de {result.score}% !</p>
        </div>
      )}
    </div>
  )
}

export default App