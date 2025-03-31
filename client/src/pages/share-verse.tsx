import { useEffect, useState } from "react";
import { Share } from "lucide-react";
import { Header } from "@/components/menu/header";
import { Button } from "@/components/ui/button";

export default function ShareVerse() {
    const colorBackground = 'amber-300';

    return (
        <div className={`bg-${colorBackground} h-[91.5vh] w-full overflow-hidden`}>
            <Header title="Compartilhar" className="bg-transparent border-none" />
            <div className="h-[5.25rem]"></div>
            <main className="w-full px-8 flex flex-col overflow-y-auto h-full">
                <h1 className="text-2xl font-bold">Filipenses 3</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam laudantium quam harum blanditiis nobis tempore sint dolorum in, eius architecto laboriosam veritatis exercitationem repudiandae illum doloremque similique facere pariatur recusandae iusto quo illo placeat excepturi maiores. Tempore aut, sequi possimus expedita aperiam vero? Ex temporibus, dolorem sapiente nam est aspernatur ipsum architecto nemo adipisci veniam! Voluptate reiciendis laboriosam alias, fugit, enim similique id veniam sint dignissimos asperiores odit nam dolorum facilis? Laudantium aliquam eligendi officia non rem cum doloribus harum, commodi eum illum explicabo asperiores dicta unde. Veritatis sed quia doloribus, explicabo sunt ab distinctio iste aliquid, dicta eum rem nemo impedit amet quis consequatur labore excepturi velit debitis. Placeat similique quasi eaque cum itaque totam eos incidunt laudantium libero.</p>
                <div className="flex justify-center items-center w-full mt-6 ">
                    <Button
                        className={`group w-2/3 bg-${colorBackground} border border-b-2 border-primary text-primary hover:text-${colorBackground} hover:bg-primary`}
                    >
                        <Share className={`text-primary group-hover:text-${colorBackground} `} />
                        Compartilhar
                    </Button>
                </div>
            </main>
        </div>
    );
}
