export function chunkArray(arr: any[], size: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export function mergeConcurrent(arr : any[]) {
    const result = [];
    let count = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
            count++
        } else {
            result.push({el: arr[i], count: count + 1})
            count = 0
        }
    }
    return result
}