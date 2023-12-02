import { promises as fs } from 'fs';

export async function ReadFile(path) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await fs.readFile(path, 'utf8'));
        } catch (err) {
            reject(err);
        }
    });
}
