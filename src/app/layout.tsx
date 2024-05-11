import type { Metadata } from "next";
import { Navbar, Footer, Providers } from "@/components";
import { Body } from "@/components/factory";

export const metadata: Metadata = {
  title: {
    default: "Nixode",
    template: "%s | Nixode",
  },
  description:
    "Nixode is a turnkey solution company that specializes in rebranding, social media, and UI/UX design.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <Body>
        <Providers>
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </Providers>
      </Body>
    </html>
  );
};

export default RootLayout;
