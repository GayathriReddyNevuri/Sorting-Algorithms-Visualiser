let array = [];
const container = document.getElementById("array-container");

function sleep() {
    return new Promise(r => setTimeout(r, 80));
}

function renderArray() {
    container.innerHTML = "";
    for (let val of array) {
        let wrap = document.createElement("div");
        wrap.className = "bar-wrapper";

        let bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = val * 3 + "px";

        let text = document.createElement("div");
        text.className = "value";
        text.innerText = val;

        wrap.appendChild(bar);
        wrap.appendChild(text);
        container.appendChild(wrap);
    }
}

function generateArray(size = 25) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 50) + 10);
    }
    renderArray();
}

function useInputArray() {
    let input = document.getElementById("arrayInput").value;
    let values = input.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (values.length === 0) return;
    array = values;
    renderArray();
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
            }
            await sleep();
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) min = j;
            await sleep();
        }
        [array[i], array[min]] = [array[min], array[i]];
        renderArray();
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray();
            await sleep();
        }
        array[j + 1] = key;
        renderArray();
    }
}

async function mergeSort() {
    await mergeRec(0, array.length - 1);
    renderArray();
}

async function mergeRec(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeRec(l, m);
    await mergeRec(m + 1, r);
    let left = array.slice(l, m + 1);
    let right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        array[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        renderArray();
        await sleep();
    }
    while (i < left.length) array[k++] = left[i++];
    while (j < right.length) array[k++] = right[j++];
}

async function quickSort() {
    await quickRec(0, array.length - 1);
    renderArray();
}

async function quickRec(l, h) {
    if (l < h) {
        let p = partition(l, h);
        await quickRec(l, p - 1);
        await quickRec(p + 1, h);
    }
}

function partition(l, h) {
    let pivot = array[h];
    let i = l - 1;
    for (let j = l; j < h; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[h]] = [array[h], array[i + 1]];
    return i + 1;
}

generateArray();
