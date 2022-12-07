import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { latLng } from 'leaflet';
import { render } from '@testing-library/react';
import Maps from './Maps';

describe('Map', () => {
  it('should render map with tile layer and GeoJSON layer', () => {
    const geoJsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [24.202154, -0.482686],
          },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [24.202905, -0.481217],
          },
        },
      ],
    };

    const { container } = render(
      <Map zoom={10} center={latLng([-0.482686, 24.202154])}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geoJsonData.features} />
      </Map>
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render map with tile layer when no error and no GeoJSON data', () => {
    const { container } = render(
      <Maps error="" geoJsonData={undefined} latLng={[-0.482686, 24.202154]} />
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render error message and map with tile layer when error is present', () => {
    const { container, getByText } = render(
      <Maps error="Some error" geoJsonData={undefined} latLng={[-0.482686, 24.202154]} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(getByText(/some error/i)).toBeInTheDocument();  
  });

  it('should render map with tile layer and GeoJSON layer when no error and GeoJSON data is present', () => {
    const geoJsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [24.202154, -0.482686],
          },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [24.202905, -0.481217],
          },
        },
      ],
    };

    const { container } = render(
      <Maps error="" geoJsonData={geoJsonData} latLng={[-0.482686, 24.202154]} />
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render no features found message when no error and GeoJSON data is present but no features are in GeoJSON data', () => {
    const geoJsonData = {
      type: 'FeatureCollection',
      features: [],
    };

    const { container, getByText } = render(
      <Maps error="" geoJsonData={geoJsonData} latLng={latLng([-0.482686, 24.202154])} />
    );
    expect(getByText(/No Features Found for this location/i)).toBeInTheDocument();
    expect(container.innerHTML).toMatchSnapshot();
  });
});
