import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function HomeScreen() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  const containerAnim = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
    translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
  }, []);

  return (
    <View className="flex-1 bg-black px-6 pt-20">
      <StatusBar style="light" />

      {/* Título principal */}
      <Animated.View style={containerAnim}>
        <Text className="text-white text-4xl font-bold tracking-tight leading-tight">
          Potencial{"\n"}
          <Text className="text-neutral-400">Sem Limites</Text>
        </Text>

        <Text className="text-neutral-500 mt-4 text-base leading-relaxed">
          Evolução começa com pequenos passos.  
          Escolha para onde deseja ir.
        </Text>
      </Animated.View>

      {/* Links soltos e minimalistas */}
      <View className="mt-14 space-y-8">

        <MinimalLink label="Explorar" href="/explore" />
        <MinimalLink label="Perfil" href="/profile" />
        <MinimalLink label="Configurações" href="/settings" />

      </View>
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

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Link href={href} asChild>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <Animated.View style={animated}>
          <Text className="text-white text-xl font-semibold tracking-wide">
            {label}
          </Text>
        </Animated.View>
      </Pressable>
    </Link>
  );
}
