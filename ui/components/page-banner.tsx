"use client";
import { prefix } from "lib/prefix";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const PageBanner = (props: {
  saveKey: string;
  children?: React.ReactNode;
  pathname?: string;
  onClose?: () => void;
  onVisible?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const isPathMatch =
    router.pathname === props.pathname;

  useEffect(() => {
    const bannerKey = localStorage.getItem(props.saveKey);
    if (!bannerKey) {
      setIsVisible(true);
      if (props.onVisible) {
        props.onVisible();
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(props.saveKey, "true");
    setIsVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    isVisible && isPathMatch ? <div className="w-full bg-brand-blue-dark text-white px-6 mt-[2px] py-2 flex justify-between items-center ">
      
      {props.children}
      <img
        className="text-white cursor-pointer"
        src={`${prefix}/times-white.svg`}
        width={24}
        height={24}
        alt="Close banner"
        onClick={handleClose}
      />
    </div>
  : <></>);
};
