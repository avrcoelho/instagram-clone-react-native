import React from 'react';

import { IFeed } from '../';
import LazyImage from '../../../components/LazyImage';

import { Container, Header, Avatar, Name, Description } from './styles';

interface Props extends IFeed {
  shouldLoad: boolean;
}

const Post: React.FC<Props> = ({
  author,
  image,
  description,
  aspectRatio,
  small,
  shouldLoad,
}) => (
  <Container>
    <Header>
      <Avatar source={{ uri: author.avatar }} />
      <Name>{author.name}</Name>
    </Header>

    <LazyImage
      aspectRatio={aspectRatio}
      smallSource={{ uri: small }}
      source={{ uri: image }}
      shouldLoad={shouldLoad}
    />

    <Description>
      <Name>{author.name}</Name> {description}
    </Description>
  </Container>
);

export default Post;
