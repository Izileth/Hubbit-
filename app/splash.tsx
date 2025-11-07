
import { View, Image, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSequence,
  withRepeat,
  runOnJS,
  Easing 
} from 'react-native-reanimated';
import HomeScreen from './index'; // Import the actual HomeScreen
const { height } = Dimensions.get('window');

const SplashScreen = () => {
  const [isSplashing, setIsSplashing] = useState(true);

  const logoY = useSharedValue(-200);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.4);

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);

  const subtitleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(20);

  const dotsOpacity = useSharedValue(0);
  const dotsScale = useSharedValue(0.8);

  const splashOpacity = useSharedValue(1);
  const pageTranslateY = useSharedValue(height);

  // ----------------------------
  // ESTILOS
  // ----------------------------

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: logoY.value },
      { scale: logoScale.value }
    ],
    opacity: logoOpacity.value
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: subtitleOpacity.value
  }));

  const dotsStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
    transform: [{ scale: dotsScale.value }]
  }));

  const pageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pageTranslateY.value }]
  }));

  const splashOverlayStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));

  // ----------------------------
  // ANIMAÇÕES
  // ----------------------------

  const onAnimationFinish = () => {
    setIsSplashing(false);
  };

  const startAnimation = React.useCallback(() => {
    logoOpacity.value = withTiming(1, { duration: 400 });
    logoY.value = withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.back(1.5)) });

    logoScale.value = withDelay(900, withSequence(withTiming(1.05, { duration: 400 }), withTiming(1, { duration: 300 })));

    titleOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    titleY.value = withDelay(600, withTiming(0, { duration: 500 }));

    subtitleOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));
    subtitleY.value = withDelay(900, withTiming(0, { duration: 500 }));

    dotsOpacity.value = withDelay(1300, withTiming(1, { duration: 400 }));
    dotsScale.value = withDelay(1300, withRepeat(withSequence(withTiming(1.1, { duration: 500 }), withTiming(1, { duration: 500 })), -1, true));

    logoY.value = withDelay(2500, withTiming(height * 0.7, { duration: 900, easing: Easing.in(Easing.cubic) }));
    logoOpacity.value = withDelay(2700, withTiming(0, { duration: 300 }));

    titleOpacity.value = withDelay(2500, withTiming(0, { duration: 400 }));
    subtitleOpacity.value = withDelay(2500, withTiming(0, { duration: 400 }));
    dotsOpacity.value = withDelay(2500, withTiming(0, { duration: 300 }));

    pageTranslateY.value = withDelay(3000, withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) }, (finished) => {
      if (finished) {
        splashOpacity.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(onAnimationFinish)();
        });
      }
    }));
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[pageStyle, { flex: 1 }]}>
        <HomeScreen />
      </Animated.View>
{isSplashing && (
  <Animated.View
    pointerEvents="none"
    style={[
      {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        elevation: 50,
        backgroundColor: 'black'
      },
      splashOverlayStyle
    ]}
    className="justify-center items-center"
  >
    <Animated.View style={logoStyle} collapsable={false} className="mb-6">
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/78/9c/33/789c33d16ef055bb3f43ce171fa6779e.jpg' }}
        className="w-28 h-28"
        resizeMode="contain"
      />
    </Animated.View>

    <Animated.View style={titleStyle} collapsable={false}>
      <Text className="text-3xl font-bold text-white">Bem-vindo</Text>
    </Animated.View>

    <Animated.View style={subtitleStyle} collapsable={false} className="mt-1">
      <Text className="text-base text-gray-300 text-center">
        Carregando sua experiência
      </Text>
    </Animated.View>

    <Animated.View style={dotsStyle} collapsable={false} className="flex-row mt-7 gap-2">
      <View className="w-2 h-2 rounded-full bg-blue-500" />
      <View className="w-2 h-2 rounded-full bg-blue-400" />
      <View className="w-2 h-2 rounded-full bg-blue-300" />
    </Animated.View>
  </Animated.View>
)}

    </View>
  );
};

export default SplashScreen;
