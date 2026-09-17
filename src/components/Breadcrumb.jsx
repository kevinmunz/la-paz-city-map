function Breadcrumb({
    selectedMacrodistrict,
    selectedDistrict,
    selectedZone,
    onGoToMacrodistricts,
    onGoToMacrodistrict,
    onGoToDistrict
}) {
    const items = [
        { name: "La Paz", onClick: onGoToMacrodistricts },
        selectedMacrodistrict && { name: selectedMacrodistrict.name, onClick: onGoToMacrodistrict },
        selectedDistrict && { name: selectedDistrict.name, onClick: onGoToDistrict },
        selectedZone && { name: selectedZone.name }
    ].filter(Boolean);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li className="breadcrumb-item" key={index}>
                        {index > 0 && (
                            <span className="breadcrumb-separator" aria-hidden="true">/</span>
                        )}
                        {index === items.length - 1 ? (
                            <span className="breadcrumb-current" aria-current="location">
                                {item.name}
                            </span>
                        ) : (
                            <button className="breadcrumb-link" type="button" onClick={item.onClick}>
                                {item.name}
                            </button>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
