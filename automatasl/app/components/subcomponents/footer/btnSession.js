

import { Image, TouchableOpacity } from "react-native";



export default function BtnPage({ img, onSession }) {
    return (
        <TouchableOpacity style={{ backgroundColor: "red", width: "20%",borderRadius:26}} onPress={onSession} activeOpacity={0.7}>
            <Image source={img} 
            style={{width: "100%",height:"100%",borderRadius:26}} 
            resizeMode="stretch"
            />
        </TouchableOpacity>
    );
}