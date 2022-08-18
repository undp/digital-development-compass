interface CircleTextProps extends React.SVGAttributes<HTMLDivElement> {
  id: string
  r: number
  rotate?: number
  text: string
}
export const CircleText = ({
  id,
  r = 10,
  rotate = 0,
  text = '',
  ...props
}: CircleTextProps) => {
  return (
    <>
      <path
        fill="transparent"
        d={[
          ['M', 0, r].join(' '),
          ['A', r, r, 0, 0, 1, 0, -r].join(' '),
          ['A', r, r, 0, 0, 1, 0, r].join(' '),
        ].join(' ')}
        id={id}
        transform={`rotate(${rotate})`}
        style={{ pointerEvents: 'none' }}
      ></path>
      {/* @ts-ignore */}
      <text textAnchor="middle" {...props}>
        <textPath href={`#${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </>
  )
}
