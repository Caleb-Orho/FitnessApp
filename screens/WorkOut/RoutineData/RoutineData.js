import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { backButton } from "../../../assets/SVG";

export default function RoutineData({ navigation }) {

    const route = useRoute();
    const { routinePath } = route.params;
    const [routine, setRoutine] = useState([])

    const [setNumber, setSetNumber] = useState(0);
    const [Volume, setVolume] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            try {
                const directoryUri = FileSystem.documentDirectory + "/routines/" + routinePath;
                try {
                    const jsonData = await FileSystem.readAsStringAsync(directoryUri, {
                        encoding: FileSystem.EncodingType.UTF8,
                    });

                    const lastFileData = JSON.parse(jsonData);

                    // Set the state with the content of the last file
                    setRoutine(lastFileData);
                } catch (error) {
                    console.error('Error reading last file:', error);
                }
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        };

        loadData();
    }, []);

    // Calculate Volume
    useEffect(() => {
        // Calculate volume whenever 'routine' changes
        const calculatedVolume = routine.reduce((acc, exercise) => {
            return acc + exercise.setInfo.reduce((exerciseAcc, sets) => {
                // Convert the value to an integer using parseInt
                const valueAsInt = parseInt(sets.items[1].value, 10);
                return exerciseAcc + valueAsInt;
            }, 0);
        }, 0);

        setVolume(calculatedVolume);
    }, [routine]);

    // Calculate Set Number
    useEffect(() => {
        // Calculate volume whenever 'routine' changes
        const calculatedVolume = routine.reduce((acc, exercise) => {
            return acc + exercise.setInfo.reduce((exerciseAcc, sets) => {
                // Convert the value to an integer using parseInt
                const valueAsInt = parseInt(sets.items[2].value, 10);
                return exerciseAcc + valueAsInt;
            }, 0);
        }, 0);

        setSetNumber(calculatedVolume);
    }, [routine]);

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-center justify-between flex-row mt-14'>

                <TouchableOpacity className="" onPress={() => navigation.goBack()}>
                    <Image source={backButton} className='w-7 h-6' />
                </TouchableOpacity>


                <Text className='text-black font-semibold text-lg'> Workout Log </Text>
            </View>

            <View className="border-[1px] border-gray-300 mt-4" />

            <ScrollView >
                {/* The Volume and Sets */}
                <View className='flex items-center flex-row gap-x-16 mt-5'>

                    <View className='flex flex-col'>
                        <Text className='text-sm font-medium text-gray-400'>Total Volume</Text>
                        <Text className='text-lg text-black font-semibold'> {Volume} </Text>
                    </View>

                    <View className='flex flex-col'>
                        <Text className='text-sm font-medium text-gray-400'>Total Sets</Text>
                        <Text className='text-lg text-black font-semibold'> {setNumber} </Text>
                    </View>
                </View>

                <View className="border-[1px] border-gray-200 mt-4" />

                {routine.map((exercise, index) => (
                    <View className="flex flex-col mt-5">

                        <View className="flex flex-row items-center justify-between">
                            <View className="flex flex-row gap-3 items-center">
                                <Image source={{ uri: exercise.photoLink }} alt={exercise.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <Text className="flex flex-col items-start text-blue-700 text-lg font-bold">{exercise.name}</Text>
                            </View>
                        </View>

                        <TextInput
                            type="text"
                            className="mt-3 outline:none mr-5 text-gray-900 placeholder:text-gray-400 placeholder:font-medium placeholder:text-base"
                            placeholder="Add routine notes here"
                        />

                        {/* Sets Div */}
                        <View>
                            <View className="flex flex-row gap-x-10 mt-3">
                                <Text className="text-gray-400 font-medium text-lg"> SET </Text>
                                <Text className="text-gray-400 font-medium text-lg"> LBS </Text>
                                <Text className="text-gray-400 font-medium text-lg"> REPS </Text>
                            </View>

                            {exercise.setInfo.map((sets, innerIndex) => (

                                <View className="flex flex-row mt-2 h-8" key={innerIndex}>

                                    {sets.items.map((item) => (
                                        <View className="flex flex-row items-center">
                                            <TextInput
                                                className="text-lg outline:none text-black placeholder:text-gray-400 placeholder:font-medium font-bold w-6 mr-12"
                                                defaultValue={item.value.toString()}
                                                readOnly={true}
                                            />
                                        </View>
                                    ))}
                                    {/* {console.log(exercise.setInfo[innerIndex].items[1].value)} */}

                                    {/* {setVolume((prevVolume) => prevVolume + exercise.setInfo[innerIndex].items[1].value)} */}
                                </View>
                            ))}
                        </View>

                    </View>
                ))
                }
            </ScrollView >
        </View >
    )
}

