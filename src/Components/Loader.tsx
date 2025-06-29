import { createPortal } from "react-dom";

export const Loader = () => {
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-secondary">Loading, please wait...</p>
      </div>
    </div>,
    document.querySelector(".portalLoaderDiv") as HTMLDivElement
  );
};

export default Loader;
