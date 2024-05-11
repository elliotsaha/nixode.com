"use client";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Space_Grotesk } from "next/font/google";
import { Toast } from "@/components";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  fonts: {
    heading: spaceGrotesk.style.fontFamily,
    body: spaceGrotesk.style.fontFamily,
  },
  colors: {
    background: "#FEFBF5",
    mono: {
      black: {
        100: "#4c4c4c",
        500: "#1F1F1F",
        900: "#090909",
      },
      gray: {
        100: "#D4D4D4",
        500: "#5E5E5E",
        900: "#424242",
      },
      white: "rgba(255, 255, 255, 85%)",
    },
    brand: {
      green: {
        solid: "#70CA79",
        blur: "#A7EDAE",
      },
      blue: {
        solid: "#5EBBFF",
        blur: "#A1D8FF",
      },
      purple: {
        solid: "#CE9DF4",
        blur: "#E5D1F5",
      },
      yellow: {
        solid: "#FFD770",
        blur: "#EBD8A7",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        px: { base: "4", sm: "8" },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
    Text: {
      variants: {
        description: {
          color: "mono.gray.500",
          fontWeight: "regular",
        },
        active: {
          color: "mono.black.500",
          fontWeight: "bold",
        },
      },
      defaultProps: {
        variant: "description",
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "24",
        _hover: {
          color: "mono.white",
        },
      },
      defaultProps: {
        colorScheme: "mono.black",
      },
    },
    Flex: {
      variants: {
        center: {
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "mono.gray.500",
        fontWeight: "medium",
        _hover: {
          textDecoration: "none",
          color: "mono.gray.900",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "mono.gray.100",
            borderWidth: "1.5px",
            _hover: {
              borderColor: "mono.gray.100",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          px: "4",
          py: "3",
          borderColor: "mono.gray.100",
          borderWidth: "1.5px",
          borderRadius: "3xl",
          _hover: {
            borderColor: "mono.gray.100",
          },
        },
      },
    },
  },
});

export const ThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { render: Toast } }}
    >
      {children}
    </ChakraProvider>
  );
};
