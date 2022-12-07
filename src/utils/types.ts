import { GeoJsonObject } from 'geojson';

export interface IBBoxRequest {
  minLong: string;
  minLat: string;
  maxLong: string;
  maxLat: string;
}

export interface Response {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: Record<string, string | number>;
}

export interface GeoDataResponse {
  features: GeoJsonObject[];
  type: string;
}