export const endpoints = {
  assets: {
    getAll: `${process.env.REACT_APP_API_BASE_URL}assets`,
    getById: (id: string) =>
      `${process.env.REACT_APP_API_BASE_URL}assets/${id}`,
  },
  users: {
    getAll: `${process.env.REACT_APP_API_BASE_URL}users`,
    getById: (id: string) => `${process.env.REACT_APP_API_BASE_URL}users/${id}`,
  },
  units: {
    getAll: `${process.env.REACT_APP_API_BASE_URL}units`,
    getById: (id: string) => `${process.env.REACT_APP_API_BASE_URL}units/${id}`,
  },
  companies: {
    getAll: `${process.env.REACT_APP_API_BASE_URL}companies`,
    getById: (id: string) =>
      `${process.env.REACT_APP_API_BASE_URL}companies/${id}`,
  },
  workOrders: {
    getAll: `${process.env.REACT_APP_API_BASE_URL}workOrders`,
    getById: (id: string) =>
      `${process.env.REACT_APP_API_BASE_URL}workOrders/${id}`,
  },
};
