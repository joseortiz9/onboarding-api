import * as path from 'path';

const StorageConfig = {
  projectId: process.env.PROJECT_ID,
  keyFilename: path.join(
    process.cwd(),
    './cloud-computing-itmo-73b18bc2bdb2.json'
  ),
  // private_key: process.env.PRIVATE_KEY,
  // client_email: process.env.CLIENT_EMAIL,
  mediaBucket: process.env.STORAGE_MEDIA_BUCKET,
};

export default StorageConfig;
