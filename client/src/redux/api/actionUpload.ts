import axios from "axios";

export async function upLoadToCloudinary(formData: FormData, url: string) {
  try {
    const res = await axios.post(url, formData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });

    if (!res) throw new Error("Could not post to cloudinary");

    return {
      imageObject: res.data,
      msg: "Post image to cloudinary done!",
    };
  } catch (err) {
    console.error(err);
  }
}
