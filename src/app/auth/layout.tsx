export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-4 sm:max-w-8/12 sm:px-0 md:max-w-6/12 xl:max-w-4/12">
      {children}
    </div>
  );
}
