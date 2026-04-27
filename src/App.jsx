import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);

    async function searchLyrics() {
        if (artist.trim() === "" || song.trim() === "") {
            alert("Please enter both Artist and Song name.");
            return;
        }

        setLoading(true);
        setLyrics(""); 

        try {
            const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
            const res = await Axios.get(url);
            setLyrics(res.data.lyrics || "No lyrics found for this track.");
        } catch (err) {
            setLyrics("The server is busy or lyrics weren't found. Try again!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">
            <div className="glass-card">
                <header>
                    <h1>Lyric<span>Finder</span></h1>
                    <p>Find your favorite song lyrics instantly</p>
                </header>

                <div className="search-container">
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Artist Name'
                            onChange={(e) => setArtist(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Song Title'
                            onChange={(e) => setSong(e.target.value)} 
                        />
                    </div>
                    <button className="search-btn" onClick={searchLyrics} disabled={loading}>
                        {loading ? <div className="spinner"></div> : <><HiOutlineMagnifyingGlassCircle size={22} /> Search</>}
                    </button>
                </div>

                {lyrics && (
                    <div className="results-area">
                        <hr />
                        <pre className="lyrics-text">{lyrics}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;