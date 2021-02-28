import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('check if Breed, Sub breed, number of images selectboxes and button renders renders correctly', async () => {
  render(<App />);

  const breed = screen.getByRole('combobox', {
    name: /breed/i
  });
  const nullSubBreed = screen.queryByRole('combobox', {
    name: /subbreed/i
  });

  const button = screen.getByRole('button');

  expect(breed).toBeInTheDocument();
  expect(nullSubBreed).not.toBeInTheDocument();
  // expect(imageCount).toBeInTheDocument()
  expect(button).toBeInTheDocument();

  // SELECTING BREED

  const selectedOptionBread = await screen.findByText('bulldog');
  userEvent.selectOptions(breed, selectedOptionBread);
  expect(selectedOptionBread).toBeInTheDocument();

  // CHECK IF SUB BREEDS ARE LOADED
  const subBreed = await screen.findByRole('combobox', {
    name: /subbreed/i
  });

  expect(subBreed).toBeInTheDocument();

  // SELECTING SUB BREED

  const selectedOptionSubBread = screen.getByText('boston');
  userEvent.selectOptions(subBreed, selectedOptionSubBread);
  expect(selectedOptionSubBread).toBeInTheDocument();

  // SELECT NUMBER OF IMAGES
  const imageCount = screen.getByRole('combobox', {
    name: /number/i
  });
  const imageCountOption = screen.getByRole('option', {
    name: '2'
  });
  userEvent.selectOptions(imageCount, imageCountOption);
  expect(imageCount).toBeInTheDocument();

  // CHECK IF SUB BREEDS DISSAPEAR and IMAGE COUNT RESET

  await waitFor(() => {
    const newSelectedOptionBreed = screen.getByText('akita');
    userEvent.selectOptions(breed, newSelectedOptionBreed);
  });
  expect(imageCount).toHaveTextContent('0');
  expect(subBreed).not.toBeInTheDocument();
});

test('check images and amount of images', async () => {
  render(<App />);

  const breed = screen.getByRole('combobox', {
    name: /breed/i
  });

  const button = screen.getByRole('button');

  const selectedOptionBread = await screen.findByText('bulldog');
  userEvent.selectOptions(breed, selectedOptionBread);
  const subBreed = await screen.findByRole('combobox', {
    name: /subbreed/i
  });
  const selectedOptionSubBread = screen.getByText('boston');
  await waitFor(() => {
    userEvent.selectOptions(subBreed, selectedOptionSubBread);
  });
  expect(selectedOptionSubBread).toHaveTextContent('boston');
  const imageCount = screen.getByRole('combobox', {
    name: /number/i
  });
  userEvent.click(imageCount);
  const imageCountOptionCheck = screen.getByRole('option', {
    name: '5'
  });

  await waitFor(() => {
    userEvent.selectOptions(imageCount, imageCountOptionCheck);
  });
  expect(imageCount).toHaveTextContent('5');

  await waitFor(() => {
    userEvent.click(button);
  });
  const displayedImagesContainers = await screen.findAllByRole('feed');
  const displayedImages = await screen.findAllByAltText(/images/i);
  expect(displayedImagesContainers).toHaveLength(5);
  expect(displayedImages).toHaveLength(5);
});
