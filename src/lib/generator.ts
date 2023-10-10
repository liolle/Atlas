import { randomBytes } from "crypto";

const cryptoGenerate = async (len: number) => {
    return new Promise<string>((resolve, reject) => {
        randomBytes(len, (err, buf) => {
            if (err) reject(err);
            else resolve(buf.toString("base64").slice(0, len));
        });
    });
};

export { cryptoGenerate };
