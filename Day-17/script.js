let promiseObj = new Promise((resolve, reject) =>{
console.log("Promise obj called");
resolve("Add to the cart ");
//reject("Item is out stock")
});

console.log(promiseObj);

promiseObj.then(
    (val) => {
        console.log("order status ---confirmed",val);
    },
    (err) => {
        console.log("order status ---cancelled",err);

    }
    );

