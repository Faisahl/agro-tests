export default function isAlphabeticAtoZ(arr:string[]) {
  return arr.slice()
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .every((val, i) => val === arr[i]);
}