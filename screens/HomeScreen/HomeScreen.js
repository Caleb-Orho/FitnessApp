import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { note, add, magnifyingglass, triangleright, threedots } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../App';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {

    const route = useRoute();
    const [expandMyRoutine, setExpandMyRoutine] = useState(false)

    const [routine, setRoutine] = useState([])
    const [routineName, setRoutineName] = useState();
    const state = useContext(AppContext);
    const [editRoutineIndex, setEditRoutineIndex] = useState(-1);

    useEffect(() => {
        const loadData = async () => {
            try {
                const directoryUri = FileSystem.documentDirectory + "/routines/";

                // Get a list of files in the directory
                const files = await FileSystem.readDirectoryAsync(directoryUri);

                setRoutineName(files);

                const allData = await Promise.all(
                    files.map(async (file) => {
                        try {
                            const fileUri = directoryUri + file + "/" + (file + ".json");

                            // Read the file
                            const jsonData = await FileSystem.readAsStringAsync(fileUri, {
                                encoding: FileSystem.EncodingType.UTF8,
                            });

                            // Parse the JSON data
                            return JSON.parse(jsonData);
                        } catch (error) {
                            console.error(`Error reading file ${file}:`, error);
                            return null; // In case of an error, you might want to handle it differently 
                        }
                    })
                );

                // Set the state with the combined data from all files
                setRoutine(allData);
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        };

        const createDir = async () => {
            try { 
                const routinesDirectory = FileSystem.documentDirectory + "/routines/";
                const routinesDirectoryInfo = await FileSystem.getInfoAsync(routinesDirectory);

                if (!routinesDirectoryInfo.exists) {
                    await FileSystem.makeDirectoryAsync(routinesDirectory);
                    console.log('Directory created successfully');
                }
            } catch (error) {
                console.error('Error checking/creating routines directory:', error);
            }
        };

        createDir();
        loadData();
    }, []);

    return (
        <View className="px-5 h-full">
            <View className='w-full flex items-center justify-center mt-14'>
                <Text className='text-lg font-bold flex item-center justify-center'>
                    Workout
                </Text>

            </View>
            <View className="border-[1px] border-gray-200 mt-4" />

            <Text className='text-lg font-bold mt-3'>
                Quick Start
            </Text>

            {/* Start Empty Workout TouchableOpacity */}
            <TouchableOpacity className='border-[1px] border-gray-200 flex items-center flex-row rounded-md mt-5'>
                <Image source={add} className='w-10 h-9 mr-2' />
                <Text className='text-black font-medium text-sm'>Start Empty Workout</Text>
            </TouchableOpacity>

            {/* Routines and Folder TouchableOpacitys */}
            <View className='mt-4'>
                <Text className='text-lg text-black font-bold'> Routines </Text>
            </View>


            {/* New Routine and Routines TouchableOpacitys */}
            <View className='flex flex-row items-center justify-center mt-2 gap-x-5 w-fit'>
                <TouchableOpacity className='rounded-md border-[1px] border-gray-200 flex flex-col items-center justify-center w-1/2 h-20 flex-1'
                    onPress={() => navigation.navigate("NewRoutine")}>
                    <Image source={note} className='w-7 h-7' />
                    <Text className='text-black font-medium text-sm'>
                        New Routine
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className='rounded-md border-[1px] border-gray-200 flex flex-col items-center justify-center w-1/2 h-20 flex-1'>
                    <Image source={magnifyingglass} className='w-7 h-7' />
                    <Text className='text-black font-medium text-sm'> Explore Routines </Text>
                </TouchableOpacity>
            </View>

            <View className="mt-5">
                <TouchableOpacity className="flex flex-row w-full gap-1" onPress={() => setExpandMyRoutine(!expandMyRoutine)}>
                    <Image source={triangleright} className={`w-5 h-5 ${expandMyRoutine ? 'rotate-90' : ''}`} />
                    <Text className='text-base font-semibold text-gray-400'>My Routnies</Text>
                </TouchableOpacity>
            </View>

            {expandMyRoutine &&
                Object.keys(routine).map((index) => (
                    <View className="rounded-md border-[1px] border-gray-200 mt-5">

                        <View className="flex flex-row justify-between px-5 mt-3">
                            <Text className='text-black font-bold'>
                                {routineName[index]}
                            </Text>

                            <TouchableOpacity onClick={() => {
                                setShowOption(!showOption)
                                setRoutineName(routineName)
                            }}>
                                <Image source={threedots} className='rotate-90 w-7 h-7' alt="add" />
                            </TouchableOpacity>

                        </View>

                        <View className='px-5 mt-1 mb-3'>
                            <View className="flex flex-row truncate ">
                                {routine[index].map((exercise, exerciseIndex) => (

                                    <React.Fragment key={exerciseIndex}>
                                        <Text className="text-base font-semibold text-gray-400">{exercise.name}
                                            {exerciseIndex !== routine[index].length - 1 && <Text>, </Text>}
                                        </Text>
                                    </React.Fragment>
                                ))}
                            </View>

                            <View className='rounded w-full mt-2'>
                                <TouchableOpacity className='w-full rounded-lg flex items-center justify-center rounded bg-blue-700 h-8'
                                    onPress={() => navigation.navigate('StartRoutine', { routineName: routineName[index] })}>
                                    <Text className='text-white font-medium text-sm'> Start Routine </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                ))
            }

        </View>
    )
}

