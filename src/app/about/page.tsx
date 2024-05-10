'use client';
import React, { useRef } from 'react';
import { FlexSection } from '@/components/factory';
import {
  Container,
  Flex,
  Text,
  SimpleGrid,
  Image,
  Heading,
  Box,
  Icon,
} from '@chakra-ui/react';
import { Section, HiddenHeading, BrandHeading } from '@/components/factory';
import { SplitText } from '@/components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { FiMapPin } from 'react-icons/fi';

interface FlowCardProps {
  stage: string;
  color: string;
  label: string;
  children: string;
}

const FlowCard = ({ stage, color, label, children }: FlowCardProps) => (
  <Flex
    bg="mono.white"
    p={{ base: '8', xl: '12' }}
    borderRadius="3xl"
    boxShadow="lg"
    h="100%"
    flexDir="column"
    gap="2"
  >
    <Text fontSize="2xl" color={color}>
      {stage}
    </Text>
    <Heading mb="2" size="lg" as="h4">
      {label}
    </Heading>
    <Text>{children}</Text>
  </Flex>
);

const About = () => {
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
  return (
    <Box position="relative">
      <Image
        src="/blur/3.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{ base: '24', lg: '-36' }}
        zIndex="-1"
      />
      <Container maxW="container.xl" ref={container}>
        <Section position="relative">
          <main>
            <Flex alignItems="center" pt={{ base: '48', md: '42' }} minH="90vh">
              <FlexSection flexDir="column" gap="4">
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  gap={{ base: '8', lg: '12' }}
                >
                  <Flex flexDir="column" gap="2" justifyContent="center">
                    <HiddenHeading>About me</HiddenHeading>
                    <BrandHeading overflow="hidden">
                      <SplitText className="animate-header" visibility="hidden">
                        about me.
                      </SplitText>
                    </BrandHeading>
                    <Text maxW="xl">
                      Over the course of four years, I have dedicated myself to
                      the intricacies of developing React web applications, an
                      endeavor that has allowed me to navigate and leverage the
                      capabilities of various meta-frameworks such as NextJS and
                      Gatsby. I have experience developing and publishing
                      component system libraries, building authentication
                      systems, and have leveraged CI/CD systems. Currently, I’m
                      developing a B2B company that allows green energy
                      companies to connect with each other.
                    </Text>
                  </Flex>
                  <Image
                    src="/about/headshot-white.png"
                    borderRadius="3xl"
                    h={{ base: 'sm', sm: 'md', md: 'lg' }}
                    objectPosition="50% 30%"
                    objectFit="cover"
                    w="100%"
                    boxShadow="lg"
                    loading="eager"
                    alt="Elliot Saha"
                  />
                </SimpleGrid>
              </FlexSection>
            </Flex>
          </main>
        </Section>

        <Section my="32" position="relative">
          <BrandHeading>process & workflow.</BrandHeading>
          <SimpleGrid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            my="8"
            spacing="10"
          >
            <FlowCard
              stage="01"
              label="Design & Prototyping"
              color="brand.blue.solid"
            >
              The first stage in building a web application is to design and
              prototype it, allowing you to develop a general theme of the
              application which could vary depending on the audience that the
              product is trying to market towards.
            </FlowCard>
            <FlowCard stage="02" label="Development" color="brand.purple.solid">
              The second stage in building a web application, after the initial
              design and prototyping phase, is development. This phase is marked
              by transitioning from conceptual and visual models to functional
              software. It involves meticulously planned steps enabling the web
              application to scale.
            </FlowCard>
            <FlowCard stage="03" label="Integration" color="brand.green.solid">
              The integration phase is a critical phase in building web
              application development, as it focuses on ensuring that all
              services and APIs the application relies on are seamlessly managed
              across both development and production environments.
            </FlowCard>
            <FlowCard stage="04" label="Management" color="brand.yellow.solid">
              The final phase in building a web application is management, which
              encompasses the ongoing tasks of updating, monitoring, and
              maintaining the application to ensure its optimal performance,
              security, and relevance to users. This stage is crucial for
              sustaining the application&apos;s utility and user satisfaction over
              time.
            </FlowCard>
          </SimpleGrid>
        </Section>

        <Section my="32" position="relative">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
            <Box boxShadow="lg" borderRadius="3xl" position="relative">
              <Image
                src="/about/vancouver.png"
                borderRadius="3xl"
                h={{ base: 'sm', sm: 'lg', md: 'xl' }}
                objectFit="cover"
                w="100%"
                alt="English Bay, Vancouver"
              />
              <Flex
                bg="background"
                position="absolute"
                borderRadius="full"
                bottom="4"
                left="4"
                alignItems="center"
                px="4"
                py="2"
                gap="2"
              >
                <Icon as={FiMapPin} color="mono.black.500" />
                <Text color="mono.black.500">English Bay, Vancouver</Text>
              </Flex>
            </Box>
            <Flex flexDir="column" gap="2" my="auto">
              <BrandHeading>student life.</BrandHeading>
              <Text>
                Currently, I&apos;m a first year student at the University of British
                Columbia, and when I’m not building projects, I’m mostly hanging
                out with friends eating at sushi places in Vancouver or I’m
                drinking coffee at one of the many beaches this city has to
                offer. Before I came here though, I lived in Edmonton, AB where
                the majority of projects were made. I used to volunteer for the
                City of Edmonton Youth Council and worked on various initiatives
                regarding mental health awareness, sexual violence prevention,
                and committee wellbeing.
              </Text>
            </Flex>
          </SimpleGrid>
        </Section>
      </Container>
    </Box>
  );
};

export default About;
