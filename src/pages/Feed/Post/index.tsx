import React from 'react';

import { IFeed } from '../';

import {
  Container,
  Header,
  Avatar,
  Name,
  PostImage,
  Description,
} from './styles';

const Post: React.FC<IFeed> = ({ author, image, description }) => (
  <Container>
    <Header>
      <Avatar source={{ uri: author.avatar }} />
      <Name>{author.name}</Name>
    </Header>

    <PostImage source={{ uri: image }} />

    <Description>
      <Name>{author.name}</Name> {description}
    </Description>
  </Container>
);

export default Post;
