# Array Profiler
Test application to track array element requests

### Prerequisites
* [Node](https://nodejs.org/en/download/)



## Running
To run the profiler, run the following command

```
node profileArray.js [n]
```
*n defaults to 100 id not set*



## Adding array functions
If you wish to add a function and see how it interacts with the array, just add a new object to `callbacks`

```
    {
        name: 'Some text to discribe the function',
        callback: (arr) => {
            //Add function code here
        }
    }
```

## Outputs
Expected output

```
4. Some text to discribe the function
-------------------------------------
Array length: 100
Array element requests: 0
Array lenght requests: 0
Duration: 0 sec
```
