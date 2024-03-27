import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface SortMenuProps {
    options: string[];
    current: string;
    onUpdateCurrent: (current: string) => void;
    className?: string;
    placeholder?: string;
}

export default function SortMenu({options,current,onUpdateCurrent,className}:SortMenuProps) {
    return (
        <Select defaultValue={current} onValueChange={onUpdateCurrent}>
            <SelectTrigger className={className}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
                    {
                        options.map((option:string)=>{
                            return (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            )
                        })
                    }
            </SelectContent>
        </Select>
    )
}