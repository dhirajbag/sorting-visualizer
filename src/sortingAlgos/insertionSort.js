
export const insertionSort = (arr) => {

    const tmp_arr = arr.slice();
    const triplets = [];
    triplets.push([0,0,true]); //color 0th

    for(let i=1; i<tmp_arr.length; i++){

        let j = i;

        if(tmp_arr[j-1] <= tmp_arr[j]){ 

            triplets.push([j, j, true]); //just color it
            continue;
        }

        while(j-1 >= 0 && tmp_arr[j-1] > tmp_arr[j]){
            swap(tmp_arr, j-1, j);
            triplets.push([j-1, j, false]); //swap color and height of j-1th and jth
            j--;
        }

        //arr[i] went to j+1 th index

        triplets.push([j, j, true]);
    }

    return {triplets: triplets,
            arr: tmp_arr};
}

const swap = (arr, a, b) => {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
} 