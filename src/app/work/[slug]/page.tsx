'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Text,
  Container,
  Flex,
  Image,
  Skeleton,
  SkeletonText,
  Icon,
  Link,
} from '@chakra-ui/react';
import { BrandHeading, HiddenHeading } from '@/components/factory';
import { SplitText } from '@/components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import axios from 'axios';
import { CaseStudy } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { FiGithub, FiLink } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CaseStudyDetail = ({ params }: { params: { slug: string } }) => {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getCaseStudy = async () => {
    const featured = await axios.post(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/work/caseStudies/slug`,
      {
        slug: params.slug,
      }
    );
    return featured.data;
  };

  const { isPending, error, data } = useQuery<CaseStudy>({
    queryKey: [`work/${params.slug}`],
    queryFn: getCaseStudy,
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      router.push('/not-found');
    }
  }, [router, error]);

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
    { scope: container, dependencies: [data] }
  );
  return (
    <Box position="relative">
      <Image
        src="/blur/5.png"
        alt="blur"
        w="100%"
        position="absolute"
        loading="eager"
        mt={{ base: '24', md: '-36' }}
        zIndex="-1"
        opacity="70%"
      />
      <Container maxW="container.md">
        <main>
          <Flex
            py={{ base: '48', lg: '64' }}
            minH="100vh"
            flexDir="column"
            gap="8"
          >
            {isPending && (
              <>
                <Skeleton w="70%" h="24" borderRadius="3xl" mt="6" />
                <SkeletonText
                  noOfLines={4}
                  spacing="3"
                  skeletonHeight="3"
                  w="100%"
                />
                <Skeleton w="100%" h="96" borderRadius="3xl" />
                <SkeletonText
                  noOfLines={12}
                  spacing="3"
                  skeletonHeight="3"
                  w="100%"
                />
              </>
            )}
            {data && (
              <Flex
                flexDir="column"
                gap="2"
                justifyContent="center"
                ref={container}
              >
                <HiddenHeading>{data.title}</HiddenHeading>
                <BrandHeading overflow="hidden">
                  <SplitText className="animate-header" visibility="hidden">
                    {data.title}
                  </SplitText>
                </BrandHeading>
                <Flex gap="3">
                  <Flex
                    as={Link}
                    href={data.githubUrl}
                    h="5"
                    alignSelf="center"
                    cursor="pointer"
                    borderRadius="full"
                    outline="solid"
                    outlineColor="mono.black.500"
                    justifyContent="center"
                    alignItems="center"
                    px="2"
                    gap="2"
                  >
                    <Icon as={FiGithub} color="mono.black.500" />
                  </Flex>
                  {data.url && (
                    <Flex
                      h="5"
                      mr="-0.5"
                      alignSelf="center"
                      as={Link}
                      href={data.url}
                      cursor="pointer"
                      borderRadius="full"
                      outline="solid"
                      outlineColor="brand.purple.solid"
                      role="group"
                      justifyContent="center"
                      alignItems="center"
                      px="2"
                      gap="2"
                    >
                      <Icon as={FiLink} color="brand.purple.solid" />
                    </Flex>
                  )}
                  {data.wip && (
                    <Flex
                      outline="solid"
                      justifyContent="center"
                      borderRadius="full"
                      outlineColor="brand.purple.solid"
                      px="3"
                    >
                      <Text fontWeight="bold" color="brand.purple.solid">
                        WIP
                      </Text>
                    </Flex>
                  )}
                  <Flex
                    outline="solid"
                    justifyContent="center"
                    borderRadius="full"
                    outlineColor="brand.blue.solid"
                    px="3"
                  >
                    <Text fontWeight="bold" color="brand.blue.solid">
                      {data.year}
                    </Text>
                  </Flex>
                </Flex>
                <Text>{data.shortDescription}</Text>
                <Image src={data.cover} borderRadius="3xl" my="4" alt={data.title} />
                {data.projectDetails.split('\\n').map((i, idx) => (
                  <Text mb="3" key={idx}>{i}</Text>
                ))}
              </Flex>
            )}
          </Flex>
        </main>
      </Container>
    </Box>
  );
};

export default CaseStudyDetail;
