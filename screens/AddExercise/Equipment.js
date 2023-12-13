import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Modal } from 'react-native'
import gymEquipment from "../../assets/Exercises/Equipment";



const AllEquipment = ({ isOpen, onClose, setEquipment }) => {
    return (
        <Modal
            visible={isOpen}
            onBackdropPress={onClose}
            animationType="slide"
            transparent
        >

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 0.5 }}>

                    <View className='flex flex-row justify-between mt-5 px-5'>
                        <Text className="text-black text-lg font-semibold opacity-0">Equipment</Text>
                        <Text className="text-black text-lg font-semibold">Equipment</Text>
                        <TouchableOpacity className='' onPress={() => { onClose() }}>
                            <Text className="text-lg font-semibold text-blue-700"> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="pb-4 pt-4 px-4">
                        {Object.values(gymEquipment).map((equipment, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    className="flex-row items-center mb-4"
                                    onPress={() => {
                                        onClose();
                                        setEquipment(equipment.name);
                                    }}
                                >
                                    <Image
                                        source={{ uri: equipment.photoLink }}
                                        alt={equipment.name}
                                        className="w-12 h-12 rounded-full mr-2"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-black text-base font-semibold">{equipment.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View className="border-[1px] border-gray-200 mb-2 ml-5 mr-5" />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

        </Modal>
    );
};

export default AllEquipment;