export default function getNormDist(x_orig, y_orig, x_dest, y_dest){
    let dx = x_dest - x_orig;
    let dy = y_dest - y_orig;
    let length = Math.sqrt(dx * dx + dy * dy);
    if (length !== 0) {
        dx /= length;
        dy /= length;
    }
    let x_norm = dx;
    let y_norm = dy;
    return {x_norm, y_norm};
};

export function getVectorAngle(x_orig, y_orig, x_dest, y_dest, angle) {
    let radians = angle * (Math.PI / 180);

    let xRel = x_dest - x_orig;
    let yRel = y_dest - y_orig;

    let xNew = xRel * Math.cos(radians) - yRel * Math.sin(radians);
    let yNew = xRel * Math.sin(radians) + yRel * Math.cos(radians);

    xNew += x_orig;
    yNew += y_orig;

    return {xNew, yNew};
}