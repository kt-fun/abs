import { Responsive, Text, Tooltip } from "@radix-ui/themes";

interface BSLabelProps {
    label:string,
    size?:Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined,
}

export default function BSLabel(
{children, label,size, tooltip}:BSLabelProps & {children:React.ReactNode,tooltip?:string}
){
    return (
        <>
        {
            tooltip ? 
            <Tooltip content={tooltip}>
                <span className="inline-flex items-center cursor-default">
                    <Text size={size} weight="medium" className="inline-flex items-center space-x-1">
                    <span className="mr-1">{children}</span>                        
                        {label}</Text>
                </span>
            </Tooltip>
        :
        <span className="inline-flex items-center cursor-default">
            
            <Text size={size} weight="medium" className="inline-flex items-center space-x-1">
            <span className="mr-1">{children}</span>
                {label}</Text>
        </span>
        }

        </>

    )
}