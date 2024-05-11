import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const name = params.slug
    .split("-")
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");

  return {
    title: `${name} | Nixode`,
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => children;

export default Layout;
