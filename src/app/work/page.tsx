"use client";
import React, { useRef } from "react";
import {
  Box,
  Text,
  Container,
  Flex,
  Grid,
  Link,
  Image,
  Heading,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import {
  FlexSection,
  Section,
  BrandHeading,
  HiddenHeading,
} from "@/components/factory";
import { SplitText } from "@/components";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import axios from "axios";
import { CaseStudy } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getAllCaseStudies = async () => {
  const featured = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/work/caseStudies`,
  );
  return featured.data;
};

const Card = ({ data }: { data: CaseStudy }) => {
  return (
    <GridItem
      as={Link}
      href={`/work/${data.slug}`}
      role="group"
      bg="mono.white"
      position="relative"
      h="100%"
      borderRadius="3xl"
    >
      <Flex
        overflow="hidden"
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="lg"
        borderRadius="3xl"
        h="100%"
      >
        <Flex flexDir="column" px="8" pt="8">
          <Image src={data.icon} h="14" mb="4" mr="auto" alt={data.title} />
          <Heading fontSize="26">{data.title}</Heading>
          <Text
            color="cyan.500"
            textTransform="uppercase"
            letterSpacing="0.25rem"
            fontSize="14"
            mb="1"
            transition="all 0.25s ease-in-out"
            _groupHover={{
              color: "cyan.700",
            }}
          >
            {data.subtitle}
          </Text>
          <Flex position="absolute" right="4" top="4">
            <Flex
              outline="solid"
              justifyContent="center"
              borderRadius="full"
              outlineColor="brand.purple.solid"
              px="3"
            >
              <Text fontWeight="bold" color="brand.purple.solid" fontSize="14">
                {data.year}
              </Text>
            </Flex>
          </Flex>
          <Text fontWeight="normal" mb="8">
            {data.oneLineDescription}
          </Text>
        </Flex>
        <Image
          src={data.cover}
          objectFit="cover"
          borderTopLeftRadius="xl"
          ml="2rem"
          w="100%"
          transition="all 0.25s ease-in-out"
          boxShadow="lg"
          h={{ base: "64", sm: "80", md: "64" }}
          objectPosition="0% top"
          alt={data.title}
        />
      </Flex>
    </GridItem>
  );
};

const Work = () => {
  const container = useRef<HTMLDivElement>(null);

  const { isPending, error, data } = useQuery<Array<CaseStudy>>({
    queryKey: ["all-case-studies"],
    queryFn: getAllCaseStudies,
  });
  useGSAP(
    () => {
      gsap.set(".animate-header", { visibility: "visible" });
      gsap.from(".animate-header", {
        y: 150,
        stagger: {
          each: 0.005,
        },
      });
    },
    { scope: container },
  );

  return (
    <Box position="relative">
      <Image
        src="/blur/4.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{ base: "24", lg: "-36" }}
        zIndex="-1"
      />
      <Container maxW="container.xl" ref={container}>
        <Section position="relative" pb="36">
          <main>
            <Flex
              justifyContent="center"
              justifySelf="center"
              pt={{ base: "48", md: "80" }}
              minH="90vh"
              flexDir="column"
            >
              <FlexSection flexDir="column" gap="4" mb="12">
                <Flex flexDir="column" gap="2" justifyContent="center">
                  <HiddenHeading>Work</HiddenHeading>
                  <BrandHeading overflow="hidden">
                    <SplitText className="animate-header" visibility="hidden">
                      case studies.
                    </SplitText>
                  </BrandHeading>
                  <Text maxW="xl" mt="-6">
                    Nixode showcases a comprehensive collection of case studies,
                    detailing the web applications and digital tools we&apos;ve
                    expertly developed and managed. Each case study provides
                    insights into our approach, the technologies utilized, and
                    the measurable impacts these solutions have had on our
                    clients&apos; operations.
                  </Text>
                </Flex>
              </FlexSection>
              <Grid
                gridTemplateColumns={{
                  base: "100%",
                  md: "1fr 1fr",
                  xl: "1fr 1fr 1fr",
                }}
                gap="8"
                position="relative"
              >
                {isPending &&
                  Array(9)
                    .fill(1)
                    .map((i) => (
                      <Skeleton borderRadius="3xl" w="100%" h="md" key={i} />
                    ))}

                {error && (
                  <Text>
                    An unexpected error occurred. Please try again later.
                  </Text>
                )}

                {data && data.map((i, idx) => <Card data={i} key={idx} />)}
              </Grid>
            </Flex>
          </main>
        </Section>
      </Container>
    </Box>
  );
};

export default Work;
