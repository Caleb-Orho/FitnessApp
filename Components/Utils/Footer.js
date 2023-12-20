import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { dumbell, profile } from '../../assets/SVG'
import { useNavigation } from '@react-navigation/native';

const Footer = ({ }) => {

    const navigation = useNavigation();
    return (
        <View className="h-16 fixed bottom-0 left-0 right-0" style={{ marginTop: 'auto' }}>
            <View className="border-[1px] border-gray-200" />

            <View className="w-full flex items-center justify-center h-full flex-row justify-between px-[20%]">

                <TouchableOpacity className="flex items-center" onPress={() => navigation.navigate("HomeScreen")}>
                    <Image source={dumbell} className='w-9 h-9' alt="add" />
                    <Text className="text-blue-700">Workout</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex items-center" onPress={() => navigation.navigate("ProfileHome")}>
                    <Image source={profile} className='w-9 h-9' alt="add" />
                    <Text className="text-blue-700">Profile</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default Footer;
