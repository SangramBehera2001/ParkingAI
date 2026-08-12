import { useEffect, useState } from "react";

const LiveLocationCard = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        console.log("Location permission denied");
      },
    );
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800">📍 Live Location</h2>

      {location ? (
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          <p>
            <b>Latitude:</b> {location.lat}
          </p>

          <p>
            <b>Longitude:</b> {location.lng}
          </p>

          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Open in Maps
          </a>
        </div>
      ) : (
        <p className="mt-3 text-gray-500 text-sm">Fetching live location...</p>
      )}
    </div>
  );
};

export default LiveLocationCard;
