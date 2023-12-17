import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Modal } from 'react-native'
import { remove, repeat } from "../../assets/SVG";

const EditRotineOptions = ({ isOpen, onClose, setSetEditIndex }) => {
    return (
        <Modal
            visible={isOpen}
            onBackdropPress={onClose}
            animationType="slide"
            transparent
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }} className="px-5">
                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 0.4 }} className='px-5'>

                    {/* Cancel Button */}
                    <View className='flex flex-row justify-between mt-5'>
                        <Text className="text-black text-lg font-semibold opacity-0">Muscle</Text>
                        <Text className="text-black text-lg font-semibold opacity-0">Muscle</Text>
                        <TouchableOpacity className='' onPress={() => { onClose() }}>
                            <Text className="text-lg font-semibold text-blue-700"> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="border-[1px] border-gray-200 mt-2 w-full" />

                    {/* Edit Set Options */}
                    <View className='flex items-center justify-center gap-y-2 mt-2'>

                        {/* Edit */}
                        <TouchableOpacity className='rounded-md bg-blue-700 w-full h-9 flex flex-row items-center justify-center' onPress={() => {
                            onClose();
                            setSetEditIndex(1);
                        }}>
                            <Text className="text-white text-lg font-semibold"> Edit Routine </Text>
                        </TouchableOpacity>

                        <View className="border-[1px] border-gray-200 mt-2 w-full" />

                        {/* Duplicate */}
                        <TouchableOpacity className='rounded-md bg-blue-700 w-full h-9 flex flex-row items-center justify-center' onPress={() => {
                            onClose();
                            setSetEditIndex(1);
                        }}>
                            <Image source={repeat} className='w-8 h-7' alt="add" />
                            <Text className="text-white text-lg font-semibold"> Duplicate Rotutine </Text>
                        </TouchableOpacity>

                        <View className="border-[1px] border-gray-200 mt-2 w-full" />

                        {/* Delete */}
                        <TouchableOpacity className='rounded-md bg-blue-700 w-full h-9 flex flex-row items-center justify-center' onPress={() => {
                            onClose();
                            setSetEditIndex(2);
                        }}>
                            <Image source={remove} className='w-8 h-8' alt="add" />
                            <Text className="text-white text-lg font-semibold"> Delete Routine </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        </Modal>
    );
};

export default EditRotineOptions;