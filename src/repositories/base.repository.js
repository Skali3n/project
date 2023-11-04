import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const getCurrentDirectoryName = () => dirname(fileURLToPath(import.meta.url));

class BaseRepository {
  constructor(dataFilePath) {
    this._dataFilePath = dataFilePath;
    this._initialize();
  }

  _initialize() {
    try {
      console.log(`Initializing ${this.constructor.name}...`);

      const dir = getCurrentDirectoryName();

      if (!existsSync(join(dir, this._dataFilePath))) {
        writeFileSync(join(dir, this._dataFilePath), '[]', 'utf8');
      }
    } catch (error) {
      console.error('Error while initializing repo:', error);
    }
  }

  _fetchData() {
    const dir = getCurrentDirectoryName();
    return JSON.parse(readFileSync(join(dir, this._dataFilePath), 'utf8'));
  }

  _saveData(input) {
    const dir = getCurrentDirectoryName();
    const data = this._fetchData();
    data.push(input);
    writeFileSync(join(dir, this._dataFilePath), JSON.stringify(data, null, 2), 'utf8');
  }
}

export default BaseRepository;
