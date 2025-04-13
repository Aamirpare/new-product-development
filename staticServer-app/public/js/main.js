const x = 100;
function save() {
    console.log("Welcome to the console.");
}

let d = new Date();
const button = document.createElement("button");
button.textContent = "Click Me";

button.addEventListener("click", () => {
    alert("The is created dynamically through javascript code.");
});

document.body.append(button);

