"use client";
import React, { useRef, useState } from "react";
import {
  GridItem,
  Heading,
  Text,
  Container,
  Box,
  Icon,
  Link,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import {
  FlexSection,
  Section,
  BrandHeading,
  HiddenHeading,
} from "@/components/factory";
import { ButtonLink, SplitText } from "@/components";
import { FiBox, FiTable, FiLayers, FiMapPin } from "react-icons/fi";
import { IconType } from "react-icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@/types";

interface CardProps {
  title: string;
  children: string;
  icon: IconType;
  color: string;
}

const Card = ({ title, children, icon, color }: CardProps) => {
  return (
    <Flex
      bg="mono.white"
      p={{ base: "8", xl: "12" }}
      borderRadius="3xl"
      flexDir="column"
      boxShadow="lg"
      w="100%"
    >
      <Icon as={icon} color={color} fontSize="36" mb="4" />
      <Heading mb="2" size="lg" as="h3">
        {title}
      </Heading>
      <Text>{children}</Text>
    </Flex>
  );
};

// get featured work
const getFeatured = async () => {
  const featured = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/work/featured`,
  );
  return featured.data;
};

const Home = () => {
  const container = useRef<HTMLDivElement>(null);

  const { isPending, error, data } = useQuery<{
    showcase: CaseStudy;
    featuredLeft: CaseStudy;
    featuredRight: CaseStudy;
  }>({
    queryKey: ["featured-work"],
    queryFn: getFeatured,
  });

  useGSAP(
    () => {
      gsap.set(".animate-header-line-1", { visibility: "visible" });
      gsap.set(".animate-header-line-2", { visibility: "visible" });
      gsap.from(".animate-header-line-1", {
        y: 150,
        stagger: {
          each: 0.005,
        },
      });
      gsap.from(".animate-header-line-2", {
        y: 150,
        stagger: {
          each: 0.015,
        },
      });
    },
    { scope: container },
  );

  return (
    <Box position="relative">
      <Image
        src="/blur/1.png"
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
            <Flex
              h={{ base: "auto", md: "100vh" }}
              alignItems="center"
              pt={{ base: "48", md: "0" }}
              pb={{ base: "24", md: "0" }}
            >
              <FlexSection flexDir="column" gap="4">
                <Flex mb={{ base: "-2", md: "-4" }} alignItems="center" gap="1">
                  <Icon as={FiMapPin} color="mono.gray.500" />
                  <Text>Based in Canada</Text>
                </Flex>
                <Flex flexDir="column" gap="0">
                  <HiddenHeading>
                    Turnkey design solutions for your company
                  </HiddenHeading>
                  <BrandHeading overflow="hidden">
                    <SplitText
                      className="animate-header-line-1"
                      visibility="hidden"
                    >
                      Turnkey design solutions.
                    </SplitText>
                  </BrandHeading>
                </Flex>
                <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }} mt="-4">
                  At Nixode, we deliver comprehensive turnkey solutions,
                  expertly tailored to enhance your digital experience and meet
                  every need.
                </Text>
                <Box mt="2">
                  <ButtonLink href="/contact">get in touch</ButtonLink>
                </Box>
              </FlexSection>
            </Flex>
          </main>
        </Section>

        <Grid
          position="relative"
          gap="8"
          gridTemplateAreas={{
            base: `"gc1"
                                   "gc2"
                                   "gc3"`,
            md: `"gc1 gc2"
                                "gc3 gc3"`,
            lg: '"gc1 gc2 gc3"',
          }}
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gridTemplateRows={{ base: "1fr 1fr 1fr", md: "1fr 1fr", lg: "1fr" }}
          display={{ base: "flex", md: "grid" }}
          flexDirection="column"
        >
          <GridItem area="gc1">
            <Card title="Consistency" icon={FiBox} color="brand.blue.solid">
              Allowing users to predict and navigate interfaces with ease is
              paramount to providing a good user experience.
            </Card>
          </GridItem>
          <GridItem area="gc2">
            <Card
              title="Accessibility"
              icon={FiTable}
              color="brand.green.solid"
            >
              Fostering usability and functionality over aesthetics is the most
              crucial part of designing and building applications.
            </Card>
          </GridItem>
          <GridItem area="gc3">
            <Card title="Management" icon={FiLayers} color="brand.yellow.solid">
              Effective management and consistant collaboration contributes to a
              project&apos;s orderly development and scalability.
            </Card>
          </GridItem>
        </Grid>

        <FlexSection mt="32" flexDir="column" position="relative">
          <BrandHeading as="h2" mb="8">
            featured works.
          </BrandHeading>
          {error && (
            <Text>An unexpected error occurred. Please try again later.</Text>
          )}
          <Grid
            templateAreas={{
              base: `"showcase"
                    "small1"
                    "small2"`,
              lg: `"showcase showcase"
                "small1 small2"`,
            }}
            gridTemplateColumns={{ base: "100%", lg: "1fr 1fr" }}
            gap="8"
          >
            <GridItem
              area="showcase"
              as={Link}
              href={`/work/${data?.showcase?.slug}`}
              role="group"
            >
              {isPending && (
                <Skeleton
                  w="100%"
                  h={{ base: "xl", lg: "96" }}
                  borderRadius="3xl"
                />
              )}
              {data && (
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  bg="mono.white"
                  boxShadow="lg"
                  borderRadius="3xl"
                  position="relative"
                  overflow="hidden"
                >
                  <Flex flexDir="column" p={{ base: "8", lg: "12", xl: "16" }}>
                    <Image
                      src={data.showcase.icon}
                      h="16"
                      mb="4"
                      mr="auto"
                      alt={data.showcase.title}
                    />
                    <Heading size="xl">{data.showcase.title}</Heading>
                    <Text
                      color="brand.blue.solid"
                      transition="all 0.25s ease-in-out"
                      _groupHover={{
                        filter: "brightness(75%)",
                      }}
                      textTransform="uppercase"
                      letterSpacing="0.25rem"
                      mb="2"
                    >
                      {data.showcase.subtitle}
                    </Text>
                    <Text fontWeight="normal">
                      {data.showcase.shortDescription}
                    </Text>
                  </Flex>
                  <Image
                    src={data.showcase.cover}
                    objectFit="cover"
                    mt="auto"
                    borderTopLeftRadius="3xl"
                    mb={{ base: "0rem", sm: "-4rem", lg: "-5rem", xl: "-4rem" }}
                    ml={{ base: "1.8rem", sm: "4rem" }}
                    transition="all 0.25s ease-in-out"
                    boxShadow="lg"
                    alt={data.showcase.title}
                  />
                </SimpleGrid>
              )}
            </GridItem>
            <GridItem
              area="small1"
              as={Link}
              href={`/work/${data?.featuredLeft?.slug}`}
              role="group"
            >
              {isPending && <Skeleton w="100%" h="xl" borderRadius="3xl" />}
              {data && (
                <SimpleGrid
                  columns={1}
                  bg="mono.white"
                  boxShadow="lg"
                  borderRadius="3xl"
                  position="relative"
                  overflow="hidden"
                  h="100%"
                >
                  <Flex flexDir="column" p={{ base: "8", xl: "16" }}>
                    <Image
                      src={data.featuredLeft?.icon}
                      h="14"
                      mb="4"
                      mr="auto"
                      alt={data.featuredLeft?.title}
                    />
                    <Heading size="xl">{data.featuredLeft?.title}</Heading>
                    <Text
                      color="brand.purple.solid"
                      transition="all 0.25s ease-in-out"
                      _groupHover={{
                        filter: "brightness(75%)",
                      }}
                      textTransform="uppercase"
                      letterSpacing="0.25rem"
                      mb="2"
                    >
                      {data.featuredLeft?.subtitle}
                    </Text>
                    <Text fontWeight="normal">
                      {data.featuredLeft?.shortDescription}
                    </Text>
                  </Flex>
                  <Image
                    src={data.featuredLeft?.cover}
                    objectFit="cover"
                    mt="auto"
                    borderTopLeftRadius="3xl"
                    mb={{ base: "0rem", sm: "-4rem" }}
                    ml={{ base: "1.8rem", sm: "4rem" }}
                    transition="all 0.25s ease-in-out"
                    boxShadow="lg"
                    alt={data.featuredLeft?.title}
                  />
                </SimpleGrid>
              )}
            </GridItem>
            <GridItem
              area="small2"
              as={Link}
              href={`/work/${data?.featuredRight?.slug}`}
              role="group"
            >
              {isPending && <Skeleton w="100%" h="xl" borderRadius="3xl" />}
              {data && (
                <SimpleGrid
                  columns={1}
                  bg="mono.white"
                  boxShadow="lg"
                  borderRadius="3xl"
                  position="relative"
                  overflow="hidden"
                  h="100%"
                >
                  <Flex flexDir="column" p={{ base: "8", xl: "16" }}>
                    <Image
                      src={data.featuredRight?.icon}
                      h="16"
                      mb="4"
                      mr="auto"
                      alt={data.featuredRight?.title}
                    />
                    <Heading size="xl">{data.featuredRight?.title}</Heading>
                    <Text
                      color="brand.green.solid"
                      transition="all 0.25s ease-in-out"
                      _groupHover={{
                        filter: "brightness(75%)",
                      }}
                      textTransform="uppercase"
                      letterSpacing="0.25rem"
                      mb="2"
                    >
                      {data.featuredRight?.subtitle}
                    </Text>
                    <Text fontWeight="normal">
                      {data.featuredRight?.shortDescription}
                    </Text>
                  </Flex>
                  <Image
                    src={data.featuredRight?.cover}
                    objectFit="cover"
                    mt="auto"
                    borderTopLeftRadius="3xl"
                    mb={{ base: "0rem", sm: "-4rem" }}
                    ml={{ base: "1.8rem", sm: "4rem" }}
                    transition="all 0.25s ease-in-out"
                    boxShadow="lg"
                    alt={data.featuredRight?.title}
                  />
                </SimpleGrid>
              )}
            </GridItem>
          </Grid>
        </FlexSection>

        <Flex justifyContent="center" my="8">
          <ButtonLink href="/work">see everything</ButtonLink>
        </Flex>

        <Section my="32" position="relative">
          <Image
            src="/blur/2.png"
            alt="blur"
            w="100%"
            position="absolute"
            loading="eager"
            zIndex="-1"
            opacity="70%"
          />
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
            <Image
              src="/about/about.svg"
              borderRadius="3xl"
              objectFit="cover"
              w="100%"
              alt="Nixode"
              px="12"
              py="24"
            />
            <Flex flexDir="column" gap="2" my="auto">
              <BrandHeading>about us.</BrandHeading>
              <Text>
                At Nixode, we are at the forefront of deploying innovative
                digital solutions. Our focus spans social media strategies,
                UI/UX designs, and developing cutting-edge web applications.
                Each project is an opportunity to refine our methodologies and
                push the boundaries of what we can achieve in the digital
                landscape.
              </Text>

              <Box mt="4">
                <ButtonLink href="/about">see more</ButtonLink>
              </Box>
            </Flex>
          </SimpleGrid>
        </Section>
      </Container>
    </Box>
  );
};

export default Home;
