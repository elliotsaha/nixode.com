"use client";
import { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Text,
  Link,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  useBreakpoint,
} from "@chakra-ui/react";
import { Nav, CenterSection, FlexSection } from "@/components/factory";
import { FiMenu } from "react-icons/fi";

const Links = () => {
  type Navlink = { label: string; href: string };

  const navLinks = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "work", href: "/work" },
  ];

  return (
    <>
      {navLinks.map((link: Navlink) => (
        <Link
          href={link.href}
          fontSize={{ sm: "md", lg: "lg" }}
          color={{ base: "white", sm: "mono.gray.500" }}
          _hover={{
            color: { base: "mono.gray.100", sm: "mono.black.500" },
          }}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const breakpoint = useBreakpoint();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen && breakpoint !== "base") {
      onClose();
    }
  }, [breakpoint, isOpen, onClose]);

  const scrollCssProps = {
    bg: "white",
    px: "6",
    mt: "4",
    borderRadius: "full",
    boxShadow: "lg",
  };

  return (
    <Nav display="block" zIndex="banner" position="fixed" w="100%">
      <Container maxW="container.xl">
        <SimpleGrid
          templateColumns={{ base: "1fr 1fr", md: "1fr 2fr 1fr" }}
          py="4"
          transition="all 0.25s ease-in-out"
          sx={scrollPosition > 0 ? scrollCssProps : {}}
        >
          <FlexSection
            alignItems="center"
            display={{ base: "flex", sm: "none", md: "flex" }}
          >
            <Text
              as={Link}
              href="/"
              variant="active"
              fontSize={{ base: "lg", sm: "md", lg: "lg" }}
            >
              nixode.
            </Text>
          </FlexSection>
          <CenterSection
            gap="10"
            display={{ base: "none", sm: "flex" }}
            justifyContent={{ sm: "flex-start", md: "center" }}
          >
            <Links />
          </CenterSection>{" "}
          <FlexSection
            alignItems="center"
            justifyContent="flex-end"
            display={{ base: "none", sm: "flex" }}
          >
            <Button as={Link} size={{ base: "md", lg: "lg" }} href="/contact">
              contact
            </Button>
          </FlexSection>
          <FlexSection
            display={{ base: "flex", sm: "none" }}
            justifyContent="flex-end"
          >
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              onClick={onOpen}
            />
          </FlexSection>
        </SimpleGrid>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          isCentered
          blockScrollOnMount={true}
        >
          <ModalOverlay backdropFilter="auto" backdropBlur="10px" />
          <ModalContent bg="transparent" boxShadow="none" color="white" mx="8">
            <ModalCloseButton size="lg" />
            <ModalBody>
              <FlexSection flexDir="column" gap="4" fontSize="2xl">
                <Links />
                <Link
                  href="/contact"
                  color="white"
                  _hover={{
                    color: "mono.gray.100",
                  }}
                >
                  contact
                </Link>
              </FlexSection>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Nav>
  );
};
