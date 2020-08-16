import React, { useState, useEffect, useCallback } from 'react';

import Post from './Post';

import { Container, FeedList, Loading } from './styles';
import { ViewToken } from 'react-native';

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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState<number[]>([]);

  const loadPage = useCallback(
    async (pageNumber = page, shouldRefresh = false) => {
      if (total && pageNumber > total) {
        return;
      }

      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
      );

      const data = (await response.json()) as IFeed[];
      const totalItems = response.headers.get('X-Total-Count');

      setTotal(Math.floor(Number(totalItems) / 5));
      setFeed(prevState => (shouldRefresh ? data : [...prevState, ...data]));
      setPage(pageNumber + 1);
      setLoading(false);
    },
    [total, page],
  );

  useEffect(() => {
    loadPage();
  }, []);

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }, []);

  const handleViewableChanged = useCallback(
    ({ changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setViewable(changed.map(({ item }: { item: IFeed }) => item.id));
    },
    [],
  );

  return (
    <Container>
      <FeedList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({ item: post }) => (
          <Post shouldLoad={viewable.includes(post.id)} {...post} />
        )}
        onEndReached={() => !loading && loadPage()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Loading /> : null}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
      />
    </Container>
  );
};

export default Feed;
