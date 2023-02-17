import { rest } from 'msw';
import { faker } from '@faker-js/faker';

const url = 'http://localhost:8002/api/v1';

export const categoriesData = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Benton' : faker.lorem.words(),
  createdAt: faker.date.between(),
  updatedAt: faker.date.between(),
  icon: null,
}));

export const todosData = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: faker.lorem.words(),
  category_id: i + 1,
  description: faker.lorem.paragraph(),
  is_completed: false,
  deadline: faker.date.between(),
  createdAt: faker.date.between(),
  updatedAt: faker.date.between(),
}));

export const handlers = [
  rest.get(`${url}/home`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          totalCategories: 5,
          totalDone: 8,
          totalInProgress: 180,
          totalTodos: 188,
        },
      })
    );
  }),
  rest.get(`${url}/todos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 20,
          rows: todosData,
        },
      })
    );
  }),
  rest.get(`${url}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 20,
          rows: categoriesData,
        },
      })
    );
  }),
  rest.get(`${url}/categories/:categoriesId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          totalTodos: 20,
          totalDone: 10,
          totalInProgress: 10,
          rows: todosData,
        },
      })
    );
  }),
  rest.delete(`${url}/categories/:categoriesId`, (req, res, ctx) => {
    const { categoriesId } = req.params;
    if (categoriesId) {
      const categoryIndex = categoriesData.findIndex(
        (category) => category.id === +categoriesId
      );
      if (categoryIndex !== -1) {
        categoriesData.splice(categoryIndex, 1);
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              message: 'category deleted',
            },
          })
        );
      } else {
        return res(ctx.status(404));
      }
    }
    return res(ctx.status(400));
  }),
  rest.get(`${url}/accounts/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: {
            id: +faker.datatype.uuid(),
            username: 'hutama',
            email: faker.internet.email(undefined, undefined, '@gmail.com'),
            image: faker.image.abstract(),
            createdAt: faker.date.between(),
            updatedAt: faker.date.between(),
          },
        },
      })
    );
  }),
];
