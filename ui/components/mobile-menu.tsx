import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

// Define the interface for the props
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryNameAndAlpha[];
}

export function MobileMenu({ isOpen, onClose, countries }: MobileMenuProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content
          className={`fixed top-20 left-0 h-full w-full max-w-sm custom-mobile-bg-color bg-opacity-90 z-50 p-6 space-y-4 shadow-lg transform transition-transform duration-300 translate-x-0 ${
            isOpen ? "custom-mobile-menu" : "custom-mobile-close-menu"
          }`}
          style={{ top: "7rem" }}
        >
          <nav className="flex flex-col space-y-4">
            <Link href="/about">
              <a className="uppercase text-lg hover:underline">About</a>
            </Link>
            <Link href="/data">
              <a className="uppercase text-lg hover:underline">data</a>
            </Link>
            <Link href="/methodology">
              <a className="uppercase text-lg hover:underline">Methodology</a>
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
