import { useEffect, useRef } from "react";

function InfoPanel({
    macrodistricts,
    onSelectMacrodistrict,
    selectedMacrodistrict,
    selectedDistrict,
    selectedZone,
    selectedDistricts,
    selectedZones,
    onBack,
    onSelectDistrict,
    onSelectZone
}) {
    const titleRef = useRef(null);
    const shouldFocusTitle = useRef(false);

    useEffect(() => {
        if (shouldFocusTitle.current) {
            titleRef.current?.focus();
            shouldFocusTitle.current = false;
        }
    }, [selectedMacrodistrict?.id, selectedDistrict?.id, selectedZone?.id]);

    function navigate(action, feature) {
        // List buttons disappear after navigation; keep keyboard focus in the panel.
        shouldFocusTitle.current = true;
        action(feature);
    }

    return (
        <aside className="info-panel">
            {selectedZone ? (
                <>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate(onBack)}
                    >
                        <span aria-hidden="true">←</span>
                        <span>Back</span>
                    </button>

                    <p className="info-type">Zone</p>

                    <h2 className="info-title" ref={titleRef} tabIndex={-1}>
                        {selectedZone.name}
                    </h2>

                    <div className="info-stats">
                        <div className="info-stat">
                            <span className="info-stat-label">Area</span>
                            <span className="info-stat-value">
                                {selectedZone.areaKm2.toFixed(2)} km²
                            </span>
                        </div>
                    </div>
                </>
            ) : selectedDistrict ? (
                <>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate(onBack)}
                    >
                        <span aria-hidden="true">←</span>
                        <span>Back</span>
                    </button>

                    <p className="info-type">District</p>

                    <h2 className="info-title" ref={titleRef} tabIndex={-1}>
                        {selectedDistrict.name}
                    </h2>

                    <div className="info-stats">
                        <div className="info-stat">
                            <span className="info-stat-label">Area</span>
                            <span className="info-stat-value">
                                {selectedDistrict.areaKm2.toFixed(2)} km²
                            </span>
                        </div>

                        <div className="info-stat">
                            <span className="info-stat-label">Zones</span>
                            <span className="info-stat-value">
                                {selectedZones.length}
                            </span>
                        </div>
                    </div>

                    <h3 className="info-section-title">Zones</h3>

                    <div className="info-list">
                        {selectedZones.map((zone) => (
                            <button
                                type="button"
                                className="info-list-item"
                                key={zone.properties.id}
                                onClick={() => navigate(onSelectZone, zone)}
                            >
                                <span>{zone.properties.name}</span>
                                <span aria-hidden="true">→</span>
                            </button>
                        ))}
                    </div>
                </>
            ) : selectedMacrodistrict ? (
                <>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate(onBack)}
                    >
                        <span aria-hidden="true">←</span>
                        <span>Back</span>
                    </button>

                    <p className="info-type">Macrodistrict</p>

                    <h2 className="info-title" ref={titleRef} tabIndex={-1}>
                        {selectedMacrodistrict.name}
                    </h2>

                    <div className="info-stats">
                        <div className="info-stat">
                            <span className="info-stat-label">Area</span>
                            <span className="info-stat-value">
                                {selectedMacrodistrict.areaKm2.toFixed(2)} km²
                            </span>
                        </div>

                        <div className="info-stat">
                            <span className="info-stat-label">Districts</span>
                            <span className="info-stat-value">
                                {selectedDistricts.length}
                            </span>
                        </div>
                    </div>

                    <h3 className="info-section-title">Districts</h3>

                    <div className="info-list">
                        {selectedDistricts.map((district) => (
                            <button
                                type="button"
                                className="info-list-item"
                                key={district.properties.id}
                                onClick={() => navigate(onSelectDistrict, district)}
                            >
                                <span>{district.properties.name}</span>
                                <span aria-hidden="true">→</span>
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p className="info-type">City</p>

                    <h2 className="info-title" ref={titleRef} tabIndex={-1}>
                        La Paz
                    </h2>

                    <p>
                        Select a macrodistrict on the map or from the list to explore its
                        districts and zones.
                    </p>

                    <h3 className="info-section-title">Macrodistricts</h3>
                    <div className="info-list">
                        {macrodistricts.map((macrodistrict) => (
                            <button
                                type="button"
                                className="info-list-item"
                                key={macrodistrict.properties.id}
                                onClick={() => navigate(onSelectMacrodistrict, macrodistrict)}
                            >
                                <span>{macrodistrict.properties.name}</span>
                                <span aria-hidden="true">→</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
}

export default InfoPanel;