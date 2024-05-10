'use client';
import {Footer as CFooter} from '@/components/factory';
import {Container, Text, Link, Flex} from '@chakra-ui/react';

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <CFooter pb="12" position="relative">
      <Container maxW="container.xl">
        <Flex
          gap={{base: '8', sm: '12', md: '16'}}
          flexDir={{base: 'column', sm: 'row'}}
        >
          <Flex flexDir="column">
            <Text variant="active" fontSize="lg">
              elliot saha.
            </Text>
            <Text mt="2">Copyright &#169; {year}</Text>
          </Flex>

          <Flex flexDir="column">
            <Text variant="active" fontSize="lg">
              platforms
            </Text>
            <Flex flexDir="column" gap="2" mt="2">
              <Link href="https://github.com/elliotsaha">Github</Link>
              <Link href="https://www.linkedin.com/in/elliotsaha/">
                LinkedIn
              </Link>
            </Flex>
          </Flex>

          <Flex flexDir="column">
            <Text variant="active" fontSize="lg">
              connect
            </Text>
            <Flex flexDir="column" gap="2" mt="2">
              <Link href="/CV.pdf" download>
                CV
              </Link>
              <Link href="/contact">Contact</Link>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </CFooter>
  );
};
