interface FilterBadgeProps {
  label: string;
  value: string;
  onClick: () => void;
}

export function FilterBadge(props: FilterBadgeProps) {
  const { label, value, onClick } = props;

  return (
    <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-md text-sm font-medium bg-blue-600 text-white">
      {label}: {value}
      <button
        type="button"
        onClick={onClick}
        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
      >
        <span className="sr-only">Remove {label}</span>
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  );
}
