import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import {
  Heading1,
  Heading2,
  Bold,
  Italic,
  Underline as UrderlineIcon,
  ListOrderedIcon,
  List,
  Highlighter,
  Undo2,
  Redo2,
} from "lucide-react";
import {
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Focus from "@tiptap/extension-focus";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import History from "@tiptap/extension-history";
import FontFamily from "@tiptap/extension-font-family";
import { getHighlightColors } from "@/utils/colors";
import { apiAccount } from "@/services/api";
import { useNotationContext } from "@/contexts/notation";
import { useSettingsContext } from "@/contexts/settings";
import { useToast } from "@/hooks/use-toast";
import { ColorPicker } from "@/components/common/color-picker";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { ToggleGroup } from "@/components/ui/toggle-group";
import FloatingButton from "@/components/note/floatingMenuButton";
import BubbleButton from "@/components/note/bubbleMenuButton";
import { TooltipProvider } from "@/components/ui/tooltip";

const extensions = [
  StarterKit.configure({
    history: false,
  }),
  FontFamily,
  Underline,
  Focus.configure({
    className: "drop-shadow shadow-zinc-400",
  }),
  TextStyle,
  Placeholder.configure({
    placeholder: "Comece escrevendo aqui…",
    emptyNodeClass:
      "before:content-[attr(data-placeholder)] before:text-gray-400 before:pointer-events-none before:absolute",
  }),
  Typography,
  History,
  Highlight.configure({ multicolor: true }),
];

export default function Editor() {
  const { toast } = useToast();

  const notationContext = useNotationContext();
  const { saveIsPending, setSaveIsPending } = notationContext;

  const [searchParams] = useSearchParams();
  const { settings } = useSettingsContext();
  const { fontEditor, fontEditorSize, theme, token } = settings();

  const [colorHighlight, setColorHighlight] = useState(
    getHighlightColors(theme)[0]
  );
  const [content, setContent] = useState("");
  const [loadingContent, setLoadingContent] = useState(true);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: `selection:bg-primary selection:text-primary-foreground prose prose-sm sm:prose xl:prose-lg focus:outline-none *:my-1 *:text-foreground w-full max-w-full break-words ${theme} ${fontEditorSize}`,
      },
    },
    onUpdate: ({ editor }) => {
      if (!editor.state.selection.empty) {
        const toSelection = editor.state.selection.to;
        editor.commands.setTextSelection({
          from: toSelection,
          to: toSelection,
        });
      }
      setSaveIsPending(true);
    },
  });

  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

  useEffect(() => {
    const fetchData = async () => await fetchEditorContent();

    fetchData();
  }, []);

  useEffect(() => {
    if (editor) {
      // Adiciona um espaço antes de cada letra maiúscula (exceto a primeira)
      const formattedFontEditor =
        fontEditor?.replace(/(?!^)([A-Z])/g, " $1") ?? "Inter";

      editor.commands.setFontFamily(formattedFontEditor);
    }
  }, [editor, fontEditor]);

  useEffect(() => {
    if (debouncedEditor && saveIsPending) {
      const saveData = async () => await saveEditorContent();

      saveData();
      setSaveIsPending(false);
    }
  }, [debouncedEditor, saveIsPending]);

  if (!editor) {
    return null;
  }

  const fetchEditorContent = async () => {
    const date = searchParams.get("date");
    try {
      if (date && token) {
        const response = await apiAccount.get(
          `/notes/devotional-notation/${date}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const content = response.data?.data?.content || "";

        setContent(content);

        if (editor) {
          editor.commands.setContent(content);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  const saveEditorContent = async () => {
    try {
      const date = searchParams.get("date");

      await apiAccount.post(
        "/notes/devotional-notation",
        {
          date,
          content: editor.getHTML(),
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    } catch (err: any) {
      console.error(err);

      if ((err.response.status = 400))
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
  };

  return (
    <TooltipProvider>
      <div className="pb-12">
        {loadingContent ? <Loader /> : <EditorContent editor={editor} />}

        <div className="flex absolute top-[1.35rem] right-36 lg: w-12 bg-background rounded-md">
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
          className="flex gap-1 bg-background shadow-md rounded-md border p-1 text-primary relative top-10 -left-3"
        >
          <div className="flex gap-2 bg-transparent p-[0.1rem]">
            <FloatingButton
              title="Título (#)"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="h-4 w-4" />
            </FloatingButton>

            <FloatingButton
              title="Subtítulo (##)"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" />
            </FloatingButton>

            <FloatingButton
              title="Lista (-)"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </FloatingButton>

            <FloatingButton
              title="Lista Ordenada (1.)"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrderedIcon className="h-4 w-4" />
            </FloatingButton>
          </div>
        </FloatingMenu>

        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
            placement: "auto-end",
          }}
          className="flex gap-1 bg-background shadow-md rounded-md border px-2 py-1 text-primary"
        >
          <ToggleGroup type="multiple" className="flex items-center gap-1">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Negrito (Ctrl+B)"
              dataState={editor.isActive("bold") ? "on" : "off"}
              value="bold"
              ariaLabel="Negrito"
            >
              <Bold className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Itálico (Ctrl+I)"
              dataState={editor.isActive("italic") ? "on" : "off"}
              value="italic"
              ariaLabel="Itálico"
            >
              <Italic className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Sublinhado (Ctrl + U)"
              dataState={editor.isActive("underline") ? "on" : "off"}
              value="underline"
              ariaLabel="Sublinhado"
            >
              <UrderlineIcon className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: colorHighlight })
                  .run()
              }
              title="Marca Texto"
              dataState={editor.isActive("highlight") ? "on" : "off"}
              value="highlight"
              ariaLabel="Marca Texto"
            >
              <Highlighter className="h-4 w-4" />
            </BubbleButton>

            <ColorPicker
              variant="simple"
              solids={getHighlightColors(theme)}
              color={colorHighlight}
              setColor={setColorHighlight}
              className="bg-accent"
            />
          </ToggleGroup>
        </BubbleMenu>
      </div>
    </TooltipProvider>
  );
}