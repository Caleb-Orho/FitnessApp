import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native'
import CircleSlider from "react-native-circle-slider";

const Clock = ({ isOpen, onClose }) => {

    const [initialTime, setInitalTime] = useState(15)

    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [timeValue, setTimeValue] = useState(0)
    const [sliderKey, setSliderKey] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    const [time, setTime] = useState(initialTime)
    useEffect(() => {
        let timer;

        if (timerRunning) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setTimerRunning(false);
                        setTimeRemaining(initialTime)
                        setTimeValue(0)
                    }
                    const interval = (((prevTime / initialTime) * 359) - 359) * -1;
                    setTimeValue(interval);
                    setTime(prevTime)
                    return prevTime > 0 ? prevTime - 1 : 0;
                });

            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup on component unmount

    }, [timerRunning]);

    useEffect(() => {
        setSliderKey((prevKey) => prevKey + 1);
    }, [timeValue]);

    const handleStartButtonPress = () => {
        // Toggle between starting and canceling the timer
        if (timerRunning) {
            setTimerRunning(false);
            setTimeRemaining(initialTime);
            setTimeValue(0); // Reset timeValue when the timer is canceled
            setTime(initialTime)
        } else {
            setTimerRunning(true);
            setTimeValue(0);
            setTimeRemaining(initialTime);
            setTime(initialTime)
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };


    return (

        <Modal
            visible={isOpen}
            onBackdropPress={onClose}
            animationType="slide"
            transparent
        >
            <TouchableOpacity onPress={() => onClose()} className="flex items-center justify-center h-full">
                <View className="bg-green-100 w-[90%] h-[60%] flex items-center">
                    <Text className='text-black font-semibold text-xl mt-5'> Clock </Text>

                    {/* Timer label */}
                    <View className="flex items-center justify-center w-[45%] h-[10%] rounded-md bg-blue-700 mt-2">
                        <Text className='text-white font-medium text-base'> Timer </Text>
                    </View>

                    {/* Circle */}
                    <View className="mt-5 w-[70%] items-center justify-center">

                        <CircleSlider
                            key={sliderKey}
                            value={timeValue}
                            meterColor="#1565C0"

                            btnRadius={5}
                            textSize={0}
                            textColor='blue'

                            dialRadius={100}
                            dialWidth={10}
                            fillColor='transparent'
                            min={0}
                            timeRemaining={formatTime(time)}
                        />

                        <View className="flex items-center justify-center justify-between w-full flex-row">
                            <TouchableOpacity
                                className='flex items-center justify-center h-9 w-12'
                                onPress={() => {
                                    setInitalTime((prevTime) => {
                                        if (prevTime === 15)
                                            return prevTime;
                                        const newTime = prevTime - 15;
                                        setTime(newTime);
                                        return newTime;
                                    });
                                }}
                                disabled={timerRunning}
                            >
                                <Text className={`text-blue-700 font-medium text-lg ${timerRunning ? 'text-gray-500' : ''}`}>
                                    -15s
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className='flex items-center justify-center h-9 w-12'
                                onPress={() => {
                                    setInitalTime((prevTime) => {
                                        const newTime = prevTime + 15;
                                        setTime(newTime);
                                        return newTime;
                                    });
                                }}
                                disabled={timerRunning}
                            >
                                <Text className={`text-blue-700 font-medium text-lg ${timerRunning ? 'text-gray-500' : ''}`}>
                                    +15s
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                    {/* Start button */}
                    <TouchableOpacity
                        className={`w-[90%] h-[15%] border-[1px] border-gray-200 flex items-center justify-center rounded-md mb-5 mt-5 ${timerRunning ? 'bg-red-700' : 'bg-blue-700'}`}
                        onPress={handleStartButtonPress}
                    >
                        <Text className='text-white font-medium text-base'>
                            {timerRunning ? 'Cancel' : 'Start'}
                        </Text>
                    </TouchableOpacity>


                </View>
            </TouchableOpacity>

        </Modal >
    );
};

export default Clock;