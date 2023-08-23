import { rest } from 'msw';
import { faker } from '@faker-js/faker';

const url = process.env.REACT_APP_BASE_URL;

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

const userProfile = {
  id: +faker.datatype.uuid(),
  username: 'testing',
  email: faker.internet.email('testing', 'todo', 'gmail.com', {
    allowSpecialCharacters: false,
  }),
  image: faker.image.abstract(),
  createdAt: faker.date.between(),
  updatedAt: faker.date.between(),
};

export const handlers = [
  rest.post(`${url}/accounts/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'register successfully',
      })
    );
  }),
  rest.post(`${url}/accounts/login`, (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'testing@gmail.com' && password === 'Testing123') {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'login successfully',
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        message: 'user not found',
      })
    );
  }),
  rest.get(`${url}/accounts/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: userProfile,
        },
      })
    );
  }),

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
            message: 'category deleted',
          })
        );
      } else {
        return res(ctx.status(404));
      }
    }
    return res(ctx.status(400));
  }),
];
