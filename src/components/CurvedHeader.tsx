import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import { UnistylesRuntime } from 'react-native-unistyles';
import { useInsets } from '../hooks/useInsets';

type CurvedHeaderProps = {
  height?: number;
  curveDepth?: number;
  colors?: [string, string];
  children?: React.ReactNode;
};

const SCREEN_WIDTH = UnistylesRuntime.screen.width;

const CurvedHeader = ({
  height = UnistylesRuntime.screen.height * 0.3,
  curveDepth = 80,
  colors = ['#F7F3E9', '#CC9B18'],
  children,
}: CurvedHeaderProps) => {
  const { top } = useInsets();

  return (
    <View>
      <Svg
        width={SCREEN_WIDTH}
        height={height + curveDepth}
        viewBox={`0 0 ${SCREEN_WIDTH} ${height + curveDepth}`}
      >
        <Defs>
          <SvgGradient id="curvedGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[1]} />
          </SvgGradient>
        </Defs>

        <Path
          d={`
            M 0 0
            L 0 ${height}
            Q ${SCREEN_WIDTH / 2} ${height + curveDepth}
              ${SCREEN_WIDTH} ${height}
            L ${SCREEN_WIDTH} 0
            Z
          `}
          fill="url(#curvedGradient)"
        />
      </Svg>

      {/* Overlay content */}
      <View
        style={{
          position: 'absolute',
          top,
          left: 0,
          right: 0,
          height,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CurvedHeader;
