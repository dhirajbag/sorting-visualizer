export const mergeSort = (arr) => {
    const tmp = arr.slice();
    const indexValuePairs = [];

    mergeSortHelper(tmp, 0, tmp.length, indexValuePairs);

    return {
        indexValuePairs: indexValuePairs,
        arr: tmp
    };
}


const mergeSortHelper = (arr, left, right, indexValuePairs) => {
    if (left >= right)
        return;

    const mid = left + Math.floor((right - left) / 2);

    mergeSortHelper(arr, left, mid, indexValuePairs);
    mergeSortHelper(arr, mid + 1, right, indexValuePairs);


    merge(arr, left, mid, right, indexValuePairs);
}

const merge = (arr, left, mid, right, indexValuePairs) => {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length) {
        if (leftPart[i] <= rightPart[j]) {
            arr[k] = leftPart[i++];

        }
        else {
            arr[k] = rightPart[j++];
        }

        indexValuePairs.push([k, arr[k]]);
        k++;
    }

    while (i < leftPart.length) {
        arr[k] = leftPart[i++];
        indexValuePairs.push([k, arr[k]]);
        k++;
    }

    while (j < rightPart.length) {
        arr[k] = rightPart[j++];
        indexValuePairs.push([k, arr[k]]);
        k++;
    }
}

