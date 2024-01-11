import * as https from 'https';
import * as fs from 'fs';

export const saveImage = (url: string, dest: string, cb: (message?: string) => void) => {
  const file = fs.createWriteStream(dest);

  https
    .get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close((err) => cb(err?.message));
      });
    })
    .on('error', function (err) {
      fs.unlink(dest, () => cb(err?.message));
    });
}; 