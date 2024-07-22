import Times from "../public/times-red.svg";
import Image from "next/image";
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

export function SideMenuFilterBadge(props: FilterBadgeProps) {
  const { value, onClick } = props;
  return (
<span className="inline-flex py-0.6 pl-0 pr-0 text-sm font-medium filter-badge-bg-color text-black">
  <span className="flex items-center">
    <button
      type="button"
      onClick={onClick}
      className="ml-0.1 h-5 w-7 rounded-full inline-flex items-center justify-center focus:outline-none focus:text-white"
    >
      {/* <span className="sr-only">Remove {label}</span> */}
      <Image
        src={Times}
        alt="Times"
      />
    </button>
  </span>
  <span className="text-xs flex items-center">
    {value}
  </span>
</span>
  );
}
