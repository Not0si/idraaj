import { FC, SVGProps } from 'react'

const CheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default CheckIcon
