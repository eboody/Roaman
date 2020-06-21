//global vars
var defaultBorderColor
var defaultOuterBulletColor
var defaultClosedBulletColor = 'rgb(206, 217, 224)'
var highlightColor = 'rgb(255, 140, 0)'

//get the initial colors of inner, outer, closed bullets and borders
function getDefaultValues() {
    if (document.querySelector('.block-border-left')) {
        defaultBorderColor = window.getComputedStyle(document.querySelector('.block-border-left')).borderColor
    }
    if (document.querySelector(".simple-bullet-outer:not(.roam-bullet-closed)")) {
        defaultOuterBulletColor = window.getComputedStyle(document.querySelector(".simple-bullet-outer")).backgroundColor
    }
    if (document.querySelector(".roam-bullet-closed")) {
        if (window.getComputedStyle(document.querySelector(".roam-bullet-closed")).backgroundColor.toString != highlightColor) {
            defaultClosedBulletColor = window.getComputedStyle(document.querySelector(".roam-bullet-closed")).backgroundColor
        }
    }
}

//highlight the text area bullet, the left border of children of the sibling and the bullet of the sibling
function highlight() {
    if (!scopeHighlightState){
        console.log(scopeHighlightState)
        return
    }
    //make a reference to textarea's container (I do it this way to account for the extra element that gets added when you make the textarea's block a header)
    if (document.querySelector("textarea[id^=block]")) {
        var textAreaContainer = document.querySelector("textarea[id^=block]").parentNode.parentNode.parentNode.parentNode.querySelector(".controls").parentElement.parentElement.parentElement
    }

    if (textAreaContainer) {
        if (textAreaContainer.previousElementSibling) {
            //check if the sibling above is a parent, because if it's not there's no point in highlighting the bullet
            var siblingIsParent = textAreaContainer.previousElementSibling.children[1].children.length
        }
    }

    //make the bullet of the textarea orange
    if (textAreaContainer){
    textAreaContainer.querySelector(".simple-bullet-outer.cursor-pointer").style.backgroundColor = highlightColor}

    if (siblingIsParent != 0 && textAreaContainer) {
        if (textAreaContainer.previousElementSibling) {
            //make the left border of the children of the (sibling above textarea) orange
            Array.prototype.map.call(textAreaContainer.previousElementSibling.children[1].childNodes, e => e.style.borderColor = highlightColor)
            //make bullet for (sibling above textarea) orange for regular blocks
            textAreaContainer.previousElementSibling.firstElementChild.querySelector(".simple-bullet-outer.cursor-pointer").style.backgroundColor = highlightColor
        }
    }

}
function normalize() {
    if (!scopeHighlightState){
        return
    }
    //make all borders normal color
    Array.prototype.map.call(document.querySelectorAll(".block-border-left"), e => e.style.borderColor = defaultBorderColor)
    //make all outer bullets normal color
    Array.prototype.map.call(document.querySelectorAll(".simple-bullet-outer:not(.roam-bullet-closed)"), e => e.style.backgroundColor = defaultOuterBulletColor);
    if (defaultClosedBulletColor) {
        Array.prototype.map.call(document.querySelectorAll(".roam-bullet-closed"), e => e.style.backgroundColor = defaultClosedBulletColor);
    }
}