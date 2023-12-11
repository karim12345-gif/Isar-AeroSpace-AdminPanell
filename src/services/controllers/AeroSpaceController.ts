import { NextRouter } from 'next/router'
import toast from 'react-hot-toast'
import { isResponseModel } from 'src/helpers'

import routes from 'src/routes'

import { GetSpectrumStatus } from 'src/types'
import { AeroSpaceApi } from '../api'

export default class RunwayController {
  private readonly router: NextRouter

  constructor(router: NextRouter) {
    this.router = router
  }

  //** This method will be responsible for handling the response and data */
  GetSpectrumStatus = async (): Promise<GetSpectrumStatus | undefined> => {
    try {
      const response = await fetch(AeroSpaceApi.getSpectrumStatus)

      // ** Assuming your API returns JSON data
      const body: GetSpectrumStatus = await response.json()

      // ** If the result is 200, then response is successful
      if (response.status === 200) {
        // Successful login
        return body
      }
    } catch (error: any) {
      // ** If there is no response, then redirect to error page
      if (!error.response) {
        this.router.push({
          pathname: error.error,
          query: { message: error.message, returnUrl: this.router.asPath }
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
          this.router.push({
            pathname: routes.login,
            query: { message: error.message, returnUrl: this.router.asPath }
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
          this.router.push({
            pathname: routes.login,
            query: { message: error.message, returnUrl: this.router.asPath }
          })

          return
        }

        // ** Else redirect to error page
        this.router.push({
          pathname: error.error,
          query: { message: error.message, returnUrl: this.router.asPath }
        })
        toast.error(error.message, { id: 'loading' })

        return
      }
    }
  }

  GetIsRequiredAction = async () => {
    try {
      const response = await fetch(AeroSpaceApi.getHandelSpectrumActionStatus)

      // ** If the result is 200, then response is successful
      if (response.status === 200) {
        // Successful login
        return response.status
      }
    } catch (error: any) {
      // ** If there is no response, then redirect to error page
      if (!error.response) {
        this.router.push({
          pathname: error.error,
          query: { message: error.message, returnUrl: this.router.asPath }
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
          this.router.push({
            pathname: routes.login,
            query: { message: error.message, returnUrl: this.router.asPath }
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
          this.router.push({
            pathname: routes.login,
            query: { message: error.message, returnUrl: this.router.asPath }
          })

          return
        }

        // ** Else redirect to error page
        this.router.push({
          pathname: error.error,
          query: { message: error.message, returnUrl: this.router.asPath }
        })
        toast.error(error.message, { id: 'loading' })

        return
      }
    }
  }
}
