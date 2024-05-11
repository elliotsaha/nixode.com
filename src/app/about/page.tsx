"use client";
import React, { useRef } from "react";
import { FlexSection } from "@/components/factory";
import {
  Container,
  Flex,
  Text,
  SimpleGrid,
  Image,
  Heading,
  Box,
  Icon,
} from "@chakra-ui/react";
import { Section, HiddenHeading, BrandHeading } from "@/components/factory";
import { SplitText } from "@/components";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FiMapPin } from "react-icons/fi";

interface FlowCardProps {
  stage: string;
  color: string;
  label: string;
  children: string;
}

const FlowCard = ({ stage, color, label, children }: FlowCardProps) => (
  <Flex
    bg="mono.white"
    p={{ base: "8", xl: "12" }}
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
      gsap.set(".animate-header", { visibility: "visible" });
      gsap.from(".animate-header", {
        y: 75,
        stagger: {
          each: 0.01,
        },
      });
    },
    { scope: container },
  );
  return (
    <Box position="relative">
      <Image
        src="/blur/3.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{ base: "24", lg: "-36" }}
        zIndex="-1"
      />
      <Container maxW="container.xl" ref={container}>
        <Section position="relative">
          <main>
            <Flex alignItems="center" pt={{ base: "48", md: "42" }} minH="90vh">
              <FlexSection flexDir="column" gap="4">
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  gap={{ base: "8", lg: "12" }}
                >
                  <Flex flexDir="column" gap="2" justifyContent="center">
                    <HiddenHeading>About me</HiddenHeading>
                    <BrandHeading overflow="hidden">
                      <SplitText className="animate-header" visibility="hidden">
                        about us.
                      </SplitText>
                    </BrandHeading>
                    <Text maxW="xl" mt="-6">
                      Over the past four years, Nixode has specialized in
                      delivering state-of-the-art digital solutions, focusing on
                      sophisticated design and strategic rebranding initiatives.
                      Our expertise extends to building comprehensive digital
                      infrastructures and enhancing operational efficiencies
                      through advanced automation. We are committed to driving
                      sustainable business growth and fostering meaningful
                      industry collaborations.
                    </Text>
                  </Flex>
                  <Image
                    src="/about/about-page.svg"
                    borderRadius="3xl"
                    objectPosition="50% 30%"
                    objectFit="cover"
                    w="100%"
                    loading="eager"
                    px="12"
                    py="12"
                    alt="Nixode"
                  />
                </SimpleGrid>
              </FlexSection>
            </Flex>
          </main>
        </Section>

        <Section my="32" position="relative">
          <BrandHeading>process & workflow.</BrandHeading>
          <SimpleGrid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            my="8"
            spacing="10"
          >
            <FlowCard
              stage="01"
              label="Conceptualization & Design"
              color="brand.blue.solid"
            >
              At Nixode, we begin every project by understanding its core
              objectives and audience, setting the stage for comprehensive
              solutions that span design, strategy, and user experience. This
              approach ensures our solutions are perfectly tailored to meet
              diverse market needs.
            </FlowCard>
            <FlowCard
              stage="02"
              label="Solution Development"
              color="brand.purple.solid"
            >
              Moving from concept to execution, our development phase
              encompasses the creation of full-spectrum, scalable solutions that
              integrate seamlessly across all required platforms and
              technologies. Our meticulous approach ensures robust functionality
              and future growth potential.
            </FlowCard>
            <FlowCard
              stage="03"
              label="System Integration"
              color="brand.green.solid"
            >
              Critical to our turnkey solutions is the seamless integration of
              various systems and technologies. We ensure that every component
              functions perfectly together, optimizing workflow and enhancing
              overall system reliability across operational environments.
            </FlowCard>
            <FlowCard
              stage="04"
              label="Ongoing Management"
              color="brand.yellow.solid"
            >
              Our engagement doesn&apos;t end at deployment. We provide ongoing
              management services, ensuring our solutions continue to operate at
              peak efficiency. Regular updates, rigorous monitoring, and
              proactive maintenance are part of our commitment to excellence and
              client satisfaction.
            </FlowCard>
          </SimpleGrid>
        </Section>

        <Section my="32" position="relative">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
            <Box borderRadius="3xl" position="relative">
              <Image
                src="/about/about2.svg"
                borderRadius="3xl"
                objectPosition="50% 30%"
                objectFit="cover"
                w="100%"
                loading="eager"
                px="12"
                py="12"
                alt="Nixode"
              />
            </Box>
            <Flex flexDir="column" gap="2" my="auto">
              <BrandHeading>our mission.</BrandHeading>
              <Text>
                At Nixode, our mission is to drive transformative digital
                solutions that empower businesses and enhance user experiences.
                We leverage cutting-edge technologies and innovative strategies
                to deliver turnkey solutions that ensure scalability,
                efficiency, and market leadership. Our commitment to excellence
                and continuous improvement is at the core of our corporate
                ethos, as we strive to set new standards in the industry and
                contribute to our clients&apos; success.
              </Text>
            </Flex>
          </SimpleGrid>
        </Section>
      </Container>
    </Box>
  );
};

export default About;
