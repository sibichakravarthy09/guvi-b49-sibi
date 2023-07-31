function getCar() {
    return new Promise((resolve,reject) => {
        setTimeout(() =>  {
            const car ="BMW";
            resolve(car);
        },2000)
    });
}
      
async function rideWithCars() {
    console.log("Lets ride with another Car!!");
    try {
        const car = await getCar();
        console.log("Yay! I got my", car);
        console.log("Now I got my  BMW lets ride!!")
     } catch (err) {
        console.log("Oops somthing went wrong:", err);
     }
}