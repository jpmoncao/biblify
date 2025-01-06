import { Link } from "react-router";
import { HomeIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BibleReaderControlProps {
    version: string | undefined;
    abbrev: string | undefined;
    chapter: number
}

export default function BibleReaderControl(props: BibleReaderControlProps) {
    return (
        <header
            className='bg-background py-4 w-full flex justify-around items-center border-t-[1px] shadow-md fixed bottom-0 transition-all duration-200 ease-in font-Inter z-10' style={{ boxShadow: '0px -4px 32px rgba(0,0,0,0.4)' }}>
            <div className="w-full flex justify-around gap-2">
                <Link className="w-2/8" to={`/${props.version}/${props.abbrev}/${props.chapter - 1}`}>
                    <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <ArrowLeft className="mx-auto text-primary group-hover:text-primary-foreground" />
                    </Button>
                </Link>
                <Link className="w-2/8" to={`/`}>
                    <Button className="group gap-1 w-4/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <HomeIcon className="mx-auto text-primary group-hover:text-primary-foreground" />
                    </Button>
                </Link>
                <Link className="w-2/8" to={`/${props.version}/${props.abbrev}/${props.chapter + 1}`}>
                    <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <ArrowRight className="mx-auto text-primary group-hover:text-primary-foreground" />
                    </Button>
                </Link>
            </div>
        </ header >
    );
}
