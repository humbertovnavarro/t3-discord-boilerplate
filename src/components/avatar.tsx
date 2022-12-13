import Image from "next/image"
import { useState } from "react";
import DropDown from "./dropdown";
import _ from "lodash";
interface AvatarProps {
    image: string,
    name:  string,
}
const Avatar = ({image, name}: AvatarProps) => {
    const [ dropDownVisible, _setDropDownVisible ] = useState<boolean>(false);
    const setDropDownVisible = _.debounce(_setDropDownVisible, 100);
    return (
        <div 
        >
            <button className="flex items-center"
            onClick={() => {
                setDropDownVisible(true)
            }}
            onBlur={() => {
                setDropDownVisible(false);
            }}
            >
                <span className="mr-2 text-xl">{name}</span>
                <Image src={image} alt={"avatar"} width={38} height={38} className="rounded-lg"/>
            </button>
            <div className="relative right-1 top-3">
                <DropDown visible={dropDownVisible}/>
            </div>
        </div>
    )
}
export default Avatar;