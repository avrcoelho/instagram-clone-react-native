import styled from 'styled-components/native';
import { Animated } from 'react-native';

interface PostImageProps {
  ratio: number;
}

export const Small = styled.ImageBackground<PostImageProps>`
  aspect-ratio: ${({ ratio }) => ratio};
  width: 100%;
`;

export const Original = styled(Animated.Image)<PostImageProps>`
  aspect-ratio: ${({ ratio }) => ratio};
  width: 100%;
`;
