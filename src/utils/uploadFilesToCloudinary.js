import cloudinary from "@/lib/cloudinary.js";
import { getBase64, getFileMimeTypeAndBuffer } from "@/lib/helper";
import { v4 as uuid } from "uuid";

export default async (files = []) => {
  const uploadPromises = files.map(async (file) => {
    const fileBufferObj = await getFileMimeTypeAndBuffer(file);
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(fileBufferObj),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) {
            return reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map(({ public_id, secure_url }) => ({
      public_id,
      url: secure_url,
    }));
    return formattedResults;
  } catch (error) {
    throw new Error(`error uploading files to cloudinary ${error}`);
  }
};
