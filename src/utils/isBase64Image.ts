export function isBase64Image(imageString: string | null): boolean {
  return (
    typeof imageString === 'string' &&
    /^data:image\/\w+;base64,/.test(imageString)
  );
}
