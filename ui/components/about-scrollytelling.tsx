// @ts-ignore
import { Scrollama, Step } from "react-scrollama";

export default function AboutScrollytelling({
  onStepEnter,
  country,
  countryFocusedSubpillar,
}: {
  onStepEnter: any;
  country: any;
  countryFocusedSubpillar: any;
}) {
  return (
    <Scrollama offset={0.5} onStepEnter={onStepEnter}>
      {[
        "Each nation is ranked according to a stage of digital readiness.",
        <>
          These are scored from <span className="font-mono">0</span> to{" "}
          <span className="font-mono">5</span>
        </>,
        "We then use UNDP’s Digital Transformation Framework to understand the digital state of a given nation.",
        "Each pillar is investigated",
        "and each related sub-pillar, too.",
        "Using open data sets mapped to our framework, we identify each sub-pillar's score.",
        <>
          For instance, here our analysis shows that {country["Country or Area"]} scored a{" "}
          <span className="font-mono">{countryFocusedSubpillar.score}</span> on
          the physical infrastructure sub-pillar.
        </>,
      ].map((text, index) => (
        <Step data={index} key={index}>
          <div className="min-h-[80vh] flex items-center z-50 relative">
            <div className="bg-white max-w-[30em] py-[0.6em] px-[1em] shadow-lg border text-[clamp(1em,1.5vw,1.5vw)]">
              {text}
            </div>
          </div>
        </Step>
      ))}
    </Scrollama>
  );
}
