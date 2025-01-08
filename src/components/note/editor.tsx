import { useEffect, useState } from "react";
import {
    Heading1, Heading2, Bold, Italic, Underline as UrderlineIcon,
    ListOrderedIcon, List, Highlighter, Undo2, Redo2, LetterText
} from 'lucide-react';
import { FloatingMenu, BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Focus from '@tiptap/extension-focus';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import History from '@tiptap/extension-history';
import { ColorPicker } from "@/components/common/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const solidsHighlight = [
    '#E2E2E2',
    '#ed4c5c',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
]

const solids = [
    '#000000',
    '#dfdfdf',
    '#9c0c1a',
    '#a60761',
    '#e66407',
    '#ffd608',
    '#69bd2d',
    '#10a2c7',
    '#6920a8',
]

const extensions = [
    StarterKit.configure({
        history: false
    }),
    Underline,
    Highlight.configure({ multicolor: true }),
    Focus.configure({
        className: "text-red-500"
    }),
    TextStyle,
    Color,
    Placeholder.configure({
        placeholder: 'Comece escrevendo aqui…',
        emptyNodeClass:
            'before:content-[attr(data-placeholder)] before:text-gray-400 before:pointer-events-none before:absolute',
    }),
    Typography,
    History
];

const content = "";

export default function Editor() {
    const [colorHighlight, setColorHighlight] = useState('#ffe83f');
    const [color, setColor] = useState('#000000');

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'selection:bg-primary selection:text-primary-foreground prose prose-sm sm:prose <xl:prose-lg></xl:prose-lg> focus:outline-none *:my-1 *:text-primary',
            },
        },
    });

    useEffect(() => {
        if (editor) editor.commands.setColor(color);
    }, [color]);

    if (!editor) {
        return null;
    }

    return (
        <div className="pb-12">
            <EditorContent editor={editor} />

            <div className="flex fixed bottom-2 right-4 bg-background rounded-md">
                <div
                    className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo2 size={18} />
                </div>
                <div
                    className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo2 size={18} />
                </div>
            </div>

            <FloatingMenu
                editor={editor}
                tippyOptions={{ duration: 100 }}
                className='flex gap-1 bg-background shadow-md rounded-md border p-1 text-secondary relative top-8 -left-3'
            >
                <div className='flex gap-2 bg-transparent p-[0.1rem]'>
                    <div
                        className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                        <Heading1 className="h-4 w-4" />
                    </div>
                    <div
                        className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <Heading2 className="h-4 w-4" />
                    </div>
                    <div
                        className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <List className="h-4 w-4" />
                    </div>
                    <div
                        className="cursor-pointer transition-all rounded p-1 hover:text-primary hover:bg-secondary"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOrderedIcon className="h-4 w-4" />
                    </div>
                </div>
            </FloatingMenu>

            <BubbleMenu
                editor={editor}
                className='flex gap-1 bg-background shadow-md rounded-md border px-2 py-1 text-secondary'
            >
                <ToggleGroup type="multiple">
                    <LetterText size={18} />
                    <ColorPicker
                        variant="simple"
                        solids={solids}
                        color={color}
                        setColor={setColor}
                    />

                    {/* Negrito */}
                    <ToggleGroupItem
                        value="bold"
                        aria-label="Toggle bold"
                        data-state={editor.isActive('bold') ? 'on' : 'off'} // Ativa visualmente
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>

                    {/* Itálico */}
                    <ToggleGroupItem
                        value="italic"
                        aria-label="Toggle italic"
                        data-state={editor.isActive('italic') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>

                    {/* Sublinhado */}
                    <ToggleGroupItem
                        value="underline"
                        aria-label="Toggle underline"
                        data-state={editor.isActive('underline') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <UrderlineIcon className="h-4 w-4" />
                    </ToggleGroupItem>

                    {/* Destaque */}
                    <ToggleGroupItem
                        value="highlight"
                        aria-label="Toggle highlight"
                        data-state={editor.isActive('highlight') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleHighlight({ color: colorHighlight }).run()}
                    >
                        <Highlighter className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ColorPicker
                        variant="simple"
                        solids={solidsHighlight}
                        color={colorHighlight}
                        setColor={setColorHighlight}
                    />
                </ToggleGroup>
            </BubbleMenu>
        </div >
    );
}
