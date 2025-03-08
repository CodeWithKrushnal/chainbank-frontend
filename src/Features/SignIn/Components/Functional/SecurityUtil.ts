import CryptoJS from 'crypto-js';

// Encryption utility class
class SecurityUtil {
    // Generate a secure random key derivation salt
    private static generateSalt(length: number = 16): string {
        // Use Web Crypto API for secure random generation
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);

        // Convert to base64 or hex string
        return Array.from(array)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    // Derive a key using PBKDF2
    private static deriveKey(password: string, salt: string): CryptoJS.lib.WordArray {
        return CryptoJS.PBKDF2(password, salt, {
            keySize: 256 / 32, // 256-bit key
            iterations: 1000 // Number of hash iterations
        });
    }

    // Encrypt data with enhanced security
    static encrypt(data: any, secretKey: string): string {
        try {
            // Generate a unique salt for each encryption
            const salt = this.generateSalt();

            // Derive a strong key
            const key = this.deriveKey(secretKey, salt);

            // Convert data to JSON string
            const jsonData = JSON.stringify(data);

            // Encrypt the data
            const encrypted = CryptoJS.AES.encrypt(jsonData, key, {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // Combine salt and encrypted data
            return `${salt}:${encrypted.toString()}`;
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Encryption failed');
        }
    }

    // Decrypt data
    static decrypt(encryptedData: string, secretKey: string): any {
        try {
            // Split salt and encrypted data
            const [salt, ciphertext] = encryptedData.split(':');

            // Derive the key using the same method
            const key = this.deriveKey(secretKey, salt);

            // Decrypt the data
            const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // Convert to readable string and parse JSON
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Decryption failed');
        }
    }
}

export default SecurityUtil;