import CryptoJS from 'crypto-js';

export function decryptData(encryptedData: string): any {
    // debugger
    const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}
