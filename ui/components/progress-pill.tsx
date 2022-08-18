interface ProgressPillProps {
  value: number;
  background: string;
  bar: string;
  border: string;
  label: string;
}

export function ProgressPill(props: ProgressPillProps) {
  const { value, background, bar, border, label } = props;

  return (
    <div className="flex items-center">
      <div
        className="h-[8px] w-16 rounded-full border relative overflow-hidden"
        style={{
          borderColor: border,
          backgroundColor: background,
        }}
      >
        <div
          className="absolute inset-0 left-0 h-full rounded-full"
          style={{
            background: bar,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span className="text-xs font-mono ml-1 relative top-px text-black">
        {label}
      </span>
    </div>
  );
}
