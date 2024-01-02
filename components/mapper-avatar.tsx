
import VerifiedIcon from '@/icons/VerifiedIcon';
import { Avatar, Box, Responsive } from '@radix-ui/themes';
import Image from 'next/image'
import { CiLight } from 'react-icons/ci';
interface BSMapperAvatarProps {
    src:string
    size?:Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined,
    verified?:boolean,
    fallback?:string,
    className?:string
}

export default function MapperAvatar(
    {src,verified,size = "1", fallback,className}:BSMapperAvatarProps
) {
  return (
    <>
    <Box className={`relative w-6 h-6 m-1 flex ${className}`}>
      <Avatar src={src} size={size} className="absolute bottom-0 right-0" radius='full' fallback={fallback?fallback:'N'}/>
      {
        verified && <CiLight/>
      }
    </Box>
    </>
  )
}