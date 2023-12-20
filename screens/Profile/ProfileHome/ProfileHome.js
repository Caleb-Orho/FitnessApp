import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { gear } from '../../../assets/SVG'
import Footer from '../../../Components/Utils/Footer';
import adap from '../../../assets/favicon.png'
import { AppContext } from '../../../App';

const ProfileHome = ({ navigation }) => {

    const { user } = useContext(AppContext);

    return (
        <View className="px-5 h-full">

            {/* Header */}
            <View className='w-full flex items-center justify-between flex-row mt-14'>
                <View className="flex-1 ">
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text className='text-blue-700 font-medium text-lg'>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center">
                    <Text className='text-lg font-bold flex items-center justify-center'> {user.name ? user.name : "User"} </Text>
                </View>

                <View className="flex-1 items-end">
                    <TouchableOpacity onPress={() => navigation.navigate("SettingHome")}>
                        <Image source={gear} className="h-7 w-7" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="border-[1px] border-gray-200 mt-4" />

            {/* User profile info */}
            <TouchableOpacity className='mt-5 flex flex-row' onPress={() => navigation.navigate("Profile")}>
                {user.image ? (
                    <Image source={{ uri: user.image }} className="h-20 w-20 rounded-full" />
                ) : (
                    <Image source={adap} className="h-20 w-20 rounded-full" />
                )}

                <View className="ml-5 w-full flex-col flex justify-between">
                    <Text className='text-lg font-bold flex items-center justify-center'> {user.name ? user.name : "User"} </Text>

                    <View className="flex justify-center">
                        <Text className='text-gray-400 text-base font-bold'> Workouts </Text>
                        <Text className='text-gray-400 text-sm font-bold'> 0 </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Footer />
        </View >
    );
};

export default ProfileHome;
