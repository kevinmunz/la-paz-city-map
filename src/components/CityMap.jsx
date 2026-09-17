import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import FitBounds from "./FitBounds";

function CityMap({
    currentGeoJson,
    fitBoundsGeoJson,
    geoJsonKey,
    onEachFeature,
    getFeatureStyle
}) {
    return (
        <section className="map-container">
            <MapContainer
                center={[-16.5, -68.15]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds geoJsonData={fitBoundsGeoJson} />

                <GeoJSON
                    key={geoJsonKey}
                    data={currentGeoJson}
                    onEachFeature={onEachFeature}
                    style={getFeatureStyle}
                />
            </MapContainer>
        </section>
    );
}

export default CityMap;