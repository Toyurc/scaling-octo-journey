import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

it('loads and displays the Input Component', () => {
  render(<Input label={'Name'} name={'Name'} placeholder="pls enter your name" />);
  const inputElement = screen.getByPlaceholderText(/pls enter your name/i);
  expect(inputElement).toBeInTheDocument();
});

it('should change the value of the input', async () => {
  render(
    <Input type="text" label={'Name'} name={'Name'} placeholder="pls enter your name" />
  );
  const input = screen.getByLabelText('Name') as HTMLInputElement;
  const nullInputValue = screen.queryByText('Names') as HTMLInputElement | null;

  expect(input.value).toBe('');
  await userEvent.type(input, 'John Smith');

  expect(input).toHaveValue('John Smith');
  expect(nullInputValue).toBeNull();
});
