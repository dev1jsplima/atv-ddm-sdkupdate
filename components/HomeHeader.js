import { Pressable, View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { twMerge } from 'tailwind-merge';

const ios = Platform.OS=='ios';
export default function HomeHeader() {
    const {user, logout} = useAuth();

    const {top} = useSafeAreaInsets();
    const handleProfile = ()=>{

    }

    const handleLogout = async ()=>{
        await logout();
    }

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        }
    };

  return (
    <View style={{paddingTop: ios? top:top+10 }} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
      <View>
        <Text style={{fontSize: hp(3)}} className="font-medium text-white">Chats</Text>
      </View>

      <View>
        <Menu>
            <MenuTrigger customStyles={{
                triggerWrapper: {
                    // trigger wrapper styles
                }
            }}>
                <Pressable
                    onPress={pickImage}
                    className ={twMerge(
                        "bg-green-600 px-6 py-3 rounded-2xl mb-6",
                        "active:bg-green-700"
                    )}
                > 
                    <Text className="text-white text-lg font-semibold">Mudar imagem</Text>
                    {imageUri && (
                       <Image
                            style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
                            source={{uri: imageUri}}
                            placeholder={blurhash}
                            transition={500}
                        /> 
                    )}
                </Pressable>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        borderRadius: 10,
                        borderCurve: 'continuous',
                        marginTop: 40,
                        marginLeft: -30,
                        backgroundColor: 'white',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 0, height: 0},
                        width: 160
                    }
                }}
            >
                <MenuItem
                    action={handleProfile}
                    text="Profile"
                    value={null}
                    icon={<Feather name="user" size={hp(2.5)} color="#737373" /> } 
                />
                
                <Divider />
                <MenuItem
                    text="Sign Out"
                    action={handleLogout}
                    value={null}
                    icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" /> }
                />

            </MenuOptions>
        </Menu>
        
      </View>
    </View>
  )
}

const Divider = ()=>{
    return (
        <View className="p-[1px] w-full bg-neutral-200" />
    )
}