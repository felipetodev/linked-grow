export function getVideoId(url: string) {
  if (
    !url.trim() ||
    !(
      url.includes("https://www.youtube.com/watch?v=") ||
      url.includes("https://youtu.be")
    )
  ) return ""

  const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);

  if (!match) return "";

  return match[1];
}
