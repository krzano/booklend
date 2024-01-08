import { nanoid } from "nanoid"
/**
 *
 * @param originalFileName original name of the file (value of file.name)
 * @param {string} [startString="file"] string which will be added at the beginning of the returned string (default value of the startString is "file")
 * @example
 * generateUniqueFileName("photo.jpg", "userPhoto") => "userPhoto-V1StGXR8_Z5jdHi6B-myT.jpg"
 * @returns {string} uniqueFileName
 */
const generateUniqueFileName = (
  originalFileName: string,
  startString?: string,
) => {
  const fileExtension = originalFileName.split(".").pop()
  return `${
    startString ? startString.trim().replaceAll(" ", "") : "file"
  }-${nanoid()}.${fileExtension}`
}

export default generateUniqueFileName
