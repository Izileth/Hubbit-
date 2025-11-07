import { View, Text, Pressable, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { useEffect } from "react";

export default function ExploreScreen() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  const anim = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withSpring(0, { damping: 12, stiffness: 110 });
  }, []);

  return (
    <View className="flex-1 bg-black px-6 pt-20">
      <StatusBar style="light" />

      {/* HEADER */}
      <Animated.View style={anim}>
        <Text className="text-white text-3xl font-bold tracking-tight">
          Explorar
        </Text>
        <Text className="text-neutral-500 mt-3">
          Conteúdos selecionados para sua jornada.
        </Text>
      </Animated.View>

      {/* SCROLL LIVRE */}
      <ScrollView
        className="mt-12"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <MinimalLink label="Tendências" href="/explore/trending" />
        <MinimalLink label="Recomendações" href="/explore/recommended" />
        <MinimalLink label="Mentalidade" href="/explore/mindset" />
        <MinimalLink label="Alta Performance" href="/explore/performance" />
        <MinimalLink label="Relacionamentos" href="/explore/relationships" />
        <MinimalLink label="Desenvolvimento Pessoal" href="/explore/self" />
      </ScrollView>
    </View>
  );
}

/* ---------------------------------------
   COMPONENTE MINIMALISTA DE LINK
---------------------------------------- */

interface MinimalLinkProps {
  label: string;
  href: string;
}

function MinimalLink({ label, href }: MinimalLinkProps) {
  const scale = useSharedValue(1);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Link href={href} asChild>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        className="py-4"
      >
        <Animated.Text
          style={anim}
          className="text-white text-xl font-semibold tracking-wide"
        >
          {label}
        </Animated.Text>
      </Pressable>
    </Link>
  );
}
