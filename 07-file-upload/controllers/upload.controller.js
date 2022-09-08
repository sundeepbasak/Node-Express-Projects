const path = require("path"); //path module
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors"); //or '../errors/index'
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//storing images locally to a folder named uploads in public folder
const uploadProductImageLocal = async (req, res) => {
  /* before uploading --> 
      check if file exists, 
      check format, 
      check size
  */
  // console.log(req.files);

  //check for file exist
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  //check for format
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  //check for size
  const maxSize = 1000 * 1000; //1MB
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  // console.log(imagePath);
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

//storing image in cloudinary
const uploadProductImage = async (req, res) => {
  // console.log(req.files.image);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "07-file-upload",
    }
  );
  // console.log(result);

  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};

/* //*uploadProductImageLocal

> first we upload the image on the server, so that the image path becomes publicly available, and then we take the path and use in createProduct controller func.

> req.files.image --> is an object
> eg: req.files.image.name = 'computer-1.jpeg'

> after we have made the public folder publicly available using express.static middleware --> now, we can get the image by:
> localhost:5000/uploads/computer-1.png
*/

/* //*uploadProductImage --> to cloudinary

> in app.js --> we write --> app.use(fileUpload({ useTempFiles: true }));
> this will create a temp folder from where we will use the image path

> cloudinary.uploader.upload()
> upload takes in 2 args --> image path and

> here we have seen that, on every upload to cloudinary, it first stores in a temp file, which we dont want
> therefore, we use fs module for this 
> fs.unlinkSync() method is used to synchronously remove a file or symbolic link from the filesystem.
*/
