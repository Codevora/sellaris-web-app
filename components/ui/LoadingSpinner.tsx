import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
 className?: string;
}

export default function LoadingSpinner({className}: LoadingSpinnerProps) {
 return (
  <div
   className={cn(
    "animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500",
    className
   )}
  />
 );
}
