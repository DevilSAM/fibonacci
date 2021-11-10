module.exports.nearestFib = (num) => {
    // переменные
    let prev = 0
    let next = 1
    // основной код поиска числа
    while (num > prev && num > next) {
        [prev, next] = [next, prev+next]
    }
    if (num == prev) {
        return prev
    } else {
        if ((num - prev) < (next - num)) {
            return prev
        } else {
            return next
        }
    }
}