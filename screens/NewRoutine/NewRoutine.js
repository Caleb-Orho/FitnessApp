import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Alert } from 'react-native'
import * as FileSystem from 'expo-file-system';
import { note, add2, magnifyingglass, dumbell, threedots, timer, trash } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';
import EditSet from './EditSet';
import TimePicker from './TimePicker';

export default function NewRoutine({ navigation }) {

    const route = useRoute();
    const [bounce, setBouonce] = useState(false);
    const [routineTitle, setRoutineTitle] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [restTime, setRestTime] = useState('OFF');
    const [key, setKey] = useState(0);
    const [del, setDelete] = useState(false);
    const [list] = useState(['W', 'F', 'D', 3]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editSet, setEditSet] = useState(false);
    const [timePick, setTimePicker] = useState(false);

    const [setEditIndex, setSetEditIndex] = useState([-1, -1]); // This is for when we want to edit a set, so the editset sets the selected button based off index.

    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
    }, [del]);

    useEffect(() => {
        if (setEditIndex[0] !== 3) {

            if (setEditIndex[0] == 2) {
                removeItem(setEditIndex[1])
                setSetEditIndex([-1, -1]);
            } else if (setEditIndex[0] == 1) {
                navigation.navigate("ReplaceExercise", { setSelectedExercises, replaceIndex: setEditIndex[1] });
                setSetEditIndex([-1, -1]);
            }

        }
        setDelete(!del);
        // console.log(setEditIndex)
    }, [editSet == false]);

    const removeItem = (indexToRemove) => {
        setSelectedExercises(prevSelectedExercises => prevSelectedExercises.filter((_, index) => index !== indexToRemove));
    };

    const handleSetClick = (outerIndex, innerIndex, index) => {
        if (index == 0) {
            const updatedWorkoutList = [...selectedExercises];
            updatedWorkoutList[outerIndex].setInfo[innerIndex].items[0].value = list[currentIndex] === 3 ? (innerIndex + 1) : list[currentIndex].toString();
            setCurrentIndex((currentIndex + 1) % list.length);
            setDelete(!del);
        }
    }

    const handleInputChange = (outerIndex, innerIndex, index, newValue) => {
        const updatedWorkoutList = [...selectedExercises];
        updatedWorkoutList[outerIndex].setInfo[innerIndex].items[index].value = newValue;
    };

    const save = async () => {
        if (routineTitle === "") {
            Alert.alert('', 'Enter Routine Title', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]);
            return
        }
        // console.log(selectedExercises[0].setInfo);
        try {
            const fileUri = FileSystem.documentDirectory + routineTitle + '.json';
            const jsonData = JSON.stringify(selectedExercises, null, 2);

            await FileSystem.writeAsStringAsync(fileUri, jsonData);

            navigation.navigate("HomeScreen")
            // Optional: Open the file in default viewer (e.g., download manager)
            // await FileSystem.openAsync(fileUri);
        } catch (error) {
            console.error('Error writing file:', error);
        }
    };

    const removeExercise = (outerIndex, indexToRemove) => {
        const updatedWorkoutList = [...selectedExercises[outerIndex].setInfo];
        updatedWorkoutList.splice(indexToRemove, 1);


        updatedWorkoutList.forEach((item, index) => {
            const numericValue = parseFloat(item.items[0].value);
            item.items[0].value = Number.isNaN(numericValue) ? item.items[0].value : index + 1;
        })
        selectedExercises[outerIndex].setInfo = updatedWorkoutList;
        setDelete(!del);
    };

    const addSet = (index) => {
        // Create a new item with default values
        const newItem = {
            items: [
                { subLabel: 'Sets', value: selectedExercises[index].setInfo.length + 1 },
                { subLabel: 'Lbs', value: '-' },
                { subLabel: 'Reps', value: '-' },
            ],
        };

        const updatedWorkoutList = [...selectedExercises[index].setInfo];
        const updatedList = [...updatedWorkoutList, newItem];

        selectedExercises[index].setInfo = updatedList;
        setDelete(!del);
    };

    return (

        <View className="h-full px-5">

            {/* Header */}
            <View className='w-full flex items-center justify-center justify-between flex-row mt-14'>
                <TouchableOpacity className="" onPress={() => navigation.navigate("HomeScreen")}>
                    <Text className='text-gray-400 font-medium text-lg'> Cancel </Text>
                </TouchableOpacity>

                <Text className='text-lg font-bold flex item-center justify-center'>
                    Create Routine
                </Text>

                <TouchableOpacity className="" onPress={() => {
                    save()

                }}>
                    <Text className='text-blue-700 font-medium text-lg'> Save </Text>
                </TouchableOpacity>
            </View>
            <View className="border-[1px] border-gray-200 mt-4" />

            <ScrollView >

                {/* The Input */}
                <View className='mt-5 w-full'>
                    <View className='flex flex-row jusitfy-between'>
                        <TextInput
                            className={"outline-none text-black font-bold placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium text-lg leading-6 w-full flex-1"}
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

                {selectedExercises.map((exercise, index) => (
                    <View className="flex flex-col mb-5">
                        {/* <li key={index}>{exercise.name}</li> */}
                        {/* Exercise TouchableOpacity with three dots */}
                        <View className="flex flex-row items-center justify-between">
                            <TouchableOpacity className="flex flex-row gap-3 items-center"
                                onPress={() => handleExerciseClick(exercise)}>
                                <Image source={{ uri: exercise.photoLink }} alt={exercise.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <Text className="flex flex-col items-start text-blue-700 text-lg font-bold">{exercise.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setEditSet(!editSet)
                                setSetEditIndex(previousIndex => [previousIndex[0], index])
                            }}>

                                <Image source={threedots} className='w-7 h-7' />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            type="text"
                            className="mt-3 outline:none mr-5 text-gray-900 placeholder:text-gray-400 placeholder:font-medium placeholder:text-base"
                            placeholder="Add routine notes here"

                        />

                        {/* Exercise TouchableOpacity with three dots */}
                        <View className="flex flex-row items-center mt-3">
                            <TouchableOpacity className="w-full flex flex-row gap-1 items-center"
                                onPress={() => setTimePicker(!timePick)}>
                                <Image source={timer} alt={exercise.name} className="w-7 h-7" />
                                <Text className="flex flex-col items-start text-blue-700 text-lg font-bold">Rest Timer: {restTime}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sets Div */}

                        <View>
                            <View className="flex flex-row gap-x-20 mt-3">
                                <Text className="text-gray-400 font-medium text-lg"> SET </Text>
                                <Text className="text-gray-400 font-medium text-lg"> LBS </Text>
                                <Text className="text-gray-400 font-medium text-lg"> REPS </Text>
                            </View>

                            {exercise.setInfo.map((exercise, innerIndex) => (
                                <View className="flex flex-row justify-between">
                                    <View className="flex flex-row mt-2 gap-x-20" key={innerIndex}>
                                        {/* <Text>{exercise.label}</Text> */}
                                        {exercise.items.map((item, itemIndex) => (
                                            <View className="">
                                                {itemIndex === 0 ? (
                                                    // Render TouchableOpacity for itemIndex === 0
                                                    <TouchableOpacity
                                                        className="h-6"
                                                        onPress={() => handleSetClick(index, innerIndex, itemIndex)}
                                                    >
                                                        <Text className="w-9 text-gray-400 font-medium text-lg"> {item.value.toString()} </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    // Render TextInput for itemIndex !== 0
                                                    <TextInput
                                                        inputMode={itemIndex === 0 ? '' : 'numeric'}
                                                        key={`input-${key}-${itemIndex}`}
                                                        className="w-9 text-lg outline:none text-black placeholder:text-gray-400 placeholder:font-medium font-bold"
                                                        placeholder={item.value}
                                                        defaultValue={item.value !== '-' ? item.value : ''}
                                                        readOnly={itemIndex === 0}
                                                        onChangeText={text => handleInputChange(index, innerIndex, itemIndex, text)}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    <TouchableOpacity onPress={() => removeExercise(index, innerIndex)}>
                                        <Image source={trash} className='w-7 h-7' />
                                    </TouchableOpacity>
                                </View>
                            ))}


                        </View>
                        {/* Add set TouchableOpacity */}
                        <TouchableOpacity className='border-[1px] border-gray-200 flex items-center justify-center flex-row rounded-md mt-2 bg-gray-200'
                            onPress={() => addSet(index)}>
                            <Image source={add2} className='w-10 h-9' />
                            <Text className='text-white font-medium text-base'> Add Set </Text>
                        </TouchableOpacity>

                    </View>
                ))}

                {/* Add exercise TouchableOpacity */}
                <TouchableOpacity className='border-[1px] border-gray-200 flex items-center justify-center flex-row rounded-md mt-5 bg-blue-700'
                    onPress={() => navigation.navigate("AddExercise", { setSelectedExercises })}>
                    <Image source={add2} className='w-10 h-9 mr-2' />
                    <Text className='text-white font-medium text-base'>Add exercise</Text>
                </TouchableOpacity>

                <EditSet
                    isOpen={editSet}
                    onClose={() => {
                        setEditSet(false)
                    }}
                    setSetEditIndex={(selectedIndex) => {
                        setSetEditIndex(previousIndex => [selectedIndex, previousIndex[1]])
                        setEditSet(false);
                    }}
                />

                <TimePicker
                    isOpen={timePick}
                    onClose={() => {
                        setTimePicker(false)
                    }}
                    setRestTime={(selectedTime) => {
                        setRestTime(selectedTime)
                        setTimePicker(false);
                    }}
                />



            </ScrollView >
        </View >
    )
}

