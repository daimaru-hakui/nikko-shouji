import { useStore } from "@/store";
import { Spinner } from "@material-tailwind/react";

export function DefaultSpinner() {
  const isLoading = useStore((state) => state.isLoading);
  return (
    isLoading && (
      <div className="fixed w-full h-screen z-50 flex items-center justify-center">
        <Spinner className="h-10 w-10"/>
      </div>
    )
  );
}
