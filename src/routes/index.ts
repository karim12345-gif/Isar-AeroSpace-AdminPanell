const authRoutes = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  forgotPassword: '/forgot-password'
}

//?? this ts file is for paths in general, but since we have only one page to show the data
//?? we can use it to handle the HTTP requests from the Api
const errorRoutes = {
  401: '/401',
  404: '/404',
  500: '/500',
  error: '/error'
}

export default {
  ...errorRoutes,
  ...authRoutes
}
