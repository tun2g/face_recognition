const fs = require('fs');
const path = require('path');

const imageFolderPath = './datasets/images/tests'; // Thay đổi đường dẫn thư mục hình ảnh tại đây
const outputFilePath = './datasets/test.csv'; // Thay đổi đường dẫn và tên file CSV tại đây

// Đọc danh sách các tệp tin trong thư mục hình ảnh
fs.readdir(imageFolderPath, (err, files) => {
  if (err) {
    console.error('Lỗi khi đọc thư mục hình ảnh:', err);
    return;
  }

  // Lọc ra các tệp tin hình ảnh (có thể chỉnh sửa phần điều kiện này tùy theo định dạng hình ảnh bạn sử dụng)
  const imageFiles = files.filter(file => 
    path.extname(file).toLowerCase() === '.jpg' 
    || path.extname(file).toLowerCase() === '.png');

  // Tạo nội dung cho file CSV
  let csvContent = 'image,label\n'; // Header của file CSV
  imageFiles.forEach((file,index) => {
    const imageName = `image${file.slice(0,-4).slice(-5)}`;
    const newImageName = file.slice(0,-9); 

    csvContent += `${imageName},${newImageName}\n`;
  });

  // Ghi nội dung vào file CSV
  fs.writeFile(outputFilePath, csvContent, 'utf8', (err) => {
    if (err) {
      console.error('Lỗi khi ghi file CSV:', err);
      return;
    }
    console.log(`Đã xuất file CSV thành công: ${outputFilePath}`);
  });
});
