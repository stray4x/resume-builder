import { Text, View } from "@react-pdf/renderer";

type TextFragment = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

type Block = {
  fragments: TextFragment[];
  listType?: "bullet";
};
type TipTapNode = {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: "bold" | "italic" }[];
};

const parseTextNode = (node: TipTapNode): TextFragment | null => {
  if (node.type !== "text" || !node.text) return null;

  const marks = node.marks ?? [];

  return {
    text: node.text,
    bold: marks.some((m) => m.type === "bold"),
    italic: marks.some((m) => m.type === "italic"),
  };
};
const parseParagraph = (node: TipTapNode): Block => {
  const fragments: TextFragment[] = [];

  node.content?.forEach((child) => {
    const fragment = parseTextNode(child);
    if (fragment) fragments.push(fragment);
  });

  return { fragments };
};
const parseBulletList = (node: TipTapNode): Block[] => {
  const blocks: Block[] = [];

  node.content?.forEach((listItem) => {
    listItem.content?.forEach((child) => {
      if (child.type === "paragraph") {
        const block = parseParagraph(child);
        block.listType = "bullet";
        blocks.push(block);
      }
    });
  });

  return blocks;
};

export const parseTiptapToPdfJsx = (json: string) => {
  let parsed: TipTapNode[] = [];

  try {
    parsed = json.length ? JSON.parse(json) : [];
  } catch {
    parsed = [];
  }

  const blocks: Block[] = [];

  parsed.forEach((node) => {
    switch (node.type) {
      case "paragraph":
        blocks.push(parseParagraph(node));
        break;

      case "bulletList":
        blocks.push(...parseBulletList(node));
        break;
    }
  });

  return (
    <View>
      {blocks.map((block, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            marginLeft: block.listType ? 15 : 0,
            marginBottom: 4,
          }}
        >
          {block.listType && (
            <Text style={{ fontSize: 11, marginRight: 5 }}>{"\u2022"}</Text>
          )}

          <Text style={{ fontSize: 11, flexWrap: "wrap" }}>
            {block.fragments.map((frag, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 11,
                  fontWeight: frag.bold ? 700 : 400,
                  fontStyle: frag.italic ? "italic" : "normal",
                }}
              >
                {frag.text}
              </Text>
            ))}
          </Text>
        </View>
      ))}
    </View>
  );
};
