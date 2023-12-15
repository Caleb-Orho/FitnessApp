import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native'
import { note, add, magnifyingglass, triangleright, threedots, timer, trash, add2 } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../App';
import * as FileSystem from 'expo-file-system';
import Checkbox from 'expo-checkbox';
import EditSet from '../NewRoutine/EditSet';

export default function StartRoutine({ navigation }) {

    const route = useRoute();
    const { routineName } = route.params;
    const [routine, setRoutine] = useState([])
    const [restTime, setRestTime] = useState('OFF');
    const [key, setKey] = useState(0);
    const [list] = useState(['W', 'F', 'D', 3]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [del, setDelete] = useState(false);
    const [editSet, setEditSet] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [setEditIndex, setSetEditIndex] = useState([-1, -1]);
    const [checkedCount, setCheckedCount] = useState(0);

    // console.log(routine)

    useEffect(() => {
        if (setEditIndex[0] !== 3) {

            if (setEditIndex[0] == 2) {
                removeItem(setEditIndex[1])
                setSetEditIndex([-1, -1]);
            } else if (setEditIndex[0] == 1) {
                navigation.navigate("ReplaceExercise", { setSelectedExercises: setRoutine, replaceIndex: setEditIndex[1] });
                setSetEditIndex([-1, -1]);
            }

        }
        setDelete(!del);
    }, [editSet == false]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const directoryUri = FileSystem.documentDirectory + "/routines/" + routineName + "/";

                // Get a list of files in the directory
                const files = await FileSystem.readDirectoryAsync(directoryUri);

                try {
                    const jsonData = await FileSystem.readAsStringAsync(directoryUri + files[files.length - 1], {
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

    const [isCheckedArray, setIsCheckedArray] = useState(Array(20).fill(false));

    const removeItem = (indexToRemove) => {
        setRoutine(prevRoutine => prevRoutine.filter((_, index) => index !== indexToRemove));
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (index) => {
        const newCheckedArray = [...isCheckedArray];
        newCheckedArray[index] = !newCheckedArray[index];
        setIsCheckedArray(newCheckedArray);

        // Update the count based on the newCheckedArray
        const newCheckedCount = newCheckedArray.filter((isChecked) => isChecked).length;
        setCheckedCount(newCheckedCount);
    };

    const handleSetClick = (outerIndex, innerIndex, index) => {
        if (index == 0) {
            const updatedWorkoutList = [...routine];
            updatedWorkoutList[outerIndex].setInfo[innerIndex].items[0].value = list[currentIndex] === 3 ? (innerIndex + 1) : list[currentIndex].toString();
            setCurrentIndex((currentIndex + 1) % list.length);
            setDelete(!del);
        }
    }

    const addSet = (index) => {
        const newItem = {
            items: [
                { subLabel: 'Sets', value: routine[index].setInfo.length + 1 },
                { subLabel: 'Lbs', value: '-' },
                { subLabel: 'Reps', value: '-' },
            ],
        };

        const updatedWorkoutList = [...routine[index].setInfo];
        const updatedList = [...updatedWorkoutList, newItem];

        routine[index].setInfo = updatedList;
        setDelete(!del);
    };

    const handleInputChange = (outerIndex, innerIndex, index, newValue) => {
        const updatedWorkoutList = [...routine];
        updatedWorkoutList[outerIndex].setInfo[innerIndex].items[index].value = newValue;
    };

    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // Start the timer when the component mounts
        const timerId = setInterval(() => {
            setElapsedTime(prevCounter => prevCounter + 1);
        }, 1000); // 1000 milliseconds (1 second)

        // Clean up the timer when the component unmounts
        return () => clearInterval(timerId);
    }, []);

    // Calculate minutes and seconds from elapsed time
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-center justify-between flex-row mt-14'>
                <TouchableOpacity className="" onPress={() => navigation.navigate("HomeScreen")}>
                    <Text className='text-black font-semibold text-lg'> Log Workout </Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center">
                    <Image source={timer} className='w-9 h-9 mr-2' />
                    <TouchableOpacity className='w-20 rounded-md rounded bg-blue-700 h-8 flex justify-center items-center'
                        onPress={() => navigation.navigate("AddExercise", { setSelectedExercises })}>
                        <Text className='text-white font-medium text-base'> Finish </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View className="border-[1px] border-gray-300 mt-4" />

            <ScrollView >
                {/* The Duration, Volume, Sets */}
                <View className='flex items-center flex-row gap-x-20 mt-5'>

                    <View className='flex flex-col'>
                        <Text className='text-sm font-medium text-gray-400'>Duration</Text>
                        <Text className='text-lg text-blue-700 font-semibold'> {`${minutes} min ${seconds} sec`} </Text>
                    </View>

                    <View className='flex flex-col'>
                        <Text className='text-sm font-medium text-gray-400'>Volume</Text>
                        <Text className='text-lg text-black font-semibold'>0 lbs</Text>
                    </View>

                    <View className='flex flex-col'>
                        <Text className='text-sm font-medium text-gray-400'>Sets</Text>
                        <Text className='text-lg text-black font-semibold'> {checkedCount} </Text>
                    </View>
                </View>

                <View className="border-[1px] border-gray-200 mt-4" />

                {routine.map((exercise, index) => (
                    <View className="flex flex-col mt-5">
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
                                <Image source={threedots} className='w-7 h-7' alt="add" />
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
                            <View className="flex flex-row gap-x-10 mt-3">
                                <Text className="text-gray-400 font-medium text-lg"> SET </Text>
                                <Text className="text-gray-400 font-medium text-lg"> Previous </Text>
                                <Text className="text-gray-400 font-medium text-lg"> LBS </Text>
                                <Text className="text-gray-400 font-medium text-lg"> REPS </Text>
                            </View>

                            {exercise.setInfo.map((exercise, innerIndex) => (
                                <View className="flex flex-row justify-between">
                                    <View className="flex flex-row mt-2 gap-x-10" key={innerIndex}>
                                        {/* <Text>{exercise.label}</Text> */}
                                        {exercise.items.map((item, itemIndex) => (
                                            <View className="flex flex-row">
                                                {itemIndex === 0 ? (
                                                    // Render TouchableOpacity for itemIndex === 0
                                                    <TouchableOpacity
                                                        className="h-6 w-9"
                                                        onPress={() => handleSetClick(index, innerIndex, itemIndex)}
                                                    >
                                                        <Text className="text-gray-400 font-medium text-lg"> {item.value.toString()} </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <>
                                                        {itemIndex === 1 && <Text className="text-gray-400 font-medium text-sm w-28"> 0lbs x 12 </Text>}
                                                        <TextInput
                                                            inputMode={itemIndex === 0 ? '' : 'numeric'}
                                                            key={`input-${key}-${itemIndex}`}
                                                            className="text-lg outline:none text-black placeholder:text-gray-400 placeholder:font-medium font-bold mr-3"
                                                            placeholder={item.value}
                                                            defaultValue={item.value !== '-' ? item.value : ''}
                                                            readOnly={itemIndex === 0}
                                                            onChangeText={text => handleInputChange(index, innerIndex, itemIndex, text)}
                                                        />
                                                    </>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    {/* onPress={() => removeSet(index, innerIndex)} */}
                                    <TouchableOpacity>
                                        <Checkbox
                                            key={`input-${key}-${index}`}
                                            value={isCheckedArray[innerIndex]}
                                            onValueChange={() => handleCheckboxChange(innerIndex)}
                                            color={isCheckedArray[innerIndex] ? 'green' : undefined}
                                        />
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
                    onPress={() => navigation.navigate("AddExercise", { setSelectedExercises: setRoutine, screenName: 'StartRoutine' })}>
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
            </ScrollView>
        </View>
    )
}

