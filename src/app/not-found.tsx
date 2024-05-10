'use client';
import {Image, Container, Box, Text} from '@chakra-ui/react';
import {BrandHeading, FlexSection} from '@/components/factory';
import {ButtonLink} from '@/components';

const NotFoundPage = () => {
  return (
    <Box position="relative">
      <Image
        src="/blur/1.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{base: '-24', sm: '-96'}}
        zIndex="-1"
      />
      <Container maxW="container.xl">
        <FlexSection
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          my="96"
          position="relative"
        >
          <Box>
            <BrandHeading textAlign="center" mb="2">
              404
            </BrandHeading>
            <Text mb="6" textAlign="center" maxW="48" mx="auto" mt="-2">
              It looks like your lost...
            </Text>
            <ButtonLink href="/">go back home</ButtonLink>
          </Box>
        </FlexSection>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
