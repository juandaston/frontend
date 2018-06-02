export class CryptoKeyProvider {

  public $get() {
    return {
      hash: function (value) {
        var str = JSON.stringify(value);

        return CryptoJS.SHA1(str).toString();
      },
      encrypt: function(message) {
        return CryptoJS.AES.encrypt(message, "BMkOWuqUvVCY3rg7xXsX").toString();
      },
      decrypt: function(message) {
        return CryptoJS.AES.decrypt(message, "BMkOWuqUvVCY3rg7xXsX").toString(CryptoJS.enc.Utf8)
      }
    };
  }
}
