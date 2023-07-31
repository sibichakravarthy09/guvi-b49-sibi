 function performCalculator(operation) {
    const num1 =45
    const num2 = 990

    let results;

    switch (operation) {
        case "add":
          result = num1 + num2;
          break;  
        case "sub":
          result = num1 - num2;
          break;   
        case "mul":
          result = num1 * num2;
          break;   
        case "div":
          result = num1 / num2;
          break; 
        default:
            result = "Invaid Operation"
    }
    alert(result);
 }