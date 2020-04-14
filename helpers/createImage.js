import ImgixClient from"imgix-core-js";

const RESOLUTIONS = [210, 420, 768, 1024, 1400, 1600, 1920];

const VARIANTS = {
    natural: null,
    square: 1,
    landscape: 1.5,
    panoramic: 1.9,
    ultraPanoramic: 2.8,
    portrait: 0.8
};

let imgixClient;

// if (!process.browser) {
    imgixClient = new ImgixClient({
        domain: process.env.IMGIX_DOMAIN,
        secureURLToken: process.env.IMGIX_SECRET
    });
// }

function getSrcset(image, ratio, extraInfo = {}) {
    let images = [];

    RESOLUTIONS.forEach((res) => {
        let w = res;
        let h = Math.round(res / ratio);

        const params = {
            ...extraInfo,
            w: w,
            h: h,
            fit: "crop",
            auto: "compress,format"
        };

        let url = imgixClient.buildURL(image.originalSrc, params);

        images.push({
            w: w,
            h: h,
            url: url
        });

    });

    return images;
}

function createImage(image) {
    // if (!imgixClient) {
    //     throw new Error("createImage function can be run only on server-side!")
    // }
 
    let ret = {
        alt: image.alt,
        title: image.alt,
        originalSrc: image.originalSrc,
        variants: []
    };


    Object.keys(VARIANTS).forEach(variantName => {
        const aspectRatio = variantName === "natural" ? image.width / image.height : VARIANTS[variantName];
        ret.variants.push({
            name: variantName,
            aspectRatio: aspectRatio,
            srcset: getSrcset(image, aspectRatio, image.variants && image.variants[variantName])
        });
    });

    return ret;
}

export default createImage;
export {VARIANTS}
