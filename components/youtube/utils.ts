// https://github.com/langchain-ai/langchainjs/blob/a8f7f5c4bd3f09fc5e3dd63b3e81426f4472125d/langchain/src/document_loaders/web/youtube.ts#L62

export const getVideoId = (url: string): string => {
  if (!url.trim()) return "";
  const match = url.match(
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
  );
  if (match !== null && match[1].length === 11) {
    return match[1];
  } else {
    return ""
  }
}
