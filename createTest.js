const fs = require('fs');
const path = require('path');

const trainsPath = './dataset/images/trains';
const testsPath = '/dataset/images/tests';

// Đọc danh sách thư mục trong trainsPath
fs.readdir(trainsPath, (err, directories) => {
  if (err) {
    console.error('Error reading directories:', err);
    return;
  }

  // Lặp qua từng thư mục trong trainsPath
  directories.forEach((dir) => {
    const sourceDir = path.join(trainsPath, dir);
    const destinationDir = path.join(testsPath, dir);

    // Kiểm tra và tạo thư mục đích nếu chưa tồn tại
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    // Đọc danh sách tệp tin trong thư mục nguồn
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        console.error(`Error reading files in directory ${sourceDir}:`, err);
        return;
      }

      // Lặp qua 5 tệp tin đầu tiên trong thư mục nguồn
      for (let i = 0; i < 5 && i < files.length; i++) {
        const sourceFile = path.join(sourceDir, files[i]);
        const destinationFile = path.join(destinationDir, `image_${i + 1}.jpg`);

        // Di chuyển tệp tin từ thư mục nguồn sang thư mục đích
        fs.rename(sourceFile, destinationFile, (err) => {
          if (err) {
            console.error(`Error moving file ${sourceFile}:`, err);
          } else {
            console.log(`Moved ${sourceFile} to ${destinationFile}`);
          }
        });
      }
    });
  });
});
