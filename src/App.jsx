import { useState } from "react";

import Breadcrumb from "./components/Breadcrumb";
import CityMap from "./components/CityMap";
import InfoPanel from "./components/InfoPanel";

import "leaflet/dist/leaflet.css";

import macrodistricts from "./data/macrodistricts.geo.json";
import districts from "./data/districts.geo.json";
import zones from "./data/zones.geo.json";

import "./App.css"

function App() {

    function handleEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.name);

        layer.on({
            mouseover: () => {
                layer.setStyle({
                    weight: 3,
                    fillOpacity: 0.5
                });
            },

            mouseout: () => {
                layer.setStyle(getFeatureStyle(feature));
            },

            click: () => {
                if (level === "macrodistrict") {
                    selectMacrodistrict(feature);
                }

                if (level === "district") {
                    selectDistrict(feature);
                }

                if (level === "zone") {
                    selectZone(feature);
                }
            }
        });
    }

    function getFeatureStyle(feature) {
        let isSelected = false;

        if (level === "macrodistrict") {
            isSelected =
                selectedMacrodistrict?.id === feature.properties.id;
        }

        if (level === "district") {
            isSelected =
                selectedDistrict?.id === feature.properties.id;
        }

        if (level === "zone") {
            isSelected =
                selectedZone?.id === feature.properties.id;
        }

        if (isSelected) {
            return {
                color: "#2563eb",
                weight: 4,
                fillColor: "#3b82f6",
                fillOpacity: 0.55
            };
        }

        return {
            color: "#475569",
            weight: 2,
            fillColor: "#94a3b8",
            fillOpacity: 0.35
        };
    }

    const [selectedMacrodistrict, setSelectedMacrodistrict] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [level, setLevel] = useState("macrodistrict");

    const selectedDistricts = selectedMacrodistrict
        ? districts.features.filter(
            (district) =>
                district.properties.parentId === selectedMacrodistrict.id
        )
        : [];

    const selectedZones = selectedDistrict
        ? zones.features.filter(
            (zone) =>
                zone.properties.parentId === selectedDistrict.id
        )
        : [];

    let currentGeoJson;

    if (level === "macrodistrict") {
        currentGeoJson = macrodistricts;
    }

    if (level === "district") {
        currentGeoJson = {
            type: "FeatureCollection",
            features: selectedDistricts
        };
    }

    if (level === "zone") {
        currentGeoJson = {
            type: "FeatureCollection",
            features: selectedZones
        };
    }

    let fitBoundsGeoJson = currentGeoJson;

    if (selectedZone) {
        const selectedZoneFeature = zones.features.find(
            (zone) => zone.properties.id === selectedZone.id
        );

        if (selectedZoneFeature) {
            fitBoundsGeoJson = {
                type: "FeatureCollection",
                features: [selectedZoneFeature]
            };
        }
    }

    function selectMacrodistrict(macrodistrict) {
        setSelectedMacrodistrict(macrodistrict.properties);
        setSelectedDistrict(null);
        setSelectedZone(null);
        setLevel("district");
    }

    function selectZone(zone) {
        setSelectedZone(zone.properties);
    }

    function selectDistrict(district) {
        setSelectedDistrict(district.properties);
        setSelectedZone(null);
        setLevel("zone");
    }

    function goToMacrodistricts() {
        setLevel("macrodistrict");

        setSelectedMacrodistrict(null);
        setSelectedDistrict(null);
        setSelectedZone(null);
    }

    function goToMacrodistrict() {
        setLevel("district");

        setSelectedDistrict(null);
        setSelectedZone(null);
    }

    function goToDistrict() {
        setLevel("zone");
        setSelectedZone(null);
    }

    function handleBack() {
        if (selectedZone) {
            goToDistrict();
        } else if (selectedDistrict) {
            goToMacrodistrict();
        } else if (selectedMacrodistrict) {
            goToMacrodistricts();
        }
    }

    return (
        <div className="app">
            <header className="header">
                <div>
                    <h1>La Paz Interactive City Map</h1>
                    <p>Explore the administrative divisions of La Paz, Bolivia</p>
                </div>
            </header>
            <Breadcrumb
                selectedMacrodistrict={selectedMacrodistrict}
                selectedDistrict={selectedDistrict}
                selectedZone={selectedZone}
                onGoToMacrodistricts={goToMacrodistricts}
                onGoToMacrodistrict={goToMacrodistrict}
                onGoToDistrict={goToDistrict}
            />
            <main className="main">
                <CityMap
                    currentGeoJson={currentGeoJson}
                    fitBoundsGeoJson={fitBoundsGeoJson}
                    geoJsonKey={`${level}-${selectedMacrodistrict?.id ?? "none"}-${selectedDistrict?.id ?? "none"}-${selectedZone?.id ?? "none"}`}
                    onEachFeature={handleEachFeature}
                    getFeatureStyle={getFeatureStyle}
                />
                <InfoPanel
                    macrodistricts={macrodistricts.features}
                    onSelectMacrodistrict={selectMacrodistrict}
                    selectedMacrodistrict={selectedMacrodistrict}
                    selectedDistrict={selectedDistrict}
                    selectedZone={selectedZone}
                    selectedDistricts={selectedDistricts}
                    selectedZones={selectedZones}
                    onBack={handleBack}
                    onSelectDistrict={selectDistrict}
                    onSelectZone={selectZone}
                />
            </main>
        </div>
    );
}

export default App
