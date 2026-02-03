import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readData<T>(fileName: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(dataDir, fileName);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await writeData(fileName, fallback);
    return fallback;
  }
}

export async function writeData<T>(fileName: string, data: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export function generateId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
