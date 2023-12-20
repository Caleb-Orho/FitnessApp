import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { backButton, profile, leftNav, about, lock } from '../../../assets/SVG'
  
const SettingHome = ({ navigation }) => {

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-between flex-row mt-14'>
                <View className="flex-1 ">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={backButton} className="h-7 w-7" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center">
                    <Text className='text-lg font-bold flex items-center justify-center'>
                        Settings
                    </Text>
                </View>

                <View className="flex-1 items-end opacity-0">
                    <TouchableOpacity >
                        <Image source={''} className="h-7 w-7" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="border-[1px] border-gray-200 mt-4" />

            {/* Account */}
            <Text className='text-gray-400 text-base font-bold mt-5 mb-3'> Account </Text>

            <View className="border-[1px] border-gray-200" />

            {/* Profile */}
            <TouchableOpacity className="flex flex-row justify-between items-center h-14" onPress={() => navigation.navigate("Profile")}>
                <View className="flex flex-row gap-x-5 items-center">
                    <Image source={profile} className="h-7 w-7" />
                    <Text className='text-lg font-bold flex items-center'> Profile </Text>
                </View>
                <Image source={leftNav} className="h-7 w-7 rotate-180" />
            </TouchableOpacity>

            <View className="border-[1px] border-gray-200 mt-2" />

            {/* Account */}
            <TouchableOpacity className="flex flex-row justify-between items-center h-14">
                <View className="flex flex-row gap-x-5 items-center">
                    <Image source={lock} className="h-7 w-7" />
                    <Text className='text-lg font-bold flex items-center'> Account </Text>
                </View>
                <Image source={leftNav} className="h-7 w-7 rotate-180" />
            </TouchableOpacity>

            <View className="border-[1px] border-gray-200 mt-2" />

            {/* Guide */}
            <Text className='text-gray-400 text-base font-bold mt-5 mb-3'> Guide </Text>

            <View className="border-[1px] border-gray-200" />

            {/* Profile */}
            <TouchableOpacity className="flex flex-row justify-between items-center h-14" onPress={() => navigation.navigate("About")}>
                <View className="flex flex-row gap-x-5 items-center">
                    <Image source={about} className="h-7 w-7" />
                    <Text className='text-lg font-bold flex items-center'> About </Text>
                </View>
                <Image source={leftNav} className="h-7 w-7 rotate-180" />
            </TouchableOpacity>

            <View className="border-[1px] border-gray-200 mt-2" />
        </View >
    );
};

export default SettingHome;
