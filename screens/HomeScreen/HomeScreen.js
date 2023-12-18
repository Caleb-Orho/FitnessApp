import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { note, add, magnifyingglass, triangleright, threedots } from "../../assets/SVG";
import { AppContext } from '../../App';
import EditRotineOptions from '../../Components/Utils/EditRotineOptions';
import Alerts from '../../Components/Utils/Alerts';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {

    const [expandMyRoutine, setExpandMyRoutine] = useState(true)
    const [del, setDelete] = useState(false);
    const [routine, setRoutine] = useState([])
    const [routineName, setRoutineName] = useState();
    const { setState, state } = useContext(AppContext);

    const [editRoutine, setEditRoutine] = useState(false);
    const [setEditIndex, setSetEditIndex] = useState([-1, -1]);

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleAlertClose = async (selectedOption) => {
        setAlertVisible(false);
        if (selectedOption == 1) {
            const directoryUri = FileSystem.documentDirectory + "/routines/" + routineName;

            try {
                await FileSystem.deleteAsync(directoryUri, { idempotent: true });
                setState(!state)
            } catch (error) {
                console.error("Error deleting directory:", error);
            }
        }

    };

    const alertOptions = [
        { value: '1', label: 'Delete Routine' },
        { value: '2', label: 'Cancel' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const directoryUri = FileSystem.documentDirectory + "/routines/";

                // Get a list of files in the directory
                const directories = await FileSystem.readDirectoryAsync(directoryUri);
                setRoutineName(directories);

                const allData = await Promise.all(
                    directories.map(async (file) => {
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
    }, [state]);

    useEffect(() => {
        if (setEditIndex[0] !== 3) {

            if (setEditIndex[0] == 2) {
                setAlertVisible(true);
                setSetEditIndex([-1, -1]);
            } else if (setEditIndex[0] == 1) {
                navigation.navigate("EditRotine", { routineName: routineName[setEditIndex[1]] });
                setSetEditIndex([-1, -1]);
            }

        }
        setDelete(!del);

    }, [editRoutine == false]);

    useEffect(() => {

        async function listFiles() {
            try {
                // const directory = FileSystem.documentDirectory + "/routines/Trash"
                // const result = await FileSystem.readDirectoryAsync(directory);
                // console.log(result)
                // const filePath = `${FileSystem.documentDirectory}/routines/Trash /Trash {2023-12-17, 7:40:22 p.m.}.json`; // Replace with the actual file path you want to delete
                // await FileSystem.deleteAsync(filePath);
                // console.log("Doe")
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        }
        listFiles();
    }, [])

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
                    <View key={index} className="rounded-md border-[1px] border-gray-200 mt-5">

                        <View className="flex flex-row justify-between px-5 mt-3">
                            <Text className='text-black font-bold'>
                                {routineName[index]}
                            </Text>

                            <TouchableOpacity onPress={() => {
                                setEditRoutine(!editRoutine)
                                setSetEditIndex(previousIndex => [previousIndex[0], index])
                                // setRoutineName(routineName[index])
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


            <EditRotineOptions
                isOpen={editRoutine}
                onClose={() => {
                    setEditRoutine(false)
                }}
                setSetEditIndex={(selectedIndex) => {
                    setSetEditIndex(previousIndex => [selectedIndex, previousIndex[1]])
                    setEditRoutine(false);
                }}
            />

            <Alerts
                visible={isAlertVisible}
                title="Are you sure you want to delete this routine?"
                options={alertOptions}
                onClose={handleAlertClose}
            />
        </View>
    )
}

