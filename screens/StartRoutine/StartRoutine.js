import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native'
import { threedots, timer, trash, add2 } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import Checkbox from 'expo-checkbox';
import EditSet from '../../Components/Utils/EditSet';
import TimePicker from '../../Components/Utils/TimePicker';
import Slider from 'react-native-slider'
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Haptics from 'expo-haptics';

export default function StartRoutine({ navigation }) {
    const [initialTime, setInitalTime] = useState(0)

    const route = useRoute();
    const { routineName } = route.params;
    const [routine, setRoutine] = useState([])
    const [key] = useState(0);
    const [list] = useState(['W', 'F', 'D', 3]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [del, setDelete] = useState(false);
    const [editSet, setEditSet] = useState(false);
    const [setEditIndex, setSetEditIndex] = useState([-1, -1]);
    const [checkedCount, setCheckedCount] = useState(0);
    const [isCheckedArray, setIsCheckedArray] = useState([]);

    const [timePick, setTimePicker] = useState({
        isOpen: false,
        exerciseName: '',
    });
    const [exerciseRestTimes, setExerciseRestTimes] = useState({}); // New state to store rest times for each exercise

    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [sliderValue, setSliderValue] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    const [state, setState] = useState({
        myText: 'I\'m ready to get swiped!',
        gestureName: 'none',
        backgroundColor: '#fff',
        test: [false, false, false, false, false, false, false, false, false],
    })

    const handleRestTimeChange = (exerciseName, selectedTime) => {
        setExerciseRestTimes((prevRestTimes) => ({
            ...prevRestTimes,
            [exerciseName]: selectedTime,
        }));
    };

    const onSwipeLeft = (index) => {
        setState({ myText: 'You swiped left!', test: { ...state.test, [index]: true } })
    }

    const onSwipeRight = (index) => {
        setState({ myText: 'You swiped right!', test: { ...state.test, [index]: false } })
    }

    const config = {
        velocityThreshold: 1,
        directionalOffsetThreshold: 130
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setTimeRemaining(initialTime);
        setSliderValue(0);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        let timer;

        if (timerRunning) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime === 0) {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        clearInterval(timer);

                        setTimerRunning(false);
                        setTimeRemaining(initialTime);
                        setSliderValue(-1);
                    }
                    return prevTime > 0 ? prevTime - 1 : 0;
                });
                setSliderValue((prevValue) => Math.min(prevValue + 1, initialTime));
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup on component unmount

    }, [timerRunning]);

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

    // Set the initial state for isCheckedArray when routine changes
    useEffect(() => {
        // Set the initial state with an array of objects
        setIsCheckedArray(
            routine.map((exercise) => ({
                ...exercise.setInfo.reduce((acc, _, innerIndex) => {
                    acc[innerIndex] = false;
                    return acc;
                }, {}),
            }))
        );
    }, [routine, del]);

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

    const removeItem = (indexToRemove) => {
        setRoutine(prevRoutine => prevRoutine.filter((_, index) => index !== indexToRemove));
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (index, innerIndex, exercise) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        if (!isCheckedArray[index][innerIndex] && !timerRunning) {
            if (exerciseRestTimes[exercise] !== "OFF" && exerciseRestTimes[exercise]) {
                const extractedNumber = parseInt(exerciseRestTimes[exercise].match(/\d+/)?.[0], 10) || 0;
                setInitalTime(extractedNumber)
                setTimerRunning(true);
            }
        }

        const newCheckedArray = [...isCheckedArray];
        newCheckedArray[index][innerIndex] = !newCheckedArray[index][innerIndex];
        setIsCheckedArray(newCheckedArray);

        // Use the updated state (newCheckedArray) to calculate the count
        const newCheckedCount = newCheckedArray
            .flatMap(obj => Object.values(obj)) // Flatten values from objects
            .filter(isChecked => isChecked === true)
            .length;

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

    const removeExercise = (outerIndex, indexToRemove) => {
        const updatedWorkoutList = [...routine[outerIndex].setInfo];
        updatedWorkoutList.splice(indexToRemove, 1);


        updatedWorkoutList.forEach((item, index) => {
            const numericValue = parseFloat(item.items[0].value);
            item.items[0].value = Number.isNaN(numericValue) ? item.items[0].value : index + 1;
        })
        routine[outerIndex].setInfo = updatedWorkoutList;
        setDelete(!del);
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
                                onPress={() => setTimePicker({ isOpen: true, exerciseName: exercise.name })}>
                                <Image source={timer} alt={exercise.name} className="w-7 h-7" />
                                <Text className="flex flex-col items-start text-blue-700 text-lg font-bold">Rest Timer: {exerciseRestTimes[exercise.name] || 'OFF'} </Text>
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

                            {exercise.setInfo.map((sets, innerIndex) => (

                                <GestureRecognizer
                                    // onSwipe={(direction, state) => onSwipe(direction, state)}
                                    onSwipeLeft={() => onSwipeLeft(innerIndex)}
                                    onSwipeRight={() => onSwipeRight(innerIndex)}
                                    config={config}
                                >
                                    <View className="flex flex-row mt-2 h-8" key={innerIndex}>


                                        {sets.items.map((item, itemIndex) => (
                                            <View className="flex flex-row items-center">
                                                {itemIndex === 0 ? (
                                                    // Render TouchableOpacity for itemIndex === 0
                                                    <TouchableOpacity
                                                        className="h-6 w-6 mr-12"
                                                        onPress={() => handleSetClick(index, innerIndex, itemIndex)}
                                                    >
                                                        <Text className="text-gray-400 font-medium text-lg"> {item.value.toString()} </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <View className="flex flex-row items-center">
                                                        {itemIndex === 1 && <Text className="text-gray-400 font-medium text-sm w-16 mr-12"> 111lbs x 12 </Text>}
                                                        <TextInput
                                                            inputMode={itemIndex === 0 ? '' : 'numeric'}
                                                            key={`input-${key}-${itemIndex}`}
                                                            className="text-lg outline:none text-black placeholder:text-gray-400 placeholder:font-medium font-bold w-6 mr-12"
                                                            placeholder={item.value}
                                                            defaultValue={item.value !== '-' ? item.value : ''}
                                                            readOnly={itemIndex === 0}
                                                            onChangeText={text => handleInputChange(index, innerIndex, itemIndex, text)}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        ))}

                                        {!state.test[innerIndex] ? (
                                            <TouchableOpacity className="flex items-center justify-center ml-3">
                                                <Checkbox
                                                    key={`input-${key}-${index}`}
                                                    value={isCheckedArray?.[index]?.[innerIndex] || false}
                                                    onValueChange={() => handleCheckboxChange(index, innerIndex, exercise.name)}
                                                    color={isCheckedArray?.[index]?.[innerIndex] ? 'green' : undefined}
                                                    className="w-6 h-6 rounded"
                                                    onChange={
                                                        () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }
                                                    }
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => removeExercise(index, innerIndex)}>
                                                <Image source={trash} className='w-5 h-7 ml-3' />
                                            </TouchableOpacity>
                                        )}

                                    </View>
                                </GestureRecognizer>

                            ))}


                        </View>


                        {/* <Button
                            title="Light"
                            onPress={
                                () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }
                        /> */}

                        {/* Add set TouchableOpacity */}
                        < TouchableOpacity className='border-[1px] border-gray-200 flex items-center justify-center flex-row rounded-md mt-2 bg-gray-200'
                            onPress={() => addSet(index)}>
                            <Image source={add2} className='w-10 h-9' />
                            <Text className='text-white font-medium text-base'> Add Set </Text>
                        </TouchableOpacity>

                    </View>
                ))
                }

                {/* Add exercise TouchableOpacity */}
                <TouchableOpacity className='border-[1px] border-gray-200 flex items-center justify-center flex-row rounded-md mt-5 bg-blue-700'
                    onPress={() => {
                        navigation.navigate("AddExercise", { setSelectedExercises: setRoutine, screenName: 'StartRoutine' }),
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }}>
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
                    isOpen={timePick.isOpen}
                    onClose={() => {
                        setTimePicker({ ...timePick, isOpen: false });
                    }}
                    setRestTime={(selectedTime) => {
                        handleRestTimeChange(timePick.exerciseName, selectedTime);
                        setTimePicker({ ...timePick, isOpen: false });

                        if (selectedTime !== 'OFF') {
                            clearInterval(timer);
                            setTimerRunning(false);
                            setSliderValue(0);

                            const components = selectedTime.split(' ');
                            let minutes = 0;
                            let seconds = 0;

                            for (let i = 0; i < components.length; i += 2) {
                                const value = parseInt(components[i], 10);
                                const unit = components[i + 1];

                                if (unit === 'min') {
                                    minutes += value;
                                } else if (unit === 'sec') {
                                    seconds += value;
                                }
                            }

                            const totalTimeInSeconds = minutes * 60 + seconds;
                            setTimeRemaining(totalTimeInSeconds);
                            console.log(totalTimeInSeconds)
                        }

                    }}
                />

            </ScrollView >

            {/* The timer countdown */}
            {timerRunning && (
                <View className="fixed bottom-0 left-0 right-0 bg-white mt-5 mb-5 h-12 border border-blue-700 rounded-md flex flex-row items-center justify-center justify-between px-5">

                    <View className="flex flex-col items-center w-full flex-1 mr-5">
                        <Text className='text-black font-medium text-base'>{formatTime(timeRemaining)}</Text>
                        <Slider
                            trackStyle={{ height: 8, borderRadius: 4, backgroundColor: '#edf2f7' }}
                            style={{ width: '100%' }}
                            minimumValue={0}
                            maximumValue={initialTime}
                            value={sliderValue}
                            disabled={true}
                            thumbStyle={{ height: 0, width: 0, backgroundColor: 'green' }}
                            className="h-5"
                        />
                    </View>

                    <TouchableOpacity className='w-20 rounded-md rounded bg-blue-700 h-8 flex justify-center items-center'
                        onPress={resetTimer}>
                        <Text className='text-white font-medium text-base' > Stop </Text>
                    </TouchableOpacity>

                </View>
            )}
        </View >
    )
}

