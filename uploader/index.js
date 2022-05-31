var express = require('express');
var helmet = require('helmet');
var cors = require('cors');
const { format } = require('util');
require('dotenv').config();
const { nanoid } = require('nanoid');

const { Storage } = require('@google-cloud/storage');
var app = express();
const path = require('path');
const serviceKey = path.join(
  __dirname,
  process.env.UPLOADER_SERVICE_ACCOUNT_KEY,
);

const PORT = parseInt(process.env.UPLOADER_PORT) || 9009;
const fileSize = 10 * 1024 * 1024; // no larger than 10mb

const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize,
  },
});

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.UPLOADER_GCP_PROJECT,
});
const bucket = storage.bucket(process.env.UPLOADER_BUCKET_NAME);

app.get('/', (req, res) => {
  res.json({ data: 'uploader' });
});

app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ statusCode: 400, error: 'No file uploaded' });
  }

  if (req.file.size > fileSize) {
    return res.status(400).json({
      statusCode: 400,
      error: `File is larger than ${fileSize / 1000} mb`,
    });
  }

  const acceptedFormats = ['jpg', 'png', 'jpeg'];
  if (!acceptedFormats.includes(req.file.mimetype.split('/')[1])) {
    return res.status(400).json({
      statusCode: 400,
      error: `Invalid file format ${req.file.mimetype}`,
    });
  }

  try {
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(`${nanoid(10)}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      next(err);
    });

    blobStream.on('finish', () => {
      // public url.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      res
        .status(200)
        .json({ message: 'file uploaded', data: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (e) {
    console.error(e);
    return res.status(503).json({ message: 'upload failed', data: e });
  }
});

app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: 'unknown route' });
});

app.listen(PORT, (err) => {
  err
    ? console.error('server can not start')
    : console.log(`server started on ${PORT}`);
});
