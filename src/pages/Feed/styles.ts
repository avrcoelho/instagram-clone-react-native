import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IFeed } from './';

export const Container = styled.View`
  flex: 1;
`;

export const FeedList = styled(FlatList as new () => FlatList<IFeed>)``;
