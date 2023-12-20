import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

import { useRoute } from '@react-navigation/native';

export default function WorkoutScreen({ navigation }) {

    const route = useRoute();
    return (
        <View className="h-full items-center justify-center bg-red-100">
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    )
}

