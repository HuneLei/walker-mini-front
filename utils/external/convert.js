// 格式化方法

// url地址解析
const convertRequest = (url) => {
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(url.indexOf("?") + 1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
export default {
  convertRequest,
};