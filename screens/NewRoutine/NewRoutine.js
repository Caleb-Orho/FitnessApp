import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from 'react-native'

import { note, add2, magnifyingglass, dumbell } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';

export default function NewRoutine({ navigation }) {

    const route = useRoute();
    const [bounce, setBouonce] = useState(false);
    const [routineTitle, setRoutineTitle] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);

    return (
        <View className="h-full px-5">

            {/* The Input */}
            <View className='mt-3 w-full'>
                <View className='flex flex-row jusitfy-between'>
                    <TextInput
                        className={`outline-none text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium text-lg leading-6 w-full flex-1
                    ${bounce ? 'animate-bounce' : ''}`}
                        value={routineTitle}
                        onChangeText={text => setRoutineTitle(text)}
                        placeholder="Routine title"
                    />

                    {routineTitle !== '' && (
                        <TouchableOpacity className="" onPress={() => setRoutineTitle('')}>
                            <Text className='text-gray-400 font-medium text-lg'> Clear </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="border-[1px] border-gray-200 mt-2" />
            </View>

            {/* Get started by adding an exercise to your routine */}
            <View className="flex flex-col items-center justify-center mt-5">
                {selectedExercises.length == 0 ? (
                    <View className="flex flex-col items-center justify-center gap-2">
                        <Image source={dumbell} className='w-14 h-12' alt="add" />
                        <Text className="text-base font-semibold text-gray-400">
                            Get started by adding an exercise to your routine
                        </Text>
                    </View>
                ) : null}
            </View>

            {/* Add exercise button */}
            <TouchableOpacity className='border-[1px] border-gray-200 flex items-center justify-center flex-row rounded-md mt-5 bg-blue-700'
                onPress={() => navigation.navigate("AddExercise")}>
                <Image source={add2} className='w-10 h-9 mr-2' />
                <Text className='text-white font-medium text-base'>Add exercise</Text>
            </TouchableOpacity>

        </View >
    )
}

