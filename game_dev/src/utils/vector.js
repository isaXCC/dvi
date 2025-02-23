export default function get_norm_dist(x_orig, y_orig, x_dest, y_dest){
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