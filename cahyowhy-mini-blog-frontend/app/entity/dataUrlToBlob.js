export const dataUrlToBlob = function (dataurl) {
  let data = dataurl.split(','),
    mimetypeFile = data[0].match(/:(.*?);/)[1],
    bytestring = atob(data[1]),
    index = bytestring.length, blobArray = new window.Uint8Array(index);
  while (index--) {
    blobArray[index] = bytestring.charCodeAt(index);
  }
  return new Blob([blobArray], {type: mimetypeFile});
};
