var process = require('process');

let lengthCalls, elementCalls;
const array = [];

//Enter array lenght (or as argument)
const n = process.argv[2] ? process.argv[2] : 100;

//Build up random array with duplicates
for (let i = 0; i < n; i++) {
    if (i % 3 == 0)
        array[i] = 3
    else
        array[i] = i
}

//Proxy to track element requests
const proxy1 = new Proxy(array, {
    get(target, property) {
        if (property === 'length') {
            lengthCalls++;
            return target.length;
        }
        if (property in target) {
            elementCalls++;
            return target[property];
        }
    }
});

let duplicates;

const callbacks = [
    {
        name: 'Duplicates by set and filter',
        callback: (arr) => {
            const set = new Set(arr);
            duplicates = arr.filter((i) => {
                if (set.has(i))
                    set.delete(i);
                else
                    return i
            });
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    },
    {
        name: 'Duplicates by filter and index',
        callback: (arr) => {
            duplicates = arr.filter((i, x) => arr.indexOf(i) !== x);
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    },
    {
        name: 'Duplicates by for loop and filter',
        callback: (arr) => {
            duplicates = [];
            for (let i = 0; i < arr.length; i++) {
                let duplicate = arr.filter((a) => a === i).length
                if (duplicate > 1)
                    duplicates[duplicates.length] = i;
            }
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    }
]

let startTime;
let endTime;

callbacks.forEach((c, i) => {
    lengthCalls = 0;
    elementCalls = 0;

    console.log(`\n${i + 1}. ${c.name}\n-------------------------------------`);
    console.log(`Array length: ${array.length}`);

    startTime = new Date().getTime();
    c.callback(proxy1);
    endTime = new Date().getTime();

    console.log(`Array element requests: ${elementCalls}`);
    console.log(`Array lenght requests: ${lengthCalls}`);
    console.log(`Duration: ${(endTime - startTime) / 1000} sec`);
})
