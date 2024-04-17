import { type JSONContent } from "novel";

function textToJSON(text: string): JSONContent {
  return {
    type: "doc",
    content: text.split("\n").map((line) => {
      if (line === "") return {
        type: "paragraph",
      }
      if (line.includes("**")) {
        let startIndex = line.indexOf("**");
        let endIndex = line.lastIndexOf("**");

        if (startIndex !== -1 && endIndex !== -1) {
          const extractedText = line.substring(startIndex + 2, endIndex);
          const beforeText = line.substring(0, startIndex);
          const afterText = line.substring(endIndex + 2);

          return {
            type: "paragraph",
            content: [
              ...beforeText ? [
                {
                  type: "text",
                  text: beforeText,
                },
              ] : [],
              {
                type: "text",
                text: extractedText,
                marks: [
                  {
                    type: "bold",
                  },
                ],
              },
              ...afterText ? [
                {
                  type: "text",
                  text: afterText,
                },
              ] : [],
            ],
          }
        } else {
          return {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: line,
              },
            ],
          }
        }
      }
      return {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: line,
          },
        ],
      }
    })
  }
}

function jsonToText(json: JSONContent): string {
  if (!json.content) return "";
  return json.content.map((content) => {
    if (content.type === "paragraph") {
      return content.content?.map((text) => {
        if (text.type === "text" && text.marks) {
          const mark = text.marks.map(mark => mark.type)
          if (mark.includes("bold") && mark.includes("italic")) {
            return `**_${text.text}_**`;
          }
          if (mark.includes("bold")) {
            return `**${text.text}**`;
          }
          if (mark.includes("italic")) {
            return `*${text.text}*`;
          }
          return text.text;
        }

        if (text.type === "text") return text.text;
        return "";
      }).join("");
    }
    return "";
  }).join("\n");
}

export {
  textToJSON,
  jsonToText,
}
