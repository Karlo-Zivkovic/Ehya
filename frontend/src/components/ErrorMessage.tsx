function ErrorMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full ${className} flex items-center justify-center mx-auto rounded-lg text-gray-900 bg-red-400 mx-autp px-4 py-2 max-w-md`}
    >
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;

