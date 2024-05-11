"use client";
import { Footer as CFooter } from "@/components/factory";
import { Container, Text, Link, Flex } from "@chakra-ui/react";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <CFooter pb="12" position="relative">
      <Container maxW="container.xl">
        <Flex
          gap={{ base: "8", sm: "12", md: "16" }}
          flexDir={{ base: "column", sm: "row" }}
        >
          <Flex flexDir="column">
            <Text variant="active" fontSize="lg">
              nixode.
            </Text>
            <Text mt="2">Copyright &#169; {year}</Text>
          </Flex>
        </Flex>
      </Container>
    </CFooter>
  );
};
