//import ancillary from "database/processed/ancillary";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInterval } from "react-use";

interface Props {
  pillar: string;
}

const colorMap: Record<string, string> = {
  Overall: "stroke-pillar-overall",
  Economy: "stroke-pillar-economy",
  "Digital Public Infrastructure": "stroke-pillar-dpinfrastructure",
  Government: "stroke-pillar-government",
  Connectivity: "stroke-pillar-connectivity",
  People: "stroke-pillar-people",
  Regulation: "stroke-pillar-regulation",
};

export function GlobeProgressIndicator(props: Props) {
  const [progress, setProgress] = useState(0);
  const { pillar } = props;

 // const strokeColorClass = ancillary.pillarColorMap[pillar as any];
   const strokeColorClass =    colorMap[pillar];

  useInterval(() => {
    setProgress((curr) => curr + 1);
  }, 100);

  const percentageComplete = (progress / 8000) * 10000;

  return (
    <svg
      className="fill-transparent w-full h-full -rotate-90"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -1 34 34"
      overflow="visible"
    >
      <circle
        cx="16"
        cy="16"
        r="16"
        strokeWidth={3}
        className={`fill-transparent ${strokeColorClass}`}
        strokeOpacity={0.25}
      />
      <motion.circle
        cx="16"
        cy="16"
        r="16"
        strokeDasharray="100 100"
        strokeWidth={3}
        transition={{ ease: "easeOut", duration: 0.1 }}
        initial={{
          strokeDashoffset: 100,
        }}
        animate={{
          strokeDashoffset: 100 - percentageComplete,
        }}
        exit={{
          strokeDashoffset: 100,
        }}
        className={`fill-transparent ${strokeColorClass}`}
      />
    </svg>
  );
}
