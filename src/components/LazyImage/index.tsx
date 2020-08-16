import React, { useCallback, useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

interface Uri {
  uri: string;
}

interface Props {
  smallSource: Uri;
  source: Uri;
  aspectRatio: number;
  shouldLoad: boolean;
}

const LazyImage: React.FC<Props> = ({
  smallSource,
  source,
  aspectRatio,
  shouldLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [shouldLoad]);

  const handleAnimate = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={2}
    >
      {loaded && (
        <Original
          style={{ opacity }}
          source={source}
          ratio={aspectRatio}
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
};

export default LazyImage;
