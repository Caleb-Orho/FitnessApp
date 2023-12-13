import React, { useState } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { note, add, magnifyingglass, triangleright } from "../../assets/SVG";
import { useRoute } from '@react-navigation/native';

// navigation
export default function HomeScreen({ navigation }) {

    const route = useRoute();
    const [expandMyRoutine, setExpandMyRoutine] = useState(false)

    return (
        <View className="px-5 h-full">
            <Text className='text-lg font-bold mt-3'>
                Quick Start
            </Text>

            {/* Start Empty Workout TouchableOpacity */}
            <TouchableOpacity className='border-[1px] border-gray-200 flex items-center flex-row rounded-md mt-5'>
                <Image source={add} className='w-10 h-10 mr-2' />
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

        </View>
    )
}

