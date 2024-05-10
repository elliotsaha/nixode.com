'use client';
import {ThemeProvider} from '.';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Box} from '@chakra-ui/react';

interface ProvidersProps {
  children: JSX.Element;
}

const queryClient = new QueryClient();
export const Providers = ({children}: ProvidersProps) => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Box overflow="hidden">{children}</Box>
    </QueryClientProvider>
  </ThemeProvider>
);
