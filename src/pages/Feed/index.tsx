import React, { useState, useEffect } from 'react';

import Post from './Post';

import { Container, FeedList } from './styles';

export interface IFeed {
  id: number;
  image: string;
  small: string;
  aspectRatio: number;
  description: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
}

const Feed: React.FC = () => {
  const [feed, setFeed] = useState<IFeed[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'http://192.168.100.16:3000/feed?_expand=author&_limit=56&_page=1',
      );

      const data = (await response.json()) as IFeed[];

      setFeed(data);
    })();
  }, []);

  console.log(1);

  return (
    <Container>
      <FeedList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({ item: post }) => <Post {...post} />}
      />
    </Container>
  );
};

export default Feed;
