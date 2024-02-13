
//Add subHeading in document
var subHeading = document.createElement("h3")

//Add text subHeading
var subHeadingText = document.createTextNode("Buy high quality organic fruits online")

//Append subHeading in document (at last)
subHeading.appendChild(subHeadingText)

//Locate firstDiv by getElementsByTagName method
var divs1 = document.getElementsByTagName("div")
var firstDiv = divs1[0] //works like array

//Make sub heading text italic
var subHeading = firstDiv.appendChild(subHeading)
subHeading.style.fontStyle = "italic"

//Add paragraph2 in document
var paragraph2 = document.createElement("p")

//Add text in paragraph2
var paraText2 = document.createTextNode("Total fruits: 4")


//Locate second div
var divs2 = document.getElementsByTagName("div")
var secondDiv = divs2[1]

//Add before ul
var fruitsUl = document.querySelector(".fruits")
secondDiv.insertBefore(paragraph2,fruitsUl)
paragraph2.id = "fruits-total"


