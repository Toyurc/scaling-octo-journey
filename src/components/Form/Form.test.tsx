import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';
import { useForm } from 'react-hook-form';

describe('Form', () => {
  it('should submit form with correct values', async () => {
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const loading = false;
    const { getByLabelText, getByText } = render(<Form submitHandler={onSubmit} resetHandler={onReset} loading={loading} />);

    const minLongInput = getByLabelText('Min Longitude / Left');
    const maxLongInput = getByLabelText('Max Longitude / Right');
    const minLatInput = getByLabelText('Min Latitude / Bottom');
    const maxLatInput = getByLabelText('Max Latitude / Top');
    const submitButton = getByText('Get BBox Data');

    fireEvent.change(minLongInput, { target: { value: '24.202154' } });
    fireEvent.change(maxLongInput, { target: { value: '24.202905' } });
    fireEvent.change(minLatInput, { target: { value: '-0.482686' } });
    fireEvent.change(maxLatInput, { target: { value: '-0.481217' } });

    fireEvent.click(submitButton);
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should reset form with null values', async () => {
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const loading = false;
    const { getByLabelText, getByText } = render(<Form submitHandler={onSubmit} resetHandler={onReset} loading={loading} />);

    const minLongInput = getByLabelText('Min Longitude / Left');
    const maxLongInput = getByLabelText('Max Longitude / Right');
    const minLatInput = getByLabelText('Min Latitude / Bottom');
    const maxLatInput = getByLabelText('Max Latitude / Top');
    const resetButton = getByText('Reset');

    fireEvent.change(minLongInput, { target: { value: '24.202154' } });
    fireEvent.change(maxLongInput, { target: { value: '24.202905' } });
    fireEvent.change(minLatInput, { target: { value: '-0.482686' } });
    fireEvent.change(maxLatInput, { target: { value: '-0.481217' } });

    fireEvent.click(resetButton);
    await waitFor(() => expect(onReset).toHaveBeenCalled());
    expect(minLongInput).toHaveValue('');
    expect(maxLongInput).toHaveValue('');
    expect(minLatInput).toHaveValue('');
    expect(maxLatInput).toHaveValue('');
  });
});
