/**
  Wandelt einen Zeitstempel-String in die Anzahl der Sekunden um.
*/
export const parseDuration = function(duration: string) {
  const units = duration
    .split(":")
    .map(parseInt);

  if(units.length < 1) {
    return 0;
  }

  const seconds = units.pop() || 0;
  const minutes = units.pop() || 0;
  const hours = units.pop() || 0;

  return (
    seconds +
    minutes * 60 +
    hours * 3600
  );
};