import { BoxProps, Box } from "@chakra-ui/react";

interface SplitTextProps extends BoxProps {
  children: string;
}

export const SplitText = ({ children, ...props }: SplitTextProps) => {
  return (
    <>
      {children.split(/\s/).map((word, idx) => (
        <Box
          key={idx}
          display="inline-block"
          whiteSpace="nowrap"
          overflowY="hidden"
        >
          {word.split("").map((letter, lIdx) => (
            <Box key={`${idx}-${lIdx}`} display="inline-block" {...props}>
              {letter}
            </Box>
          ))}
          <Box pr={{ base: "3", md: "6" }} display="inline-block" />
        </Box>
      ))}
    </>
  );
};
