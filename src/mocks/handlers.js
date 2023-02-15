import { rest } from 'msw';

import { categoriesData } from './testingData';

const url = 'http://localhost:8002/api/v1';

export const handlers = [
  rest.get(`${url}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 5,
          rows: categoriesData,
        },
      })
    );
  }),
];
