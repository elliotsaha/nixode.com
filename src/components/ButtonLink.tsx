import {ButtonProps, Button, Link, Icon} from '@chakra-ui/react';
import {FiArrowUpRight} from 'react-icons/fi';

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

export const ButtonLink = ({href, ...props}: ButtonLinkProps) => (
  <Button
    size="lg"
    role="group"
    transition="all 0.25s ease-in-out"
    rightIcon={
      <Icon
        as={FiArrowUpRight}
        transition="all 0.25s ease-in-out"
        _groupHover={{
          pl: '0.5',
          pb: '0.5',
        }}
      />
    }
    as={Link}
    href={href}
    {...props}
  >
    {props.children}
  </Button>
);
