let add = document.querySelector(".add");
let showText = document.querySelector(".show-text");
let inputText = document.querySelector(".url");
let inputDis = document.querySelector(".des");
let patern = /(https?:\/\/)?(www.)?\w+.\w+(?=(\/\w+|\W+|\d+)?)?/gi;

//for random image
let imagesArr = [
  "css/images/1.jpg",
  "css/images/2.jpeg",
  "css/images/5.jpg",
  "css/images/6.jpg",
  "css/images/7.jpg",
  "css/images/8.jpg",
  "css/images/9.jpg",
  "css/images/10.webp",
];
document.body.style.backgroundImage = `url(css/images/7.jpg)`;

//to stop random images
let counter = setInterval(() => {
  let randomIndex = Math.floor(Math.random() * imagesArr.length);
  let randomImage = imagesArr[randomIndex];
  document.body.style.backgroundImage = `url(${randomImage})`;
}, 5000);

let stop = document.querySelector(".stop");
stop.addEventListener("click", () => {
  clearInterval(counter);
});

//for empty inputs
function emptyInputs() {
  inputText.value = "";
  inputDis.value = "";
}

//main function
function main() {
  if (
    inputText.value.trim().length !== 0 &&
    inputDis.value.trim().length !== 0 
    // &&
    // patern.test(inputText.value) === true

    ) {
      

    showText.style.display = "block";

    let obj = {
      input: inputText.value.trim(),
      input2: inputDis.value.trim(),
    };
    arr.push(obj);
    window.localStorage.setItem("localeInput", JSON.stringify(arr));
    show();
    emptyInputs();
  } else {
    alert("Plz Write valid URL && Description For It:) ");
    emptyInputs();
  }
}

let arr;
if (window.localStorage.getItem("localeInput") != null) {
  arr = JSON.parse(window.localStorage.getItem("localeInput"));
  console.log(arr);
} else {
  arr = [];
}

// for submit button
add.addEventListener("click",function(){
  main()
  console.log( patern.test(inputText.value) === true)

} );
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    main();
  }
});

//for show urls
function show() {
  let textDiv = "";
  for (let i = 0; i < arr.length; i++) {
    textDiv += `

 <div class=" colored special">

  <input value= "${arr[
    i
  ].input2.toLowerCase()}" readonly type="text"  onclick="line(${i})" class="hidden ">

 <button onclick="dele(${i})"class="del"><i class="fa-regular fa-trash-can"></i>
 </button>
 <button><a href=${
   arr[i].input
 } onclick="visit(${i})" target="_blank"class="visit">
 visit</a> </button>
 </div>
 `;
  }
  showText.innerHTML = textDiv;
}
show();
// for delete tasks
function dele(i) {
  arr.splice(i, 1);
  localStorage.localeInput = JSON.stringify(arr);

  show();
}

function visit(i) {
  let url = arr[i].input;
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  window.open(url);
}
