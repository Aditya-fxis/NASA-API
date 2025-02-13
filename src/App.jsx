import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showHD, setShowHD] = useState(false);
  // VITE_NASA_API_KEY=1iEgcMCEfaPeZ9dCbKkz4a9EvZrcgfVTOd8uuoBR
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load NASA's Astronomy Picture of the Day.");
      });
  }, []);

  if (error) {
    return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  }

  if (!data) {
    return <h2 className="text-white text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-5">
      <div className="max-w-3xl bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-400">{data.date}</p>
        <p className="text-sm text-gray-300 mb-4">Media Type: {data.media_type}</p>

        {data.media_type === "image" ? (
          <>
            <img
              src={data.url}
              alt={data.title}
              className="w-full rounded-lg shadow-md mb-4 cursor-pointer hover:opacity-80 transition"
              onClick={() => setShowHD(true)}
            />
            {data.hdurl && (
              <p className="text-sm text-blue-400 cursor-pointer" onClick={() => setShowHD(true)}>
                View HD Image
              </p>
            )}
          </>
        ) : (
          <iframe
            title={data.title}
            src={data.url}
            className="w-full h-64 rounded-lg shadow-md"
            allowFullScreen
          ></iframe>
        )}

        <p className="text-sm text-gray-300">
          <strong>Copyright:</strong> {data.copyright || "Unknown"}
        </p>
        <p className="text-sm text-gray-300 mb-4">
          <strong>Service Version:</strong> {data.service_version}
        </p>

        <p className="text-gray-200 text-left">{data.explanation}</p>
      </div>

      {/* HD Image Modal */}
      {showHD && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-5">
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded cursor-pointer"
              onClick={() => setShowHD(false)}
            >
              Close
            </button>
            <img
              src={data.hdurl}
              alt="HD NASA APOD"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



// {
//   "copyright": "Roberto Marinoni",
//   "date": "2025-02-13",
//   "explanation": "Riding high in the constellation of Auriga, beautiful, blue VdB 31 is the 31st object in Sidney van den Bergh's 1966 catalog of reflection nebulae. It shares this well-composed celestial still life with dark, obscuring clouds B26, B27, and B28, recorded in Edward E. Barnard's 1919 catalog of dark markings in the sky. All are these nebulae are interstellar dust clouds. Barnard's dark nebulae block the light from background stars. For VdB 31 the dust preferentially reflects bluish starlight from embedded, hot, variable star AB Aurigae. Exploring the environs of AB Aurigae with the Hubble Space Telescope has revealed the several million year young star is itself surrounded by a flattened dusty disk with evidence for the ongoing formation of a planetary system. AB Aurigae is about 470 light-years away. At that distance this cosmic canvas would span about eight light-years.",
//   "hdurl": "https://apod.nasa.gov/apod/image/2502/Vdb31_Astrobin2048.jpg",
//   "media_type": "image",
//   "service_version": "v1",
//   "title": "Reflections on VdB 31",
//   "url": "https://apod.nasa.gov/apod/image/2502/Vdb31_Astrobin1024.jpg"
// }