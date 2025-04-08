declare module 'feather-icons' {
  interface FeatherIcon {
    toSvg(attrs?: {
      width?: number | string
      height?: number | string
      color?: string
      [key: string]: any
    }): string
  }

  interface FeatherStatic {
    icons: {
      [key: string]: FeatherIcon
    }
    replace(options?: object): void
  }

  const feather: FeatherStatic
  export default feather
} 