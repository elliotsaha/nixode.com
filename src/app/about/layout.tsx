import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Over the course of four years, I have dedicated myself to the intricacies of developing React web applications, an endeavor that has allowed me to navigate and leverage the capabilities of various meta frameworks such as NextJS and Gatsby.',
};

const Layout = ({children}: {children: React.ReactNode}) => children;

export default Layout;
