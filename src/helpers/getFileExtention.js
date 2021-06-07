export default function getFileExtention(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}
