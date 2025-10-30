import { existsSync, readFileSync } from 'fs';
import path from 'path';

export function loadJsonLogSafely(relativePath: string): any | null {
    // Use CWD instead of __dirname for relative resolution from project root
    const filePath = path.resolve(process.cwd(), relativePath);

    if (!existsSync(filePath)) {
        console.warn(`❌ JSON file not found: ${filePath}`);
        return null;
    }

    const fileContent = readFileSync(filePath, 'utf-8');
    if (!fileContent.trim()) {
        console.warn(`❌ JSON file is empty: ${filePath}`);
        return null;
    }

    try {
        return JSON.parse(fileContent);
    } catch (error) {
        console.warn(`❌ Invalid JSON format: ${filePath}`);
        return null;
    }
}
