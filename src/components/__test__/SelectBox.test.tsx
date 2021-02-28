import { render, screen } from '@testing-library/react';
import SelectBox from '../SelectBox';

const dogList = [
  'afghan',
  'basset',
  'blood',
  'english',
  'ibizan',
  'plott',
  'walker'
];

test('check if selectbox render correctly', async () => {
  render(
    <SelectBox
      error={undefined}
      name="breed"
      labelText="Breed:"
      register={jest.fn()}
      values={dogList}
    />
  );
  const selectBox = screen.getByRole('combobox');
  const options = screen.getAllByRole('option');

  expect(selectBox).toBeInTheDocument();
  expect(options).toHaveLength(8);
});
