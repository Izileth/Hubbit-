import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          className="h-[178px] w-[290px] bottom-0 left-0 absolute"
        />
      }>
      <View className="flex-row items-center gap-4">
        <Text className="text-3xl font-bold">Welcome!</Text>
        <HelloWave />
      </View>
      <View className="gap-2 mb-2">
        <Text className="text-xl font-bold">Step 1: Try it</Text>
        <Text>
          Edit <Text className="font-bold">app/(tabs)/index.tsx</Text> to see changes.
        </Text>
      </View>
      <View className="gap-2 mb-2">
        <Link href="/modal">
            <Text className="text-xl font-bold">Step 2: Explore</Text>
        </Link>

        <Text>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </View>
      <View className="gap-2">
        <Text className="text-xl font-bold">Step 3: Get a fresh start</Text>
        <Text>
          {`When you're ready, run `}
          <Text className="font-bold">npm run reset-project</Text> to get a fresh{' '}
          <Text className="font-bold">app</Text> directory. This will move the current{' '}
          <Text className="font-bold">app</Text> to{' '}
          <Text className="font-bold">app-example</Text>.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
