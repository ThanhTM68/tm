import React, { useState, useEffect, ChangeEvent } from "react";

// --- Types ---
interface AnimeImage {
  jpg: {
    image_url: string;
    large_image_url: string;
  };
}

interface Anime {
  mal_id: number;
  title: string;
  images: AnimeImage;
  score: number | null;
  synopsis: string;
  year: number | null;
  type: string;
  status: string;
  url: string;
}

interface JikanResponse {
  data: Anime[];
}

const AnimeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce logic: Chờ 500ms sau khi ngừng gõ mới gọi API
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        searchAnime(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const searchAnime = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${text}&limit=12`);
      const data: JikanResponse = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // --- Render chi tiết Anime (Khi click vào) ---
  if (selectedAnime) {
    return (
      <div className="flex flex-col md:flex-row gap-6 p-4 animate-fadeIn text-gray-200">
        <button 
          onClick={() => setSelectedAnime(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          ← BACK TO SEARCH
        </button>
        
        <div className="w-full md:w-1/3 shrink-0">
          <img 
            src={selectedAnime.images.jpg.large_image_url} 
            alt={selectedAnime.title} 
            className="w-full rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-500/30" 
          />
        </div>
        
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
            {selectedAnime.title}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-cyan-300 border border-cyan-500/20">
              {selectedAnime.type}
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-purple-300 border border-purple-500/20">
              {selectedAnime.year || "N/A"}
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-yellow-300 border border-yellow-500/20">
              Score: {selectedAnime.score || "?"}
            </span>
          </div>

          <div className="p-4 bg-black/40 rounded-lg border border-white/5 h-48 overflow-y-auto custom-scrollbar">
            <p className="text-sm leading-relaxed text-gray-300">
              {selectedAnime.synopsis || "No description available."}
            </p>
          </div>

          <a 
            href={selectedAnime.url} 
            target="_blank" 
            rel="noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded hover:from-cyan-500 hover:to-blue-500 text-white font-bold tracking-wider transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            WATCH TRAILER / INFO
          </a>
        </div>
      </div>
    );
  }

  // --- Render giao diện tìm kiếm (Mặc định) ---
  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cyber text-cyan-400 mb-2 tracking-widest">NEURAL ARCHIVES</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto w-full mb-8">
        <input
          type="text"
          placeholder="Input query params (e.g., 'Gundam')..."
          value={query}
          onChange={handleInputChange}
          className="w-full bg-black/40 border border-cyan-500/30 rounded-full px-6 py-3 text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all font-mono"
        />
        {loading && (
          <div className="absolute right-4 top-3.5 w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
        )}
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[500px]">
        {results.map((anime) => (
          <div 
            key={anime.mal_id} 
            onClick={() => setSelectedAnime(anime)}
            className="group relative bg-black/40 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all hover:-translate-y-1"
          >
            <div className="aspect-[2/3] overflow-hidden">
              <img 
                src={anime.images.jpg.image_url} 
                alt={anime.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                {anime.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-gray-400">{anime.year || "UNK"}</span>
                <span className="text-[10px] text-cyan-500 font-mono">MAL-{anime.mal_id}</span>
              </div>
            </div>
          </div>
        ))}
        
        {results.length === 0 && !loading && query.length > 0 && (
          <div className="col-span-full text-center text-gray-500 py-10 font-mono">
            NO DATA FOUND IN ARCHIVES
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeSearch;