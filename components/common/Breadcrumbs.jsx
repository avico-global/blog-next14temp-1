import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumbs() {
  const router = useRouter();

  // Access the current path
  const currentPath = router.asPath;

  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <div className="flex items-center space-x-3 justify-center w-full py-2 text-sm">
      <Link
        href="/"
        className="flex items-center hover:text-primary gap-1 border-transparent border-b-2 hover:border-primary transition-all"
      >
        Home /
      </Link>
      {pathSegments.map((segment, index) => {
        const displaySegment = segment.replace(/-/g, " "); // Replace hyphens with spaces

        return (
          <div
            key={index}
            className="flex capitalize justify-between text-gray-700"
          >
            {index !== pathSegments.length - 1 ? (
              <Link
                href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                className="flex items-center hover:text-primary gap-1 border-transparent border-b-2 hover:border-primary transition-all"
              >
                {displaySegment}/
              </Link>
            ) : (
              <div className="flex items-center border-transparent font-semibold border-b-2 transition-all">
                {displaySegment}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
