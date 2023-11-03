const fs = require("fs");
const path = require("path");

class BaseRepository {
  _dataFilePath;

  _initialize = () => {
    try {
      console.log(`Initializing ${BaseRepository.name}...`);

      if (!fs.existsSync(path.join(__dirname, this._dataFilePath))) {
        fs.writeFileSync(path.join(__dirname, this._dataFilePath), "[]", "utf8");
      }
    } catch (error) {
      console.error("Error while initializing repo:", error);
    }
  };

  _fetchData() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, this._dataFilePath), "utf8"));
  }

  _saveData(input) {
    const data = this._fetchData();

    data.push(input);

    fs.writeFileSync(path.join(__dirname, this._dataFilePath), JSON.stringify(data, null, 2));
  }
}

module.exports = BaseRepository;
