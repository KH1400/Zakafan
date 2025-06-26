// lib/fonts.ts
import localFont from 'next/font/local'

// YekanBakh Font Family
export const yekanBakh = localFont({
  src: [
    {
      path: '../../public/fonts/YekanBakh-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YekanBakh-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YekanBakh-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YekanBakh-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YekanBakh-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-yekan-bakh',
  display: 'swap',
})

// Alternative: Single font import (if you want to import them separately)
export const yekanBakhRegular = localFont({
  src: '../../public/fonts/YekanBakh-Regular.woff',
  variable: '--font-yekan-bakh-regular',
  weight: '400',
  display: 'swap',
})

export const yekanBakhBold = localFont({
  src: '../../public/fonts/YekanBakh-Bold.woff',
  variable: '--font-yekan-bakh-bold',
  weight: '700',
  display: 'swap',
})

export const yekanBakhLight = localFont({
  src: '../../public/fonts/YekanBakh-Light.woff',
  variable: '--font-yekan-bakh-light',
  weight: '300',
  display: 'swap',
})

export const yekanBakhSemiBold = localFont({
  src: '../../public/fonts/YekanBakh-SemiBold.woff',
  variable: '--font-yekan-bakh-semibold',
  weight: '600',
  display: 'swap',
})

export const yekanBakhBlack = localFont({
  src: '../../public/fonts/YekanBakh-Black.woff',
  variable: '--font-yekan-bakh-black',
  weight: '900',
  display: 'swap',
})