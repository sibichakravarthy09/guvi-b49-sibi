function playBgmi(c) {
    console.log("Stopped playing Bgmi due to the class")
    setTimeout(()=> {
        console.log("Class completed");
    callback();
     },2000 );
}

function afterClass() {
    console.log("lets play Bgmi vanga da");
}

playBgmi(afterClass);