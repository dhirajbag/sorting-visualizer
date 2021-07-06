export const quickSort = (arr) => {

    const tmp_arr = arr.slice();
    const swap_triplets = [];

    quickSortHelper(tmp_arr, 0, tmp_arr.length - 1, swap_triplets, false);

    return {
        swap_triplets: swap_triplets,
        arr: tmp_arr
    };
}

export const randomizedQuickSort = (arr) => {

    const tmp_arr = arr.slice();
    const swap_triplets = [];

    quickSortHelper(tmp_arr, 0, tmp_arr.length - 1, swap_triplets, true);

    return {
        swap_triplets: swap_triplets,
        arr: tmp_arr
    };
}


const quickSortHelper = (tmp_arr, left, right, swap_triplets, isRandom) => {

    if (left > right)
        return;

    if (isRandom) {
        const random_idx = left + Math.floor((right - left) * Math.random());
        swap(tmp_arr, left, random_idx);
        swap_triplets.push([left, random_idx, false]);
    }

    const pivot = tmp_arr[left];

    let i = left; // last index having value <= pivot
    let j = left + 1; //first index to examine

    while (j <= right) {
        if (tmp_arr[j] <= pivot) {
            swap(tmp_arr, i + 1, j);
            swap_triplets.push([i + 1, j, false]);
            i++;
        }

        j++;
    }

    swap(tmp_arr, left, i);
    swap_triplets.push([left, i, true]); /*pivot swapped to final position i*/

    quickSortHelper(tmp_arr, left, i - 1, swap_triplets, isRandom);
    quickSortHelper(tmp_arr, i + 1, right, swap_triplets, isRandom);
}

const swap = (arr, a, b) => {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

