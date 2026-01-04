export function greatestCommonDivisorOf(numA : number, numB : number) {
    let a = Math.abs(numA)
    let b = Math.abs(numB)

    while (b !== 0) {
        const c = b
        b = a % b
        a = c
    }

    return a
}