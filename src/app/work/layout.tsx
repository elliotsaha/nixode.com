import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    "A collection of documented case studies of all the web applications and tools I've created and managed.",
};

const Layout = ({children}: {children: React.ReactNode}) => children;

export default Layout;
