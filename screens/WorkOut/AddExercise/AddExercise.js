import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, TextInput, Image, ScrollView } from 'react-native'
import { search } from "../../../assets/SVG";
import { useRoute } from '@react-navigation/native';

import bicepExercises from "../../../assets/Exercises/Biceps";
import chestExercises from '../../../assets/Exercises/Chest';
import tricepExercises from '../../../assets/Exercises/Tricept';
import shoulderExercises from '../../../assets/Exercises/Shoulder';
import backExercises from '../../../assets/Exercises/Back';

import AllEquipment from './Equipment';
import AllMuscle from './Muscle';

export default function AddExercise({ navigation }) {

    const route = useRoute();
    const [searchQuery, setSearchQuery] = useState('');
    const [targetedMuscle, setTargetedMuscle] = useState('All Muscles');
    const [equipment, setEquipment] = useState('All Equipment');
    const [filteredExercises, setFilteredExercises] = useState([]);
    //const [localSelectedExercises, setLocalSelectedExercises] = useState([]);
    const [openAllEquipment, setOpenAllEquipment] = useState(false);
    const [openAllMuscle, setOpenAllMuscle] = useState(false);
    const allExercises = [...bicepExercises, ...chestExercises, ...tricepExercises, ...shoulderExercises, ...backExercises];

    const { setSelectedExercises } = route.params;
    const { screenName } = route.params;

    const [localSelectedExercises, setLocalSelectedExercises] = useState([]);

    useEffect(() => {
        const filteredExercises = allExercises
            .filter((exercise) => {
                // Exclude exercises with targetMuscle "All Muscles"
                if (targetedMuscle === "All Muscles") {
                    return true;
                }

                // Filter by targetedMuscle if it's not empty
                if (equipment && equipment !== "All Equipment") {
                    return (
                        exercise.equipment.toLowerCase() === equipment.toLowerCase() &&
                        exercise.targetMuscle.toLowerCase() === targetedMuscle.toLowerCase()
                    );
                } else {
                    return exercise.targetMuscle.toLowerCase() === targetedMuscle.toLowerCase();
                }
            })
            .filter((exercise) =>
                exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredExercises(filteredExercises);

    }, [targetedMuscle, equipment, searchQuery]);

    const handleExerciseClick = (index) => {
        // Check if the exercise is already selected
        if (localSelectedExercises.includes(index)) {
            // Remove the exercise from the selected list
            setLocalSelectedExercises(localSelectedExercises.filter((item) => item !== index));
            // setSelectedExercisesSend(localSelectedExercises.map(selectedIndex => allExercises[selectedIndex]));
        } else {
            // Add the exercise to the selected list
            setLocalSelectedExercises(prevSelected => [...prevSelected, index]);
        }
    };

    const handleAdd = () => {
        const selectedExerciseDetails = localSelectedExercises.map(selectedIndex => {
            const { name, photoLink } = allExercises[selectedIndex];
            const uniqueSetInfo = [
                {
                    items: [
                        { subLabel: 'Sets', value: 1 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                },
                {
                    items: [
                        { subLabel: 'Sets', value: 2 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                }
            ];

            return { name, photoLink, setInfo: uniqueSetInfo };
        });

        setSelectedExercises(prevSelectedExercises => [
            ...prevSelectedExercises,
            ...selectedExerciseDetails
        ]);


        //navigation.navigate("NewRoutine")
        navigation.goBack()
    }

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-center justify-between flex-row mt-14'>
                <TouchableOpacity className="" onPress={() => navigation.goBack()}>
                    <Text className='text-gray-400 font-medium text-lg'> Cancel </Text>
                </TouchableOpacity>

                <Text className='text-lg font-bold flex item-center justify-center'>
                    Add Exercise
                </Text>

                <TouchableOpacity className="" onPress={() => ''}>
                    <Text className='text-blue-700 font-medium text-lg opacity-0'> Create </Text>
                </TouchableOpacity>
            </View>
            <View className="border-[1px] border-gray-200 mt-4" />

            {/* Search Input */}
            <View className="w-full mt-5">
                <View className="flex flex-row items-center bg-gray-200 rounded-md">
                    <Image source={search} className='w-7 h-7 ml-3' alt="add" />
                    <TextInput
                        className="text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium text-lg pl-3 flex-1 w-full h-10"
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        placeholder="Search exercise"
                    />
                </View>
            </View>

            {/* TouchableOpacitys */}
            <View className='flex flex-row h-8 mt-5 items-center gap-x-5 w-fit'>
                <TouchableOpacity className='border-[1px] border-gray-200 rounded-md flex items-center justify-center rounded h-10 flex-1 '
                    onPress={() => setOpenAllEquipment(true)}>
                    <Text className='text-black font-medium text-sm'> {equipment == '' ? "All Equipment" : equipment}  </Text>
                </TouchableOpacity>

                <TouchableOpacity className='border-[1px] border-gray-200 rounded-md flex items-center justify-center rounded h-10 flex-1 '
                    onPress={() => setOpenAllMuscle(true)}>
                    <Text className='text-black font-medium text-sm'> {targetedMuscle == '' ? "All Muscles" : targetedMuscle} </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="mt-5">
                {searchQuery === '' ? (
                    // Display all exercises when there's no search query
                    filteredExercises.map((exercise, index) => (
                        <View key={index}>
                            <TouchableOpacity className="w-full flex flex-row items-center"
                                onPress={() => handleExerciseClick(index)}>
                                <View className={`border-l-4 ${localSelectedExercises.includes(index) ? 'border-blue-700 ml-5 mr-2 h-14' : ''} rounded`} />
                                <Image source={exercise.photoLink} className="w-14 h-14 rounded-full" />
                                <View className="flex flex-col items-start ml-5">
                                    <Text className="text-black text-base font-semibold">{exercise.name}</Text>
                                    <Text className="text-gray-400 text-sm">{exercise.targetMuscle}</Text>
                                </View>
                            </TouchableOpacity>
                            <View className="border-[1px] border-gray-200 mt-3 mb-3 ml-5 mr-5" />
                        </View>
                    ))
                ) : (
                    // Display filtered exercises when there's a search query
                    filteredExercises.map((exercise, index) => (
                        <View key={index}>
                            <TouchableOpacity className="w-full flex flex-row items-center"
                                onPress={() => handleExerciseClick(index)}>
                                <View className={`border-l-4 ${localSelectedExercises.includes(index) ? 'border-blue-700 ml-5 mr-2 h-14' : ''} rounded`} />
                                <Image source={{ uri: exercise.photoLink }} alt={exercise.name} className="w-14 h-14 rounded-full" />
                                <View className="flex flex-col items-start ml-5">
                                    <Text className="text-black text-base font-semibold">{exercise.name}</Text>
                                    <Text className="text-gray-400 text-sm">{exercise.targetMuscle}</Text>
                                </View>
                            </TouchableOpacity>
                            <View className="border-[1px] border-gray-200 mt-3 mb-3 ml-5 mr-5" />
                        </View>
                    ))
                )}
            </ScrollView>

            {localSelectedExercises.length !== 0 && (
                <View className="fixed bottom-0 left-0 right-0 mb-5">
                    <View className="w-full ">
                        <TouchableOpacity className="bg-blue-700 w-full rounded h-8 flex items-center justify-center"
                            onPress={() => handleAdd()} >
                            <Text className='text-white text-base font-semibold '>Add {localSelectedExercises.length} exercises</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <AllEquipment
                isOpen={openAllEquipment}
                onClose={() => {
                    setOpenAllEquipment(false)
                }}
                setEquipment={(selectedEquipment) => {
                    setEquipment(selectedEquipment)
                    setOpenAllEquipment(false);
                }}
            />

            <AllMuscle
                isOpen={openAllMuscle}
                onClose={() => {
                    setOpenAllMuscle(false)
                }}
                setMuscleGroup={(selectedMuscle) => {
                    setTargetedMuscle(selectedMuscle)
                    setOpenAllMuscle(false);
                }}
            />
        </View>
    )
}

