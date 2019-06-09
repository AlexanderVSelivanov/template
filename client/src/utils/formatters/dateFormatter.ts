export default function(date: string | Date) {
  if (typeof date === 'string') {
    return new Date(date).toLocaleString();
  }
  return date.toLocaleString();
}
