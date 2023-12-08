import React from 'react'

interface GradientColor {
  start: string
  end?: string // Make 'end' property optional
}

interface IIsarAeroSpaceProps {
  color?: string
  isNewLogo?: boolean
  size?: number | string
  width?: number | string
  height?: number | string
  gradientColor?: GradientColor
}

const AeroSpaceLogo = ({ width, height, isNewLogo }: IIsarAeroSpaceProps) => {
  // const { settings } = useSettings()

  return isNewLogo ? (
    <img src='/images/isaraerospace_logo.jpg' alt='IsarAeroSpace-logo' width={width} height={height} />
  ) : (
    <img src='/images/Logo.png' alt='IsarAeroSpace-logo' width={80} height={70} />
  )
}

export default AeroSpaceLogo
