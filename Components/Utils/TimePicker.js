import { TouchableOpacity, View, Text, Modal } from 'react-native'
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App';

const TimePicker = ({ isOpen, onClose, setRestTime }) => {

    const { time } = useContext(AppContext);
    const [selectedTime, setSElectedTime] = useState(0)

    useEffect(() => {
        setSElectedTime("OFF")
    }, [isOpen == true])
    return (
        <Modal
            visible={isOpen}
            onBackdropPress={onClose}
            animationType="slide"
            transparent
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 0.4 }} className='px-5'>

                    {/* Cancel Button */}
                    <View className='flex flex-row justify-between mt-5'>
                        <Text className="text-black text-lg font-semibold opacity-0">Muscle</Text>
                        <Text className="text-black text-lg font-semibold opacity-0">Muscle</Text>
                        <TouchableOpacity className='' onPress={() => {
                            setRestTime(selectedTime);
                            onClose();
                        }}>
                            <Text className="text-lg font-semibold text-blue-700"> Done </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Time */}
                    <View className='h-full'>
                        <ScrollPicker
                            dataSource={time}
                            selectedIndex={0}

                            itemHeight={65}
                            highlightColor="#d8d8d8"
                            highlightBorderWidth={2}

                            itemTextStyle={{ fontWeight: 'bold', color: '#d8d8d8' }}
                            activeItemTextStyle={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}

                            onValueChange={(data) => {
                                setSElectedTime(data);
                            }}
                        />
                    </View>


                </View>
            </View>

        </Modal>
    );
};

export default TimePicker;