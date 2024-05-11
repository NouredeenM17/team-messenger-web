export const formatTimeStamp = (rawTimestamp: string) => {
    const dateObj = new Date(rawTimestamp||'');
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return `${date} ${time}`;
}

export const fileToBlob = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  return new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
}

export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
          const base64String = reader.result as string;
          if (base64String) {
              resolve(base64String);
          } else {
              reject(new Error('Failed to convert Blob to Base64.'));
          }
      };
      reader.readAsDataURL(blob);
  });
}

export const base64ToBlob = (base64String: string, contentType:string) => {
  const filteredBase64: string = base64String.split(',')[1];
  const byteCharacters = atob(filteredBase64);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: contentType });
}