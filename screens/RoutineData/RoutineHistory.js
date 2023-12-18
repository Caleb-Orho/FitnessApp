import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView, Image } from 'react-native'
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { backButton } from "../../assets/SVG";

export default function RoutineHistory({ navigation }) {
    const route = useRoute();
    const { routineName } = route.params;
    const [files, setFiles] = useState()

    useEffect(() => {
        const loadFileNames = async () => {
            try {
                const directoryUri = FileSystem.documentDirectory + "/routines/" + routineName + "/";

                // Read all files in the directory
                const routines = await FileSystem.readDirectoryAsync(directoryUri);

                // Set the state with the file names
                setFiles(routines);
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        };

        loadFileNames();
    }, []);

    const splitFileName = (fileName) => {
        const parts = fileName.split(/[{}]/);
        const name = parts[0];
        const date = formatDate(parts[1]);

        return { name, date };
    };

    const formatDate = (dateTimeString) => {

        if (!dateTimeString)
            return

        // Split the input string into date and time components
        const [dateString, timeString] = dateTimeString.split(', ');
        const [y, mo, d] = dateString.split("-");
        const [h, m, s] = timeString.split(":");

        // Create a Date object from the combined date and time string
        const inputDate = new Date(y, mo, d, h, m, s[0])


        const currentDate = new Date();

        const isSameYear = currentDate.getFullYear() === inputDate.getFullYear();
        const dateFormat = isSameYear ? { year: undefined } : { year: 'numeric' };

        const formattedDate = inputDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            ...dateFormat,
        });

        const formattedTime = inputDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        return `${formattedDate}, ${formattedTime}`;
    };

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-center justify-between flex-row mt-14'>

                <TouchableOpacity className="" onPress={() => navigation.goBack()}>
                    <Image source={backButton} className='w-7 h-6' />
                </TouchableOpacity>

                <TouchableOpacity className="" onPress={() => navigation.navigate("HomeScreen")}>
                    <Text className='text-black font-semibold text-lg'> {routineName} </Text>
                </TouchableOpacity>

            </View>

            <View className="border-[1px] border-gray-300 mt-4" />

            <ScrollView className="gap-y-4 mt-3">
                {files ? (
                    files.map((fileName, index) => {

                        const { name, date } = splitFileName(fileName);
                        if (!date) {
                            return null;
                        }

                        return (
                            <TouchableOpacity key={index} className="w-full bg-gray-300 flex justify-center rounded-md px-5 h-16"
                                onPress={() => navigation.navigate('RoutineData', { routinePath: routineName + "/" + fileName })}>
                                <Text className='text-black font-semibold text-lg'>{name}</Text>
                                <Text className='text-black text-sm'>{date}</Text>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <Text>Loading files...</Text>
                )}
            </ScrollView>

        </View >
    )
}

