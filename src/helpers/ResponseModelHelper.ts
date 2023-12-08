import { NextRouter } from 'next/router'
import toast from 'react-hot-toast'
import { ResponseModel } from 'src/models'
import routes from 'src/routes'

export const isResponseModel = (obj: any): obj is ResponseModel<any> => {
  if (obj === undefined || obj === '') {
    return false
  } else {
    return 'result' in obj && 'body' in obj && 'message' in obj
  }
}

export const handleResponseError = (error: any, router: NextRouter) => {
  // ** If there is no response, then redirect to error page
  if (!error.response) {
    router.push({
      pathname: error.error,
      query: { message: error.message, returnUrl: router.asPath }
    })
    toast.error(error.message, { id: 'loading' })

    return
  }

  // ** If the error is a response model, then show the error message
  if (isResponseModel(error.response.data)) {
    // ** Destructure the response
    const { result, message } = error.response.data

    // ** If the result is 401, then end session
    if (result === 401) {
      router.push({
        pathname: routes.login,
        query: { message: error.message, returnUrl: router.asPath }
      })

      return
    } else {
      // ** If the result is not 401, then show the error message
      toast.error(message, { id: 'loading' })
    }

    return
  } else {
    // ** If the error is not a response model, check the status code. If it's 401, then end session
    const status = error.response.status
    if (status === 401) {
      toast.error(error.message, { id: 'loading' })
      router.push({
        pathname: routes.login,
        query: { message: error.message, returnUrl: router.asPath }
      })

      return
    }

    // ** Else redirect to error page
    router.push({
      pathname: error.error,
      query: { message: error.message, returnUrl: router.asPath }
    })
    toast.error(error.message, { id: 'loading' })

    return
  }
}
