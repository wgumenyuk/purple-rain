import { thumbnail as Thumbnail } from "ytdl-core";

/**
  Wandelt einen Zeitstempel-String in die Anzahl der Sekunden um.
*/
export const parseDuration = function(duration: string) {
  const units = duration
    .split(":")
    .map(parseInt);

  if(units.length < 1) {
    return null;
  }

  const seconds = units.pop() || 0;
  const minutes = units.pop() || 0;
  const hours = units.pop() || 0;

  return (
    seconds +
    minutes * 60 +
    hours * 3600
  ) || null;
};

/**
  Findet das Thumbnail mit der höchsten Auflösung und gibt dessen URL zurück.
*/
export const getBestThumbnailUrl = function(thumbnails: Thumbnail[]) {
  if(thumbnails.length === 0) {
    return null;
  }

  if(thumbnails.length === 1) {
    return thumbnails[0].url;
  }

  const bestWidth = Math.max(
    ...thumbnails.map((thumbnail) => thumbnail.width)
  );
  
  const bestThumbnail =
    thumbnails.find((thumbnails) => thumbnails.width === bestWidth)!;

  return bestThumbnail.url;
};