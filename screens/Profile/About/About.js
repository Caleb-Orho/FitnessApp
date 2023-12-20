import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { backButton, profile, leftNav } from '../../../assets/SVG'
import Footer from '../../../Components/Utils/Footer';

const About = ({ navigation }) => {

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
                    <Text className='text-lg font-bold flex items-center justify-center'> About </Text>
                </View>

                <View className="flex-1 items-end opacity-0">
                    <TouchableOpacity >
                        <Image source={''} className="h-7 w-7" />
                    </TouchableOpacity>
                </View>
            </View>


            <View className="flex items-center justify-center w-full">

                <Text className='text-gray-400 text-base font-bold mt-5 mb-3'> Social </Text>

                <TouchableOpacity className="w-full items-center justify-center mt-4">
                    <Text className='text-lg font-bold flex items-center justify-center'> Instagram </Text>
                </TouchableOpacity>

                <Text className='text-gray-400 text-base font-bold mt-5 mb-3 '> Version 1 </Text>

            </View>

            <Footer />
        </View >
    );
};

export default About;
