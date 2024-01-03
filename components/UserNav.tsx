import { Tooltip,Text } from "@radix-ui/themes";

export default function UserNav() {
    return (
        <div>
            <Tooltip className="" content="sign in">
                <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>
                  <Text size={"4"}> Sign in </Text>
                </div>
            </Tooltip>
        </div>
    )
}