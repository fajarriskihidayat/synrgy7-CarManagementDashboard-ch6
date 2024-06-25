"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageName = void 0;
function imageName(url) {
    if (!url)
        return "";
    const urlArray = url.split("/");
    const image = `${urlArray[urlArray.length - 2]}/${urlArray[urlArray.length - 1]}`;
    const name = image.split(".")[0];
    return name;
}
exports.imageName = imageName;
