'use client';
import React, { useRef } from 'react';
import {
  useToast,
  Image,
  Icon,
  Flex,
  Input,
  Box,
  FormErrorMessage,
  FormControl,
  Button,
  SimpleGrid,
  Container,
  Text,
  Grid,
  Heading,
  GridItem,
  Textarea,
} from '@chakra-ui/react';
import { BrandHeading, HiddenHeading } from '@/components/factory';
import { SplitText } from '@/components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { FiMail } from 'react-icons/fi';
import { contactSchema, ContactSchema } from '@/forms';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const Contact = () => {
  const statusToast = useToast({
    containerStyle: {
      borderRadius: 'full',
    },
  });
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set('.animate-header', { visibility: 'visible' });
      gsap.from('.animate-header', {
        y: 75,
        stagger: {
          each: 0.01,
        },
      });
    },
    { scope: container }
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async ({
    first_name,
    last_name,
    email_address,
    message,
  }: ContactSchema) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/contact`,
        {
          first_name,
          last_name,
          email_address,
          message,
        }
      );

      if (res.data) {
        reset();
        statusToast({
          title: res.data.message,
          status: 'success',
        });
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        statusToast({
          title: 'An unexpected error has occurred',
          status: 'error',
        });
      }
    }
  };

  return (
    <Box position="relative">
      <Image
        src="/blur/6.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{ base: '24', lg: '-42', xl: '-96' }}
        zIndex="-1"
      />
      <Container maxW="container.xl" ref={container}>
        <main>
          <Flex alignItems="center" py={{ base: '48', lg: '58' }} minH="100vh">
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              gap={{ base: '8', md: '10', lg: '12' }}
            >
              <Flex flexDir="column" gap="2" justifyContent="center">
                <HiddenHeading>Contact me</HiddenHeading>
                <BrandHeading overflow="hidden">
                  <SplitText className="animate-header" visibility="hidden">
                    contact.
                  </SplitText>
                </BrandHeading>
                <Text maxW="xl">
                  Interested in discussing a collaborative project, seeking
                  advice on tech-related topics, or have a top-tier sushi spot
                  to recommend in Vancouver? I&apos;d be delighted to connect.
                </Text>
                <Flex alignItems="center" gap="2" mt="4">
                  <Icon as={FiMail} color="mono.black.500" fontSize="18" />
                  <Text color="mono.black.500" fontWeight="medium">
                    contact@elliotsaha.com
                  </Text>
                </Flex>
              </Flex>
              <Flex
                justifySelf={{ base: 'flex-start', lg: 'center' }}
                bg="mono.white"
                borderRadius="3xl"
                boxShadow="lg"
                p={{ base: '8', lg: '12' }}
                flexDir="column"
                w={{ base: '100%', xl: 'lg' }}
              >
                <Heading as="h2" size="lg" mb="4">
                  Get in touch
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    gap="4"
                    templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                    templateAreas={{
                      base: `"first-name" 
                         "last-name" 
                         "email-address" 
                         "message"`,
                      md: `"first-name last-name" 
                       "email-address email-address" 
                       "message message"`,
                    }}
                  >
                    <GridItem area="first-name">
                      <FormControl isInvalid={Boolean(errors.first_name)}>
                        <Input
                          borderRadius="full"
                          size="lg"
                          placeholder="First Name"
                          isDisabled={isSubmitting}
                          {...register('first_name')}
                        />
                        <FormErrorMessage ml="4">
                          {errors?.first_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem area="last-name">
                      <FormControl isInvalid={Boolean(errors.last_name)}>
                        <Input
                          borderRadius="full"
                          size="lg"
                          placeholder="Last Name"
                          isDisabled={isSubmitting}
                          {...register('last_name')}
                        />
                        <FormErrorMessage ml="4">
                          {errors?.last_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem area="email-address">
                      <FormControl isInvalid={Boolean(errors.email_address)}>
                        <Input
                          borderRadius="full"
                          placeholder="Email Address"
                          size="lg"
                          type="email"
                          isDisabled={isSubmitting}
                          {...register('email_address')}
                        />
                        <FormErrorMessage ml="4">
                          {errors?.email_address?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem area="message">
                      <FormControl isInvalid={Boolean(errors.message)}>
                        <Textarea
                          size="lg"
                          placeholder="Message"
                          resize="none"
                          rows={5}
                          isDisabled={isSubmitting}
                          {...register('message')}
                        />
                        <FormErrorMessage ml="4">
                          {errors?.message?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Button
                      size="lg"
                      mt="4"
                      type="submit"
                      isLoading={isSubmitting}
                      spinnerPlacement="end"
                    >
                      send message
                    </Button>
                  </Box>
                </form>
              </Flex>
            </SimpleGrid>
          </Flex>
        </main>
      </Container>
    </Box>
  );
};

export default Contact;
