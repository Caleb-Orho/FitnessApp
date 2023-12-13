import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Modal } from 'react-native'
import MuscleGroups from "../../assets/Exercises/MuscleGroups";

const AllMuscle = ({ isOpen, onClose, setMuscleGroup }) => {
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
                        <Text className="text-black text-lg font-semibold opacity-0">Muscle</Text>
                        <Text className="text-black text-lg font-semibold">Muscle</Text>
                        <TouchableOpacity className='' onPress={() => { onClose() }}>
                            <Text className="text-lg font-semibold text-blue-700"> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="pb-4 pt-4 px-4">
                        {Object.values(MuscleGroups).map((muscleGroup, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    className="flex-row items-center mb-4"
                                    onPress={() => {
                                        onClose();
                                        setMuscleGroup(muscleGroup.name);
                                    }}
                                >
                                    <Image
                                        source={{ uri: muscleGroup.photoLink }}
                                        alt={muscleGroup.name}
                                        className="w-12 h-12 rounded-full mr-2"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-black text-base font-semibold">{muscleGroup.name}</Text>
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

export default AllMuscle;