import fs from 'fs';

export interface Data {
  [key: string]: string | number | string[];
}

export async function writeDataToFile(filePath: string, data: Data[]) {
  fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    'utf8',
    (err: unknown) => {
      if (err) {
        console.error(err);
      }
    }
  );
}
