/**
 * Receives an Image Object (can be JPG, PNG, or WEBP) and returns a new Image Object compressed
 * @param {Image} source_img_obj The source Image Object
 * @param {Integer} quality The output quality of Image Object
 * @param {String} output format. Possible values are jpg, png, and webp
 * @return {Image} result_image_obj The compressed Image Object
 */
const compressionRate = 80;

function compress(source_img_obj, quality, output_format) {
    let mime_type;
    if (output_format === 'png') {
        mime_type = 'image/png';
    } else if (output_format === 'webp') {
        mime_type = 'image/webp';
    } else {
        mime_type = 'image/jpeg';
    }

    let cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    let ctx = cvs.getContext('2d').drawImage(source_img_obj, 0, 0);
    let newImageData = cvs.toDataURL(mime_type, quality / 100);
    let result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
}

async function fileToImage(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = ({ target }) => {
            const { result } = target;
            let img = new Image();
            img.src = result;
            resolve(img);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
}

function imageToFile(image) {
    let base64data = image.src.replace('data:image/jpeg;base64,', '');
    let bs = atob(base64data);
    let buffer = new ArrayBuffer(bs.length);
    let ba = new Uint8Array(buffer);
    for (let i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    let blob = new Blob([ba], { type: 'image/jpeg' });
}

async function imageCompression(file) {
    let imageData = await fileToImage(file);
    let compressImage = compress(img, compressionRate, 'jpeg');
    return imageToFile(compressImage);
}
