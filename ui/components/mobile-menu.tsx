import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

import { SearchDialogInner } from "./search-dialog";

export function MobileMenu({
  isOpen,
  onClose,
  countries,
}: {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryNameAndAlpha[];
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed bg-white inset-0 right-0 mx-3 top-28 rounded-tl-xl rounded-tr-xl overflow-hidden z-10">
          <Dialog.Title className="sr-only">Mobile Navigation</Dialog.Title>
          <SearchDialogInner
            hideRecent
            onClose={() => {}}
            countries={countries}
          />
          <div className="p-4">
            <p className="text-xs uppercase tracking-wide font-medium text-gray-600 block mb-2">
              Navigation
            </p>
            <nav className="flex flex-col mt-2 divide-y">
              <Link href="/about">
                <a className="text-1xl py-2">About</a>
              </Link>
              <Link href="/data">
                <a className="text-1xl py-2">Data</a>
              </Link>
              <Link href="/methodology">
                <a className="text-1xl py-2">Methodology</a>
              </Link>
            </nav>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
