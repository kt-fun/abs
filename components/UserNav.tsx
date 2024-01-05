import { Tooltip,Text, Dialog } from "@radix-ui/themes";
import { LoginForm } from "./LoginForm";

export default function UserNav() {
    // if logged in
    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger>
                <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>
                  <Text size={"4"}> Sign in </Text>
                </div>
                </Dialog.Trigger>
                <Dialog.Content>
                    <LoginForm/>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}