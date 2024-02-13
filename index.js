// Write answer to the questions asked below:
var basket = document.querySelector("#basket-heading")
basket.style.color = "brown"

var fruits = document.querySelectorAll(".fruit:nth-child(even")
for(var i = 0;i<fruits.length;i++)
  {
    fruits[i].style.backgroundColor = "brown"
    fruits[i].style.color = "white"
  }