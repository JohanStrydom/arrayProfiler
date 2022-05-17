var process = require('process');

let lengthCalls, elementCalls;

//Enter array lenght (or as argument)
const n = process.argv[2] ? process.argv[2] : 100;

//Set your own array (if not set, array will be built up below)
const array = [];

//Build up array with duplicates (3), if array not set (crap but not profiled)
if (array.length == 0)
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
        name: 'Get duplicates by set and filter',
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
        name: 'Get duplicates by set and filter',
        callback: (arr) => {
            duplicates = [];

            let grouped = {};
            arr.forEach((e) => {
                if (!grouped[e])
                    grouped[e] = true;
                else {
                    duplicates.push(e);
                }
            });
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    },
    {
        name: 'Get duplicates by filter and index',
        callback: (arr) => {
            duplicates = arr.filter((i, x) => arr.indexOf(i) !== x);
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    },
    {
        name: 'Get duplicates by for loop and filter (slow AF!)',
        callback: (arr) => {
            duplicates = [];
            for (let i = 0; i < arr.length; i++) {
                let duplicate = arr.filter((a) => a === i).length
                if (duplicate > 1)
                    duplicates[duplicates.length] = i;
            }
            console.log(`Duplicates: ${[...new Set(duplicates)]}`);
        }
    },
    {
        name: 'Some text to describe the function',
        callback: (arr) => {
            //Add function code here
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

    console.log(`Array element request count: ${elementCalls}`);
    console.log(`Array length request count: ${lengthCalls}`);
    console.log(`Duration: ${(endTime - startTime) / 1000} sec`);
})
