import React from 'react'
import { LatLngExpression } from 'leaflet';
import { GeoJSON, Map, TileLayer } from 'react-leaflet';
import { GeoDataResponse } from '../../utils/types';
import styles from './Maps.module.css';

interface MapsProps {
  error?: string;
  geoJsonData?: GeoDataResponse;
  latLng: LatLngExpression;
}
const Maps = ({ error, geoJsonData, latLng }: MapsProps) => {

  if (error !== "") {
    return (
      <div className={styles.mapsWrapper}>
        <h5 className={styles.error}>{error}</h5>
        <div id="map" className={styles.maps}>
          <Map zoom={10} center={latLng}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      </div>
    )
  }
  if (geoJsonData !== undefined) {
    return (
      <div className={styles.mapsWrapper}>
        <div id="map" className={styles.maps}>
          {geoJsonData.features.length <= 0 && <h5>No Features Found for this location</h5>}
          <Map zoom={10} center={latLng}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geoJsonData.features} />
          </Map>
        </div>
      </div>
    )
  }
  return <></>
}

export default Maps;