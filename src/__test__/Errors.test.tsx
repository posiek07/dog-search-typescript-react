import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { server } from '../mocks/server';
import { rest } from 'msw';

test('check style validation and alert box', async () => {
  render(<App />);
  server.resetHandlers(
    rest.get(
      'https://dog.ceo/api/breed/bulldog/images/random/5',
      (req, res, ctx) => res(ctx.status(500))
    )
  );

  const breed = screen.getByRole('combobox', {
    name: /breed/i
  });
  const imageCount = screen.getByRole('combobox', {
    name: /number/i
  });

  const button = screen.getByRole('button');

  // CHECK IF STYLE CHANGE TO INVALID AFTER TRYING TO SUBMIT WITHOUT SELECTING

  userEvent.click(button);
  await waitFor(() => {
    expect(breed).toHaveClass('is-invalid');
    expect(imageCount).toHaveClass('is-invalid');
  });
});

test('CHECK BAD CONNECTION - SHOW ALERTBOX', async () => {
  server.resetHandlers(
    rest.get('https://dog.ceo/api/breeds/list/all', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<App />);

  const alertBox = await screen.findByRole('alert');
  expect(alertBox).toBeInTheDocument();
});
