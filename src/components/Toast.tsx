'use client';
import {
  Alert,
  AlertTitle,
  Flex,
  CloseButton,
  ToastProps,
  Icon,
} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import {FiCheckCircle, FiAlertCircle, FiInfo} from 'react-icons/fi';

export const Toast = (props: ToastProps) => {
  const {
    status,
    variant = 'solid',
    id,
    title,
    isClosable,
    onClose,
    colorScheme,
  } = props;

  const ids = id
    ? {
        root: `toast-${id}`,
        title: `toast-${id}-title`,
        description: `toast-${id}-description`,
      }
    : undefined;

  return (
    <Alert
      addRole={false}
      status={status}
      variant={variant}
      id={ids?.root}
      colorScheme={colorScheme}
      borderRadius="3xl"
    >
      <Flex flex="1" maxWidth="100%" flexDir="row" alignItems="center" gap="2">
        {title && (
          <>
            {status === 'info' && <Icon as={FiInfo} fontSize="18" />}
            {status === 'success' && <Icon as={FiCheckCircle} fontSize="18" />}
            {status === 'error' && <Icon as={FiAlertCircle} fontSize="18" />}
            <AlertTitle id={ids?.title}>{title}</AlertTitle>
          </>
        )}
      </Flex>
      {isClosable && (
        <CloseButton
          as={CloseIcon}
          size="sm"
          onClick={onClose}
          position="absolute"
          fill="elements.secondary"
          top={4}
          right={4}
        />
      )}
    </Alert>
  );
};
