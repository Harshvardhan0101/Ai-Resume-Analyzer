import multer from 'multer';

export function errorHandler(err, req, res, next) {
  console.error('[Error Handler]:', err.message || err);

  // Handle Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'The uploaded file is too large. Maximum file size allowed is 5MB.',
      });
    }
    return res.status(400).json({
      success: false,
      error: `File upload error: ${err.message}`,
    });
  }

  // Handle custom validation, configuration, or parsing errors
  const isClientOrConfigError =
    err.message &&
    (err.message.includes('Invalid') ||
      err.message.includes('GEMINI_API_KEY') ||
      err.message.includes('Please upload') ||
      err.message.includes('job description'));

  const statusCode = err.statusCode || (isClientOrConfigError ? 400 : 500);

  return res.status(statusCode).json({
    success: false,
    error: err.message || 'An unexpected error occurred during processing. Please try again.',
  });
}
