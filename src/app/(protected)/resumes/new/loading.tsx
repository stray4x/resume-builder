export default function Loading() {
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-bold">Create new resume</h2>
      <ul className="xxs:justify-start mx-auto flex w-full max-w-98 flex-wrap justify-center gap-4 px-4 md:max-w-3xl">
        {[...Array(4)].map((_, idx) => (
          <li key={idx}>
            <div className="bg-muted h-68 w-43 animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
