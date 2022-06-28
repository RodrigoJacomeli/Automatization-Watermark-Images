import fs from 'fs';
import path from 'path';
import Jimp from 'jimp'

(async function () {
    const imgs = fs.readdirSync(path.join(__dirname, 'img', 'Kit'));

    const footerOriginalImage = fs.readdirSync(path.join(__dirname, 'img', 'Footer'));


    for (let i = 0; i < imgs.length; i++) {
        const footerImg = await Jimp.read(`src/img/Footer/${footerOriginalImage}`);

        footerImg.resize(768, 180);

        const kit_img = await Jimp.read(`src/img/Kit/${imgs[i]}`);

        kit_img.composite(footerImg, 140, 1620, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1,
        });

        await kit_img.write(`src/temp/editedImg_${i}.jpg`);
    }
})()
