// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Organization Accounts',
      path: '/Organization-accounts',
      icon: 'mdi:account-outline'
    },
    {
      title: 'Admin Accounts',
      path: '/Admin-accounts',
      icon: 'clarity:administrator-line'
    },
    {
      title: 'Plan Management',
      path: '/Plan-management',
      icon: 'carbon:gui-management'
    },
    {
      title: 'Subscription Management',
      path: '/Subscription-management',
      icon: 'eos-icons:subscription-management'
    },
    {
      title: 'Security Alerts',
      path: '/Security-alerts',
      icon: 'octicon:alert-16'
    },
    {
      title: 'Events Management',
      path: '/Events-management',
      icon: 'mdi:events'
    }
  ]
}

export default navigation
