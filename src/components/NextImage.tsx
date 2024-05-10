'use client';
import {chakra} from '@chakra-ui/react';
import Image from 'next/image';

export const NextImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop),
});
