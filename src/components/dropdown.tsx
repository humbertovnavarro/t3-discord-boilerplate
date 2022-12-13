import { signOut } from "next-auth/react"

interface DropDownChoiceProps {
    children: React.ReactNode
    onClick: () => unknown
}


const DropDownChoice = ({children, onClick}: DropDownChoiceProps) => {
    return (
        <button className="p-1 bg-gray-700 w-full  hover:bg-gray-600 transition-all rounded-md"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

interface DropDownProps {
    visible: boolean
}

export const DropDown  = ({visible}: DropDownProps) => {
    return (
        <>
        {visible &&
        <div className={`absolute bg-gray-900 w-full rounded-md active:border-white active:border-[1px]`}>
            <DropDownChoice
                onClick={() => {
                    signOut()
                }}
            >
                <span className="text-red-400">
                    Sign Out
                </span>
            </DropDownChoice>
        </div>}
        </>
    )
}
export default DropDown;