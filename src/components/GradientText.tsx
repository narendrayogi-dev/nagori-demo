import React from 'react';
import { Text, TextProps } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

type GradientTextProps = TextProps & {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ['#C99616', '#B96B09', '#C99616'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  ...rest
}) => {
  return (
    <MaskedView
      maskElement={
        <Text
          {...rest}
          style={[style, { backgroundColor: 'transparent' }]}
        >
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
      >
        <Text {...rest} style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
