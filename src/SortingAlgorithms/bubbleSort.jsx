const { createFactory } = require("react");

export default function BubbleSort(array) {
    let sorted_array = array;
    const bubbleSort = (sorted_array) => {
        let n = sorted_array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = n - i - 1; j < n - 1; j++) {
                if (sorted_array[i] > sorted_array[j+1]) {
                    [sorted_array[i], sorted_array[j + 1]] = [sorted_array[j + 1], sorted_array[i]];
                }
            }
        }
        return sorted_array;
    }
    return bubbleSort(sorted_array);
}