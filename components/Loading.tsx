import { Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";



export default function Loading() {
    return (
        <div className="flex justify-center w-full h-full items-center">
        <div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
            <Text size={"3"} className="flex items-center justify-center space-x-2">
            <motion.span 
                animate={{rotate:360}}
                transition={{duration:2,repeat:Infinity}}
                className={`hover:bg-white p-1 rounded-full`}
            >
                <AiOutlineLoading/>
            </motion.span>
            <span>Loading...</span>
            </Text>
        </div>
    </div>
    )
}