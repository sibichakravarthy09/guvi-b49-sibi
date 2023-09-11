function asyncTask1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 1 completed");
        },1000);
    });
}

function asyncTask2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 2 completed");
        },2000);
    });
}

function asyncTask3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 3 completed");
        },3000);
    });
}

Promise.all([asyncTask1(), asyncTask2(), asyncTask3()])
.then((val) =>{
    console.log(val);
    console.log("All tasks compeleted");
})
.catch((err) => {
    console.log("Error: ", err);
});
