import { randomBytes } from "crypto";

const cryptoGenerate = async (
    len: number,
    format: BufferEncoding = "base64"
) => {
    return new Promise<string>((resolve, reject) => {
        randomBytes(len, (err, buf) => {
            if (err) reject(err);
            else resolve(buf.toString(format).slice(0, len));
        });
    });
};

export { cryptoGenerate };
