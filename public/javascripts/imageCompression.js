/**
       * Receives an Image Object (can be JPG, PNG, or WEBP) and returns a new Image Object compressed
       * @param {Image} source_img_obj The source Image Object
       * @param {Integer} quality The output quality of Image Object
       * @param {String} output format. Possible values are jpg, png, and webp
       * @return {Image} result_image_obj The compressed Image Object
       */

function compress(source_img_obj, quality, output_format){

    var mime_type;
    if(output_format==="png"){
        mime_type = "image/png";
    } else if(output_format==="webp") {
        mime_type = "image/webp";
    } else {
        mime_type = "image/jpeg";
    }

    var cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality/100);
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
}

async function imageCompression(file){
    let reader = new FileReader();
    let imageData = ;
    reader.addEventListener('load', () => {
        let img = new Image();
        img.src = reader.result;
        let compressImage = compress(img, 80, 'png');
        var base64data = compressImage.src.replace("data:image/png;base64,","");
        var bs = atob(base64data);
        var buffer = new ArrayBuffer(bs.length);
        var ba = new Uint8Array(buffer);
        for (var i = 0; i < bs.length; i++) {
            ba[i] = bs.charCodeAt(i);
        }
        var blob = new Blob([ba],{type:"image/png"});
    });
    if(file){
        reader.readAsDataURL(file);
    }
}
