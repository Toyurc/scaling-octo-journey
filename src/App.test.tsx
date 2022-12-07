import { fireEvent, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import App from './App';
import OpenMapService from './services/mapService';

jest.mock('./services/mapService');

describe('App', () => {
  it('should render form and maps components and update state when form is submitted', async () => {
    const response = {
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

    (OpenMapService.getOSMBBoxData as jest.Mock).mockResolvedValue(response);

    const { container, findByTestId } = render(<App />);

    expect(container.innerHTML).toMatchSnapshot();

    const form = await findByTestId('form');

    const minLongInput = form.querySelector<HTMLInputElement>('[name="minLong"]');
    const minLatInput = form.querySelector<HTMLInputElement>('[name="minLat"]');
    const maxLongInput = form.querySelector<HTMLInputElement>('[name="maxLong"]');
    const maxLatInput = form.querySelector<HTMLInputElement>('[name="maxLat"]');

    fireEvent.change(minLongInput!, { target: { value: '24.202154' } });
    fireEvent.change(minLatInput!, { target: { value: '-0.482686' } });
    fireEvent.change(maxLongInput!, { target: { value: '24.202905' } });
    fireEvent.change(maxLatInput!, { target: { value: '-0.481217' } });

    fireEvent.submit(form);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should submit the form and render the maps component with GeoJSON data when the form is submitted', async () => {
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

    (OpenMapService.getOSMBBoxData as jest.Mock).mockResolvedValue(geoJsonData);

    const { getByLabelText, getByText } = render(<App />);

    const minLongInput = getByLabelText('Min Longitude / Left') as HTMLInputElement;
    const minLatInput = getByLabelText('Min Latitude / Bottom') as HTMLInputElement;
    const maxLongInput = getByLabelText('Max Longitude / Right') as HTMLInputElement;
    const maxLatInput = getByLabelText('Max Latitude / Top') as HTMLInputElement;
    const submitButton = getByText('Get BBox Data');

    fireEvent.change(minLongInput, { target: { value: '24.202154' } });
    fireEvent.change(minLatInput, { target: { value: '-0.482686' } });
    fireEvent.change(maxLongInput, { target: { value: '24.202905' } });
    fireEvent.change(maxLatInput, { target: { value: '-0.481217' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(OpenMapService.getOSMBBoxData).toHaveBeenCalledWith('24.202154', '-0.482686', '24.202905', '-0.481217');
    });

    expect(getByText('No Features Found for this location')).not.toBeInTheDocument();
  });
})