import { ancillary, Pillar } from "database/ancillary";
import type { Country, Feature } from "database/processed/db";
import { makePillarsScale } from "lib";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { useUpdateEffect } from "react-use";
import {
  AmbientLight,
  DirectionalLight,
  Fog,
  MeshPhysicalMaterial,
} from "three";

interface GlobeDatum {
  name: string;
  alpha2: string;
  alpha3: string;
  latitude: number | null;
  longitude: number | null;
  geojson: Feature | undefined;
  scores: Country["scores"];
  unMember: boolean;
}

interface GlobeVizProps {
  pillar: Pillar;
  onChange: (id: string | null) => void;
  data: GlobeDatum[];
  activeCountryId: string | null;
}

const scale = makePillarsScale(ancillary.pillarNames);

const markerSvg = `<svg width="100%" height="100%" viewBox="-4 0 36 36" overflow="visible">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" stroke="black"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export default function GlobeViz({
  data,
  pillar,
  onChange,
  activeCountryId,
}: GlobeVizProps) {
  const { observe, width, height } = useDimensions();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const globeElement = useRef<GlobeMethods>(null);
  const router = useRouter()

  const htmlElementsData = useMemo(() => {
    if (!activeCountryId) return [];
    return data.filter((d) => d.alpha3 === activeCountryId);
  }, [activeCountryId]);

  useUpdateEffect(() => {
    if (!globeElement.current) return;
    const controls = globeElement.current.controls(); // @ts-ignore

    if (activeCountryId) {
      const match = data.find((d) => d.alpha3 === activeCountryId);
      if (!match) return;
      // we have a country!
      // @ts-ignore
      controls.autoRotate = false;
      globeElement.current.pointOfView(
        {
          lat: match?.latitude || undefined,
          lng: match?.longitude || undefined,
          altitude: 1.5,
        },
        1200
      );
    } else {
      // @ts-ignore
      controls.autoRotate = true;

      // get current position
      let currPos = globeElement.current.camera().position;
      let asLatLong = globeElement.current.toGeoCoords(currPos);
      globeElement.current.pointOfView(
        {
          lat: asLatLong.lat,
          lng: asLatLong.lng,
          altitude: 1.9,
        },
        1200
      );
    }
  }, [activeCountryId]);

  const handlePolygonClick = (id: string) => {
    onChange(id);
  };

  return (
    <div
      ref={observe}
      className="w-full h-full min-h-[30em] overflow-hidden relative"
    >
      <ReactGlobe
        // @ts-ignore
        ref={globeElement}
        height={height}
        width={width}
        showGraticules
        animateIn
        backgroundColor="rgba(0,0,0,0)"
        showGlobe
        onGlobeReady={() => {
          if (!globeElement.current) return;
          const controls = globeElement.current.controls();

          // @ts-ignore
          controls.autoRotate = true;
          // @ts-ignore
          controls.autoRotateSpeed = -0.25;
          // @ts-ignore
          controls.enableZoom = false;
          // @ts-ignore
          globeElement.current.pointOfView({ altitude: 1.9 });
          const scene = globeElement.current.scene();
          setTimeout(() => {
            // wait until the lights are added to remove the built-in one
            scene.children
              .filter((d) => d.type === "DirectionalLight")
              .map((d) => {
                scene.remove(d);
              });
            const ambientLight = new AmbientLight(0xdce9fe, 0.2);
            scene.add(ambientLight);

            // move the lines up so they don't clash with polygon meshes
            const polygons =
              scene.children[3]?.children[0]?.children[4]?.children || [];
            polygons.forEach((d) => {
              const line = d.children[1];
              line.renderOrder = 2;
            });
          }, 300);
          const camera = globeElement.current.camera();
          const light = new DirectionalLight(0xffffff, 0.1);
          light.position.set(0, 0, 1);
          camera.add(light);
          scene.add(camera);

          scene.fog = new Fog(0xdce9fe, 150, 300);
        }}
        showAtmosphere={true}
        atmosphereAltitude={0.23}
        atmosphereColor="#DCE9FE"
        htmlElementsData={htmlElementsData}
        htmlLat="latitude"
        htmlLng="longitude"
        htmlElement={() => {
          const markup = `
            <div class="text-white">
              <span class="transform -translate-x-3 w-6 h-6 block animate-bounce">${markerSvg}</span>
            </div>
          `;
          const element = document.createElement("div");
          element.innerHTML = markup;
          return element;
        }}
        // @ts-ignore
        polygonGeoJsonGeometry={(d) => {
          let cast = d as GlobeDatum;
          // @ts-ignore
          return cast.geojson.geometry;
        }}
        polygonsData={data}
        polygonCapMaterial={(d) => {
          const datum = d as GlobeDatum;
          // @ts-ignore
          const overallScore = datum.scores[pillar].score || 0;
          const isActive =
            hoveredCountry === datum.alpha3 || activeCountryId === datum.alpha3;
          
          // @ts-ignore
          const color = isActive
            ? // @ts-ignore
            scale[pillar](6)
            : overallScore
              ? // @ts-ignore
              scale[pillar](overallScore || 0)
              : "#eee";

          const material = new MeshPhysicalMaterial({
            color,
            roughness: 0.5,
            reflectivity: 1.2,
            opacity: activeCountryId
              ? activeCountryId === datum.alpha3
                ? 1
                : 0.9
              : 1,
          });
          return material;
        }}
        polygonAltitude={(d) => {
          // @ts-ignore
          return d.alpha3 === activeCountryId ? 0.035 : 0.01;
        }}
        polygonSideColor={() => "rgba(255,255,255,255)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(d) => {
          const datum = d as GlobeDatum;
          if (!datum || !datum.unMember) return "";

          return `<div class="bg-white rounded-md shadow-lg px-4 py-1 uppercase text-xs tracking-widest font-medium text-black">
          <span>${datum.name}</span>
        </div > `;
        }}
        globeMaterial={
          new MeshPhysicalMaterial({
            color: "#fff",
          })
        }
        onPolygonHover={(d) => {
          let datum = d as GlobeDatum;
          if (!datum) {
            setHoveredCountry(null);
          }
          if (!datum || !datum.unMember) {
            // console.info("Disabled for non-member countries");
            return;
          }
          setHoveredCountry(datum.alpha3 || null);
        }}
        onPolygonClick={(d) => {
          let datum = d as GlobeDatum;

          if (!datum.unMember) {
            // console.info("Disabled for non-member countries");
            return;
          }
          if (datum.alpha3 === activeCountryId) {
            router.push(`/country/${datum.alpha3}`);
            return
          }
          handlePolygonClick(datum.alpha3);
        }}
      />
    </div>
  );
}
