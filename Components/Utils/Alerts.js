// Alert.js

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const Alerts = ({ visible, title, options, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onClose(null)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        elevation: 5,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                >
                    <Text className='text-lg font-bold flex item-center justify-center mb-5'>
                        {title}
                    </Text>


                    <View className="flex flex-row items-center justify-center justify-between w-full ">
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => onClose(option.value)}
                                className="flex-row items-center"
                            >
                                <Text className='text-blue-700 font-medium text-lg w-12 h-7'>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default Alerts;
