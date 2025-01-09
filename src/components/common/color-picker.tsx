import { Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ColorPickerProps {
    color: string
    setColor: (color: string) => void
    className?: string
    variant?: 'simple' | 'detailed'
    solids: string[];
}

export function ColorPicker({
    variant = 'detailed',
    color,
    setColor,
    className,
    solids
}: ColorPickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={`${className} py-1 px-2 max-w-[220px] justify-start text-left font-normal ${!color && 'text-muted-foreground'}`}
                >
                    <div className="w-full flex items-center gap-2">
                        {color ? (
                            <div
                                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                                style={{ background: color }}
                            ></div>
                        ) : (
                            <Paintbrush className="h-4 w-4" />
                        )}
                        <div className={`truncate flex-1 ${variant != 'detailed' && 'hidden'}`}>
                            {color ? color : 'Pick a color'}
                        </div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="flex flex-wrap gap-1 mt-0">
                    {solids.map((s) => (
                        <div
                            key={s}
                            style={{ background: s }}
                            className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                            onClick={() => setColor(s)}
                        />
                    ))}
                </div>

                <Input
                    id="custom"
                    value={color}
                    className={`col-span-2 h-8 mt-4 ${variant == 'detailed' ? 'block' : 'hidden'}`}
                    onChange={(e) => setColor(e.currentTarget.value)}
                />
            </PopoverContent>
        </Popover>
    )
}
