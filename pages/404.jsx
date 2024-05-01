import FullContainer from "@/components/common/FullContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Custom404 = () => {
  return (
    <FullContainer className="h-screen flex flex-col gap-10">
      <h1 className="text-6xl font-bold text-gray-400">
        🚀404 - Page Not Found
      </h1>
      <p className="text-2xl">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button className="text-xl">👩‍🚀 Go back to home</Button>
      </Link>
    </FullContainer>
  );
};

export default Custom404;
