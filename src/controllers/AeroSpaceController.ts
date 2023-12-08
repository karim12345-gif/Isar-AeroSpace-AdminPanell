import routes from 'src/routes'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'
import { NextRouter } from 'next/router'
import { ResponseModel } from 'src/models'
import { isResponseModel } from 'src/helpers'
import { GetSpectrumStatus } from 'src/types'
import { AeroSpaceApi } from 'src/api'

export default class RunwayController {
  private readonly router: NextRouter

  constructor(router: NextRouter) {
    this.router = router
  }

  //** This method will be responsible for handling the response and data */
  GetSpectrumStatus = async (): Promise<GetSpectrumStatus[] | undefined> => {
    try {
      // ** Make a post request to login endpoint
      const { data }: AxiosResponse<ResponseModel<GetSpectrumStatus[]>> = await axios.get(
        AeroSpaceApi.getSpectrumStatus
      )

      // ** Destructure the response
      const { body, result } = data

      // ** If the result is 200, then login is successful
      if (result === 200) {
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
}
