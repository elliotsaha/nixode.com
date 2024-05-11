"use client";
import { chakra } from "@chakra-ui/react";

export const Nav = chakra("nav");
export const Section = chakra("section");
export const FlexSection = chakra("section", {
  baseStyle: { display: "flex" },
});
export const CenterSection = chakra("section", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export const Footer = chakra("footer");

export const Body = chakra("body", {
  // can't use color from themeprovider
  // because it renders after body
  baseStyle: {
    bg: "#FEFBF5",
    overflowX: "hidden",
  },
});

export const BrandHeading = chakra("h1", {
  baseStyle: {
    fontSize: { base: "36", sm: "48", md: "64", lg: "82" },
    lineHeight: "1.1",
  },
});

// useful for displaying text simply for SEO purposes
export const HiddenHeading = chakra("h1", {
  baseStyle: {
    fontSize: "0",
    visibility: "hidden",
  },
});
