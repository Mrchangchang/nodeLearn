/**
 * Created by chang on 2017/12/30.
 */
const crypto = require('crypto');
module.exports = {
    md5: function (str) {
        MD5_FUFFIX: '';
        let obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
}