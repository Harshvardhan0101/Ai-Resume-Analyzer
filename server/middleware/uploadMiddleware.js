import multer from 'multer';

// 5MB file size limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPdfMime = file.mimetype === 'application/pdf';
  const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');

  if (isPdfMime || isPdfExt) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only PDF files are supported.'), false);
  }
};

export const uploadResume = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
  fileFilter,
}).single('resume');
