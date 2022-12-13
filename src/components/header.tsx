import { signIn, useSession } from "next-auth/react";
const DISCORD_LOGO = "/images/discord-mark-white.png"
import Image from "next/image";
import Avatar from "../components/avatar";

const Header = () => {
    const session = useSession();
    return (
        <header className="bg-gray-900 h-16 w-full flex justify-center items-center">
          <div className="flex justify-between items-center lg:w-5/6 w-full p-4">
            <div className="w-half">
              <h1 className="text-xl">
                Pangolin
              </h1>
            </div>
            <div className="border-gray rounded-sm w-half flex items-center">
              {session.data && session.data.user && session.data.user.image && session.data.user.name
              ? 
              <div className="flex justify-between">
                <Avatar image={session.data.user.image} name={session.data.user.name}/>
              </div>
              : 
              <button className="flex border-2 border-gray-600 rounded-md active:rounded-lg active:border-white p-2 transition-all" onClick={() => signIn("discord")}>
              <span className="mr-3">Sign In</span>
              <Image src={DISCORD_LOGO} alt="discord" width={32} height={24} ></Image>
              </button>
              }
            </div>
          </div>
        </header>
    )
}
export default Header;