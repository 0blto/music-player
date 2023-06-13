function clamp(n, min, max) {
    return n >= max ? max : (n <= min) ? min : n
}