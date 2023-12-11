// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Spectrum Dashboard',
      path: '/dashboard',
      icon: 'carbon:dashboard'
    },
    {
      title: 'Spectrum Live Stream',
      path: '/SpectrumLiveStream',
      icon: 'fluent:location-live-20-regular'
    }
  ]
}

export default navigation
