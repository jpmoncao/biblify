import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from 'use-debounce';
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
import FontFamily from '@tiptap/extension-font-family';
import { getColors, getHighlightColors } from "@/utils/colors";
import { apiAccount } from "@/services/api";
import { useNotationContext } from "@/contexts/notation";
import useSettings from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";
import { ColorPicker } from "@/components/common/color-picker";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const extensions = [
    StarterKit.configure({
        history: false
    }),
    FontFamily,
    Underline,
    Highlight.configure({ multicolor: true }),
    Focus.configure({
        className: "drop-shadow shadow-zinc-400"
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

export default function Editor() {
    const { toast } = useToast();

    const notationContext = useNotationContext();
    const { saveIsPending, setSaveIsPending } = notationContext;

    const [searchParams] = useSearchParams();
    const { settings } = useSettings();
    const { fontEditor, fontEditorSize, theme, token } = settings;

    const [colorHighlight, setColorHighlight] = useState(getHighlightColors(theme)[0]);
    const [color, setColor] = useState(getColors(theme)[0] ?? '#000000');
    const [content, setContent] = useState('');
    const [loadingContent, setLoadingContent] = useState(true);

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: `selection:bg-primary selection:text-primary-foreground prose prose-sm sm:prose xl:prose-lg focus:outline-none *:my-1 *:text-foreground w-full max-w-full break-words ${theme} ${fontEditorSize}`,
            },
        },
        onUpdate: () => {
            setSaveIsPending(true);
        }
    });

    const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

    useEffect(() => {
        const fetchData = async () => await fetchEditorContent();

        fetchData();
    }, [])

    useEffect(() => {
        if (editor) {
            // Adiciona um espaço antes de cada letra maiúscula (exceto a primeira)
            const formattedFontEditor = fontEditor?.replace(/(?!^)([A-Z])/g, ' $1') ?? 'Inter';

            editor.commands.setFontFamily(formattedFontEditor);
            editor.commands.setColor(color);
        }
    }, [editor, color, fontEditor]);

    useEffect(() => {
        if (debouncedEditor && saveIsPending) {
            const saveData = async () => await saveEditorContent();

            saveData();
            setSaveIsPending(false);
        }
    }, [debouncedEditor]);

    if (!editor) {
        return null;
    }

    const fetchEditorContent = async () => {
        const date = searchParams.get('date');
        try {
            if (date && token) {
                const response = await apiAccount.get(`/notes/devotional-notation/${date}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const content = response.data?.data?.content || '';

                setContent(content);

                if (editor) {
                    editor.commands.setContent(content);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar conteúdo:', error);
        } finally {
            setLoadingContent(false)
        }
    };

    const saveEditorContent = async () => {
        try {
            await apiAccount.post('/notes/devotional-notation', {
                date: searchParams.get('date'),
                content: editor.getHTML()
            }, {
                headers: { Authorization: 'Bearer ' + token }
            });
        } catch (err: any) {
            console.error(err);

            if (err.response.status = 400)
                toast({
                    title: err.response.data.error,
                    description: err.response.data.message,
                    variant: "destructive",
                });
            else
                toast({
                    title: "Houve um erro ao efetuar login!",
                    description: "Tente novamente mais tarde.",
                    variant: "destructive",
                });
        }
    }

    return (
        <div className="pb-12">
            {loadingContent ? <Loader /> : <EditorContent editor={editor} />}

            <div className="flex fixed bottom-2 right-4 bg-background rounded-md">
                <Button
                    className="cursor-pointer transition-all rounded p-1"
                    variant="ghost"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo2 size={18} />
                </Button>
                <Button
                    className="cursor-pointer transition-all rounded p-1"
                    variant="ghost"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo2 size={18} />
                </Button>
            </div>



            <FloatingMenu
                editor={editor}
                tippyOptions={{ duration: 100 }}
                className='flex gap-1 bg-background shadow-md rounded-md border p-1 text-primary relative top-8 -left-3'
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
                className='flex gap-1 bg-background shadow-md rounded-md border px-2 py-1 text-primary'
            >
                <ToggleGroup type="multiple">
                    <LetterText size={18} />
                    <ColorPicker
                        variant="simple"
                        solids={getColors(theme)}
                        color={color}
                        setColor={setColor}
                    />

                    <ToggleGroupItem
                        value="bold"
                        aria-label="Toggle bold"
                        data-state={editor.isActive('bold') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="italic"
                        aria-label="Toggle italic"
                        data-state={editor.isActive('italic') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="underline"
                        aria-label="Toggle underline"
                        data-state={editor.isActive('underline') ? 'on' : 'off'}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <UrderlineIcon className="h-4 w-4" />
                    </ToggleGroupItem>

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
                        solids={getHighlightColors(theme)}
                        color={colorHighlight}
                        setColor={setColorHighlight}
                    />
                </ToggleGroup>
            </BubbleMenu>
        </div >
    );
}
