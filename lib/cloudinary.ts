import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
): Promise<UploadApiResponse> {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "saveurrentable",
          resource_type: "auto",
        },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error details:", err);
            reject(err);
          } else {
            resolve(result as UploadApiResponse);
          }
        },
      )
      .end(bytes);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
