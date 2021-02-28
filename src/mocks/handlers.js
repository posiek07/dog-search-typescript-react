import { rest } from 'msw';

export const handlers = [
  rest.get('https://dog.ceo/api/breeds/list/all', (req, res, ctx) => {
    return res(
      ctx.json({
        message: {
          affenpinscher: [],
          african: [],
          airedale: [],
          akita: [],
          appenzeller: [],
          australian: ['shepherd'],
          basenji: [],
          beagle: [],
          bluetick: [],
          borzoi: [],
          bouvier: [],
          boxer: [],
          brabancon: [],
          briard: [],
          buhund: ['norwegian'],
          bulldog: ['boston', 'english', 'french'],
          bullterrier: ['staffordshire'],
          cairn: [],
          cattledog: ['australian']
        },
        status: 'success'
      })
    );
  }),
  rest.get('https://dog.ceo/api/breed/bulldog/images/random/5', (req, res, ctx) => {
    return res(
      ctx.json({
        message: [
          'https://images.dog.ceo/breeds/bulldog-boston/20200710_175933.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/20200710_175944.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10380.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10452.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10596.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10604.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1069.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10734.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10768.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10823.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_10846.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11180.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11417.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11427.jpg',
          'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1143.jpg'
        ],
        status: 'success'
      })
    );
  }),
  rest.get(
    'https://dog.ceo/api/breed/bulldog/boston/images/random/5',
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: [
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11476.jpg',
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11614.jpg',
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1172.jpg',
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11731.jpg',
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11776.jpg'
          ],
          status: 'success'
        })
      );
    }
  )
];
