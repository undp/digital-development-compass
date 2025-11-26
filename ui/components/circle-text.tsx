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
        
        {(() => {
                // const text = text// Replace this with your actual text
                const maxLength = 25;

                if (text.length > maxLength) {
                    const words = text.split(' ');
                    let lines = [];
                    let currentLine = '';

                    words.forEach(word => {
                        if ((currentLine + word).length <= maxLength) {
                            currentLine += word + ' ';
                        } else {
                            let line = currentLine.trim();
                            const padLength = maxLength - line.length;
                            
                            if (padLength > 0) {
                              const padStart = Math.floor(padLength / 2);
                              const padEnd = padLength - padStart;
                              line = '\u00A0'.repeat(padStart) + line + '\u00A0'.repeat(padEnd);
                            }
                            lines.push(line);

                            // Start new line
                            currentLine = word + ' ';
                        }
                    });

                    if (currentLine.trim().length > 0) {
                        lines.push(currentLine.trim());
                    }

                    const lineHeight = 0.85; // Adjust line height as needed
                    const yOffset = (lines.length - 1) * lineHeight / 2;

                    return lines.map((line, index) => (
                        <textPath href={`#${id}`} startOffset="50%">
                          <tspan key={index} x="0" dy={`${index === 0 ? -yOffset : lineHeight}em`}>
                            {line}
                          </tspan>
                        </textPath>
                    ));
                } else {
                    return <textPath href={`#${id}`} startOffset="50%"><tspan>{text}</tspan></textPath>;
                }
            })()}
      </text>
    </>
  )
}
