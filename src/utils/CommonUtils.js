class CommonUtils {
  static isNumber1(number) {
    if (number === 1) return true;
    return false;
  }
  // search: react read file to base 64
  static async getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
}

export default CommonUtils;
