import { Select } from "@radix-ui/themes"

interface SortMenuProps {
    options: string[];
    current: string;
    onUpdateCurrent: (current: string) => void;
}

export default function SortMenu({options,current,onUpdateCurrent}:SortMenuProps) {
    return (
        <Select.Root defaultValue={current} onValueChange={onUpdateCurrent}>
            <Select.Trigger />
            <Select.Content>
                    {
                        options.map((option:string)=>{
                            return (
                                <Select.Item key={option} value={option}>{option}</Select.Item>
                            )
                        })
                    }
            </Select.Content>
        </Select.Root>
    )
}