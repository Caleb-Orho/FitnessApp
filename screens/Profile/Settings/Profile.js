import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput } from 'react-native'
import { backButton } from '../../../assets/SVG'
import * as Haptics from 'expo-haptics';
import Checkbox from 'expo-checkbox';
import adap from '../../../assets/favicon.png'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AppContext } from '../../../App';
import Alerts from '../../../Components/Utils/Alerts';

const Profile = ({ navigation }) => {

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [link, setLink] = useState('');
    const [birthday, setBirthday] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [sex, setSex] = useState('');
    const { setUser } = useContext(AppContext);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertOptions, setAlertOptions] = useState([
        { value: '1', label: 'Ok' },
    ]);

    const handleImagePicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'image/*', copyToCacheDirectory: false });
            setImageUri(result.assets[0].uri);

            // { type: 'image/*', copyToCacheDirectory: false }

        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleSave = async () => {

        setUser((prevUser) => ({
            ...prevUser,
            name: name !== "" ? name : prevUser.name,
            image: imageUri !== "" ? imageUri : prevUser.image,
        }));

        // Create a user object with the entered information
        const userObject = {
            name,
            bio,
            link,
            birthday,
            imageUri,
            sex,
        };

        try {
            // Convert the user object to JSON
            const jsonUserObject = JSON.stringify(userObject);

            // Save the JSON data to userInfo.json
            await FileSystem.writeAsStringAsync(
                `${FileSystem.documentDirectory}userInfo.json`,
                jsonUserObject
            );
            setAlertVisible(true);
            // Load user information immediately after saving
            await loadUserInfo();
        } catch (error) {
            console.error('Error saving or loading user information:', error);
        }
    };

    const loadUserInfo = async () => {
        try {
            // Read the contents of userInfo.json
            const userInfoString = await FileSystem.readAsStringAsync(
                `${FileSystem.documentDirectory}userInfo.json`
            );

            // Parse the JSON string to get the user information
            const userInfo = JSON.parse(userInfoString);

            // Set the state with the loaded user information
            setName(userInfo.name || '');
            setBio(userInfo.bio || '');
            setLink(userInfo.link || '');
            setBirthday(userInfo.birthday || '');
            setImageUri(userInfo.imageUri || imageUri);
            setSex(userInfo.sex || '');

        } catch (error) {
            console.error('Error loading user information:', error);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);


    useEffect(() => {

        async function listFiles() {
            try {
                // const directory = FileSystem.documentDirectory
                // const result = await FileSystem.readDirectoryAsync(directory);
                // console.log(result)
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        }
        listFiles();
    }, [])


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
                    <Text className='text-lg font-bold flex items-center justify-center'>  Edit Profile </Text>
                </View>

                <View className="flex-1 items-end">
                    <TouchableOpacity onPress={handleSave}>
                        <Text className='text-blue-700 font-medium text-lg'>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="border-[1px] border-gray-200 mt-4" />


            {/* Change Picture View */}
            <TouchableOpacity className="w-full flex items-center justify-center mt-5" onPress={handleImagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} className="h-20 w-20 rounded-full" />
                ) : (
                    <Image source={adap} className="h-20 w-20 rounded-full" />
                )}
                <Text className='text-blue-700 font-medium text-lg mt-5'> Change Picture </Text>
            </TouchableOpacity>

            {/* Public profile data */}
            <Text className='text-gray-400 text-base font-bold mt-5 mb-3'> Public profile data </Text>

            {/* Name input */}
            <View className="flex flex-row">
                <Text className='text-lg font-bold flex items-center justify-center w-24 '> Name </Text>
                <TextInput
                    className={"outline-none text-black font-bold placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium  leading-6 w-full flex-1"}
                    style={{ color: 'black' }}
                    placeholder="Your full name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View className="border-[0.5px] border-gray-200 mt-4" />

            {/* Bio input */}
            <View className="flex flex-row mt-5">
                <Text className='text-lg font-bold flex items-center justify-center w-24'> Bio </Text>
                <TextInput
                    className={"text-blue-600 outline-none text-black font-bold placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium leading-6 w-full flex-1"}
                    style={{ color: 'black' }}
                    placeholder="Describe yourself"
                    value={bio}
                    onChangeText={text => setBio(text)}
                />
            </View>
            <View className="border-[0.5px] border-gray-200 mt-4" />

            {/* LInk input */}
            <View className="flex flex-row mt-5">
                <Text className='text-lg font-bold flex items-center justify-center w-24'> Link </Text>
                <TextInput
                    className={"outline-none text-black font-bold placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium leading-6 w-full flex-1"}
                    style={{ color: 'black' }}
                    placeholder="htttps://example.com"
                    value={link}
                    onChangeText={text => setLink(text)}
                />
            </View>
            <View className="border-[0.5px] border-gray-200 mt-4" />


            {/* Public profile data */}
            <Text className='text-gray-400 text-base font-bold mt-5 mb-3'> Private data </Text>

            {/* Sex input */}
            <View className="flex flex-row">
                <Text className='text-lg font-bold flex items-center justify-center w-24'>  Sex </Text>
                <View className="flex flex-row items-center">
                    <Checkbox
                        value={sex === 'male'}
                        onValueChange={() => { setSex('male'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                    />
                    <Text className='text-gray-400 text-base font-normal flex items-center justify-center mr-4'> Male </Text>
                    <Checkbox
                        value={sex === 'female'}
                        onValueChange={() => { setSex('female'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                    />
                    <Text className='text-gray-400 text-base font-normal flex items-center justify-center mr-4'> Female </Text>
                    <Checkbox
                        value={sex === 'other'}
                        onValueChange={() => { setSex('other'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                    />
                    <Text className='text-gray-400 text-base font-normal flex items-center justify-center'> Other </Text>
                </View>
            </View>
            <View className="border-[0.5px] border-gray-200 mt-4" />

            {/* Bio input */}
            <View className="flex flex-row mt-5">
                <Text className='text-lg font-bold flex items-center justify-center w-24'>  Birthday </Text>
                <TextInput
                    className={"outline-none text-black font-bold placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium leading-6 w-full flex-1"}
                    style={{ color: 'black' }}
                    placeholder="Birthday"
                    value={birthday}
                    onChangeText={text => setBirthday(text)}
                />
            </View>
            <View className="border-[0.5px] border-gray-200 mt-4" />

            <Alerts
                visible={isAlertVisible}
                title="Successfully updated your profile"
                options={alertOptions}
                onClose={() => setAlertVisible(false)}
            />

        </View >
    );
};

export default Profile;
