import type {Metadata} from 'next';
import {Navbar, Footer, Providers} from '@/components';
import {Body} from '@/components/factory';

export const metadata: Metadata = {
  title: {
    default: "Elliot Saha's Portfolio",
    template: "%s | Elliot Saha's Portfolio",
  },
  description:
    "Hi, I'm Elliot—a seasoned web developer at the forefront of deploying innovative solutions for the digital age.",
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
