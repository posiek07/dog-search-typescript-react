import { render, screen } from "@testing-library/react"
import Images from '../Images';

const data = [ 'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11476.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11614.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1172.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11731.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11776.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1179.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11808.jpg',
'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11817.jpg',]

test('check if images renders correctly', async () => {
    render(<Images images={data} />)
    const dogImages = await screen.findAllByRole('img')
    expect(dogImages).toHaveLength(data.length)
})