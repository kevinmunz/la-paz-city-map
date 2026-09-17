# Geographic data provenance

## Source zones

- **Dataset:** Mapa Zonas Ciudad de La Paz, Bolivia 2020.
- **Distribution page:** [Ciudatos Lab](https://ciudatoslab.org/datos/mapa-zonas-la-paz-2020/).
- **Data owner:** Gobierno Autónomo Municipal de La Paz (GAMLP), as identified in the metadata.
- **Metadata author:** Rolando Aguilar, GeoBolivia.
- **Publication date in the metadata:** October 20, 2020.
- **Reference system:** WGS 84 / EPSG:4326.
- **Source coverage:** approximately 188 zones, with referential boundaries.

The source details above come from the distribution page and the three-page metadata report, `Zonas_GAMLP_2019.pdf`. Although the filename and layer identifier contain 2019, the report title and publication date identify the dataset as 2020. The layer identifier recorded in the report is `GobMunicipal:Zonas_GAMLP_2019`.

The distribution page and metadata report do not state an explicit dataset license. This documentation records attribution without assigning a license to the source data.

## Project transformations

I grouped and merged the source zone geometries according to their data to create district and macrodistrict boundaries. The resulting layers are included as static GeoJSON files for the frontend.

The application currently includes:

| Layer | Features | Origin |
| --- | ---: | --- |
| Zones | 188 | Source zone dataset, prepared for the project |
| Districts | 22 | Derived from zones I grouped and merged |
| Macrodistricts | 8 | Derived from zones I grouped and merged |

Each feature contains a numeric ID, a name, a parent ID linking it to the next level in the hierarchy, and an area in square kilometres.

The counts describe the bundled files and should not be read as a claim of complete or current municipal coverage. The source describes zone boundaries as referential; the derived layers inherit that limitation.

## Background map

The OpenStreetMap tile layer is separate from the geographic boundary dataset. Credit: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Screenshots should retain the map attribution visible in the application.
