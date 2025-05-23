interface ErrorMessageProps {
 message: string;
 className?: string;
}

export default function ErrorMessage({message, className}: ErrorMessageProps) {
 return (
  <div
   className={`p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md ${className}`}>
   {message}
  </div>
 );
}
