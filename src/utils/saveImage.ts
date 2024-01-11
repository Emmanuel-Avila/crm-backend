import * as https from 'https';
import * as fs from 'fs';
import { join } from 'path';

export const saveImage = (imageUrl: string) => {
  const splittedPath = imageUrl.split("/");
  const imageName = splittedPath[splittedPath.length - 1]
  const dest = join(process.cwd(), 'public', 'image' ,imageName)

  const file = fs.createWriteStream(dest);

  https
    .get(imageUrl, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close((err) => {
          if (err) console.log(err);
        });
      });
      file.on('error', function (err) {
        console.log(err);
      })
    })
    .on('error', function (err) {
      fs.unlink(dest, () => { console.log(err) });
    });
};

