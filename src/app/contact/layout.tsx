import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Interested in discussing a collaborative project, seeking advice on tech-related topics, or have a top-tier sushi spot to recommend in Vancouver? I'd be delighted to connect.",
};

const Layout = ({children}: {children: React.ReactNode}) => children;

export default Layout;
