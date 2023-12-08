import React from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

const xmlns = 'http://www.w3.org/2000/svg'
const xlinkns = 'http://www.w3.org/1999/xlink'

interface GradientColor {
  start: string
  end?: string // Make 'end' property optional
}

interface MaalyLogoProps {
  color?: string
  isNewLogo?: boolean
  size?: number | string
  width?: number | string
  height?: number | string
  gradientColor?: GradientColor
}

const createGradient = (color: GradientColor) => {
  const { start, end } = color
  if (end) {
    return (
      <linearGradient id='gradient' gradientTransform='rotate(0)'>
        <stop offset='0%' stopColor={start} />
        <stop offset='100%' stopColor={end} />
      </linearGradient>
    )
  } else {
    return null
  }
}

const MaalyLogo = ({ gradientColor, size, color, width, height, isNewLogo }: MaalyLogoProps) => {
  const { settings } = useSettings()
  const defaultSize = 200 // Adjust the default size here
  const gradient = gradientColor?.end ? gradientColor : undefined

  const defaultColor = settings.mode === 'light' ? '#2D3864' : '#FFFFFF' // Adjust the default color here

  return isNewLogo ? (
    <img src='/images/Maaly-Insights.png' alt='maaly-logo' width={width} height={height} />
  ) : (
    <svg
      xmlns={xmlns}
      xmlnsXlink={xlinkns}
      width={width ? width : size || defaultSize}
      height={height ? height : size || defaultSize}
      viewBox='0 0 1081.000000 1081.000000'
    >
      {gradient && <defs>{createGradient(gradient)}</defs>}
      <g
        stroke='none'
        fill={gradient ? `url(#gradient)` : color ? color : defaultColor}
        transform='translate(0.000000,1081.000000) scale(0.100000,-0.100000)'
      >
        <path d='M8105 7885 l-25 -24 0 -1291 0 -1291 25 -25 c25 -25 26 -25 176 -22 145 3 152 4 170 27 18 23 19 59 19 1313 l0 1289 -25 24 c-23 24 -28 25 -170 25 -142 0 -147 -1 -170 -25z' />
        <path d='M66 7759 l-26 -31 0 -1220 0 -1220 29 -29 29 -29 137 0 137 0 29 29 29 29 0 764 c0 848 -3 808 64 808 19 0 39 -7 48 -17 8 -10 149 -358 313 -773 164 -415 304 -767 312 -782 27 -54 48 -60 202 -56 125 3 143 5 159 23 11 11 86 191 167 400 367 944 458 1171 472 1188 21 23 68 22 93 -3 20 -20 20 -33 20 -790 0 -753 0 -770 20 -790 28 -28 54 -32 194 -28 115 3 127 5 148 26 l23 23 0 1230 0 1231 -28 24 c-28 24 -32 24 -217 24 -182 0 -190 -1 -213 -22 -16 -15 -77 -154 -182 -413 -282 -700 -587 -1450 -596 -1466 -25 -47 -118 -40 -143 10 -14 26 -301 725 -613 1491 -98 242 -152 362 -169 378 -24 21 -32 22 -219 22 l-193 0 -26 -31z' />
        <path d='M3857 7234 c-154 -28 -295 -91 -413 -185 -165 -131 -273 -299 -331 -514 -25 -92 -27 -115 -27 -300 -1 -222 12 -300 75 -451 87 -209 274 -404 473 -494 131 -60 213 -75 406 -75 151 0 186 3 252 22 102 30 176 64 258 118 38 25 79 45 95 45 34 0 85 -50 85 -83 0 -73 33 -87 199 -87 120 0 132 2 156 23 l26 22 -1 948 c0 589 -4 956 -10 967 -16 29 -66 40 -184 40 -145 0 -173 -15 -191 -103 -3 -15 -14 -36 -25 -47 -34 -34 -77 -25 -160 30 -180 121 -439 168 -683 124z m408 -349 c210 -44 380 -197 450 -404 69 -204 40 -480 -69 -643 -51 -77 -154 -172 -228 -209 -182 -92 -419 -92 -608 -1 -108 52 -213 159 -269 272 -51 105 -71 195 -71 330 0 135 20 224 71 330 80 162 238 288 409 324 86 19 228 19 305 1z' />
        <path d='M6297 7234 c-229 -41 -419 -155 -563 -337 -142 -180 -214 -406 -214 -672 0 -510 301 -904 763 -999 97 -20 302 -21 394 -1 125 26 241 75 343 144 49 33 69 37 103 19 32 -16 46 -39 47 -71 0 -18 11 -40 29 -58 l29 -29 137 0 137 0 29 29 29 30 -2 945 -3 945 -23 23 c-21 22 -30 23 -168 23 l-146 0 -24 -28 c-14 -16 -24 -41 -24 -58 0 -40 -39 -79 -79 -79 -20 0 -56 17 -103 49 -142 96 -306 142 -507 140 -58 0 -141 -7 -184 -15z m408 -349 c326 -68 530 -381 486 -745 -22 -174 -77 -295 -189 -406 -75 -76 -190 -137 -302 -160 -91 -19 -257 -14 -340 12 -173 52 -308 171 -385 339 -48 104 -60 165 -60 305 0 147 16 216 76 338 76 156 235 279 409 316 86 19 218 19 305 1z' />
        <path d='M8844 7220 c-26 -10 -54 -48 -54 -71 0 -9 176 -428 391 -930 215 -503 393 -923 396 -934 3 -12 -61 -171 -151 -381 -91 -211 -156 -374 -156 -393 0 -35 27 -67 64 -77 13 -3 87 -4 165 -2 125 3 143 5 160 23 17 17 240 561 1001 2438 51 126 93 239 93 253 0 38 -29 72 -66 79 -19 4 -95 5 -170 3 -109 -2 -140 -6 -152 -19 -9 -9 -126 -305 -260 -658 -150 -399 -250 -647 -261 -656 -26 -20 -78 -18 -103 3 -13 11 -117 252 -281 652 -191 466 -266 641 -285 658 -25 21 -35 22 -168 21 -78 0 -152 -4 -163 -9z' />
        <path d='M3510 4054 c-19 -8 -45 -25 -58 -37 -63 -58 -82 -169 -39 -223 77 -100 426 -350 667 -481 799 -432 1651 -525 2444 -266 435 143 1178 621 1227 790 37 130 -90 258 -221 223 -24 -7 -72 -37 -118 -75 -210 -174 -435 -320 -677 -439 -251 -125 -472 -200 -724 -249 -103 -19 -148 -22 -396 -22 -312 0 -357 6 -630 75 -425 108 -829 311 -1207 607 -148 115 -190 131 -268 97z' />
      </g>
    </svg>
  )
}

export default MaalyLogo
