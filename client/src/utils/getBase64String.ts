export const getBase64String = (data: Array<number>) => {
  const base64Image = btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;
  return dataUrl;
};
