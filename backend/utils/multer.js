import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params: {
    folder: 'host-profiles', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png' ,'webp'],
  },
});
const uploads = multer({storage})

export default uploads