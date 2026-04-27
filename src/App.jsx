import './App.css';
import { useState } from 'react';
import { fetchLyrics } from './client/api';
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);

    const searchLyrics = async () => {
        if (!artist.trim() || !song.trim()) {
            alert("Please enter both Artist and Song name.");
            return;
        }

        setLoading(true);
        setLyrics("");

        try {
            const res = await fetchLyrics(artist, song);
            setLyrics(res.data.lyrics);
        } catch (err) {
            console.error(err);
            setLyrics("Server error or lyrics not found.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="glass-card">
                <header>
                    <h1>Lyric<span>Finder</span></h1>
                    <p>Find your favorite song lyrics instantly</p>
                </header>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Artist Name"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Song Title"
                        value={song}
                        onChange={(e) => setSong(e.target.value)}
                    />

                    <button onClick={searchLyrics} disabled={loading}>
                        {loading ? "Loading..." : <><HiOutlineMagnifyingGlassCircle size={20} /> Search</>}
                    </button>
                </div>

                {lyrics && (
                    <div className="results-area">
                        <pre>{lyrics}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;