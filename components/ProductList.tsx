import React, { useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductItem from './ProductItem';
import { Produkt, ProductListProps } from '../src/types/productTypes';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedRef, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import createAnimatedComponent from 'react-native-reanimated/lib/module/createAnimatedComponent'; // Korrigierter Import

const AnimatedView = createAnimatedComponent(View);

const ProductList: React.FC<ProductListProps> = React.memo(({ produkte, onEdit, onDelete, setProdukte }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const itemRefs = useRef<{ [key: string]: Animated.View | null }>({});

  const onDragEnd = (newProdukte: Produkt[]) => {
    setProdukte(newProdukte);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Produkt; index: number }) => {
      const translateY = useSharedValue(0);
      const isDragging = activeItemId === item.id;

      const panRef = useAnimatedRef<PanGestureHandler>();
      const translation = useSharedValue(0);
      const state = useSharedValue(State.UNDETERMINED);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: withSpring(isDragging ? translation.value : 0) }],
          zIndex: isDragging ? 10 : 1,
        };
      });

      const handleGesture = (event: PanGestureHandlerGestureEvent) => {
        'worklet';
        translation.value = event.nativeEvent.translationY; // Direkter Zugriff auf translationY
      };

      const handleStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.BEGAN) {
          setActiveItemId(item.id);
        } else if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
          setActiveItemId(null);
          const newProdukte = [...produkte];
          const draggedItemIndex = produkte.findIndex((p) => p.id === item.id);
          const targetIndex = draggedItemIndex + Math.round(translateY.value / 80);
          if (targetIndex >= 0 && targetIndex < produkte.length && targetIndex !== draggedItemIndex) {
            newProdukte.splice(draggedItemIndex, 1);
            newProdukte.splice(targetIndex, 0, item);
            onDragEnd(newProdukte);
          }
        }
      };

      return (
        <PanGestureHandler ref={panRef} onGestureEvent={handleGesture} onHandlerStateChange={handleStateChange}>
          <AnimatedView ref={(ref) => { if (ref) { itemRefs.current[item.id] = ref } }} style={[animatedStyle, styles.itemContainer]}>
            <ProductItem
              item={item}
              onEdit={() => onEdit(item.id)}
              onDelete={() => onDelete(item.id)}
            />
          </AnimatedView>
        </PanGestureHandler>
      );
    },
    [produkte, activeItemId]
  );

  return (
    <FlatList
      style={styles.listContainer}
      data={produkte}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
});

export default ProductList;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    maxWidth: 500,
  },
  itemContainer: {
    // Optional: Füge hier Styles für die einzelnen Elemente hinzu, z. B. einen Rand
  },
});