import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function FitBounds({ geoJsonData }) {
    const map = useMap();

    useEffect(() => {
        if (!geoJsonData?.features?.length) {
            return;
        }

        const bounds = L.geoJSON(geoJsonData).getBounds();
        if (!bounds.isValid()) {
            return;
        }

        function fitMap() {
            map.invalidateSize({ pan: false });
            map.fitBounds(bounds, {
                animate: false,
                maxZoom: 16
            });
        }

        fitMap();

        // The breadcrumb and mobile layout can resize the map without a window resize.
        const observer = new ResizeObserver(fitMap);
        observer.observe(map.getContainer());
        return () => observer.disconnect();
    }, [map, geoJsonData]);

    return null;
}

export default FitBounds;
