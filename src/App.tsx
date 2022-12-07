import { useState } from 'react'
import './App.css'
import { GeoDataResponse, IBBoxRequest } from './utils/types';
import OpenMapService from './services/mapService';
import 'leaflet/dist/leaflet.css';
import { AxiosError } from 'axios';
import Maps from './components/Maps/Maps';
import { LatLngExpression } from 'leaflet';
import Form from './components/Form/Form';

function App() {
  const [geoJsonData, setGeoJsonData] = useState<GeoDataResponse>();
  const [latlng, setLatlng] = useState<LatLngExpression>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (data: IBBoxRequest) => {
    setGeoJsonData(undefined);
    setError('');
    setLoading(true);
    const response = await OpenMapService.getOSMBBoxData(data.minLong, data.minLat, data.maxLong, data.maxLat);
    setLatlng([Number(data.maxLat), Number(data.maxLong)]);
    setLoading(false);
    if (response instanceof AxiosError) {
      setError(response.response?.data);
    } else {
      setGeoJsonData(response)
    }
  }

  const resetHandler = () => {
    setGeoJsonData(undefined);
    setError('');
  }

  return (
    <div>
      <h1>Get BBOX GEOJSON DATA</h1>
      <Form submitHandler={submitHandler} resetHandler={resetHandler} loading={loading} />
      <Maps latLng={latlng as LatLngExpression} error={error} geoJsonData={geoJsonData} />
    </div>
  )
}

export default App;
