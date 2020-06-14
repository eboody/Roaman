//global vars
var oldColor
var backgroundColor
var oldBulletColor

function addListenerToBlocks() {
    //highlight elements on mouse up
    Array.prototype.map.call(document.querySelectorAll(".flex-v-box.roam-block-container.block-bullet-view"), e => e.onmouseup = function (e) {
        highlight();
        setTimeout(highlight, 50)
    })
}
//highlight the text area bullet, the left border of children of the sibling and the bullet of the sibling
function highlight() {

    //make a reference to textarea's container
    var textAreaContainer = document.querySelector("textarea").parentNode.parentNode.parentNode.parentNode

    //make the bullet of the textarea orange
    textAreaContainer.querySelector(".simple-bullet-outer").style.backgroundColor = "DarkOrange"

    //check to see if this block is a header
    var isHeader = document.querySelector("textarea").parentNode.parentNode.className.includes("level")
    //create reference
    var siblingIsParent
    if (isHeader == false) {
        //check if the sibling above is a parent, because if it's not there's no point in highlighting the bullet
        siblingIsParent = textAreaContainer.previousElementSibling.children[1].children.length
    }
    else {
        //header version
        //check if the sibling above is a parent, because if it's not there's no point in highlighting the bullet
        siblingIsParent = textAreaContainer.parentNode.previousElementSibling.children[1].children.length
    }

    if (siblingIsParent > 0) {
        //if the textarea isn't a header do this
        if (isHeader == false) {

            //make the left border of the children of the (sibling above textarea) orange
            Array.prototype.map.call(textAreaContainer.previousElementSibling.children[1].childNodes, e => e.style.borderColor = 'DarkOrange')

            //make bullet for (sibling above textarea) orange for regular blocks
            textAreaContainer.previousElementSibling.firstElementChild.querySelector(".simple-bullet-outer").style.backgroundColor = "DarkOrange"
        }
        //if it's a header do this
        else {
            //make the borders of the children of the text area's sibling orange, if the text area is a header
            Array.prototype.map.call(textAreaContainer.parentNode.previousElementSibling.children[1].childNodes, e => e.style.borderColor = 'DarkOrange')
            textAreaContainer.parentNode.previousElementSibling.firstElementChild.querySelector(".simple-bullet-outer").style.backgroundColor = "DarkOrange"
        }
    }
}
function normalize() {
    //make all borders normal color
    Array.prototype.map.call(document.querySelectorAll(".block-border-left"), e => e.style.borderColor = oldColor)
    //make all outer bullets normal color
    Array.prototype.map.call(document.querySelectorAll(".simple-bullet-outer"), e => e.style.backgroundColor = backgroundColor);
    //make all inner bullets normal
    document.querySelector("textarea").parentElement.parentElement.querySelector(".simple-bullet-inner").style.backgroundColor = oldBulletColor
}


function initialize() {
    //get the initial colors of inner, outer bullets and borders
    oldColor = window.getComputedStyle(document.querySelector('.block-border-left')).borderColor
    backgroundColor = window.getComputedStyle(document.querySelector(".simple-bullet-outer")).backgroundColor
    oldBulletColor = window.getComputedStyle(document.querySelector(".simple-bullet-inner")).backgroundColor

    //if I press any of these keys, normalize the colors of the elements. You can see the list of keys and their codes here: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    document.onkeydown = function (e) {
        if (e.which == 8 || e.which == 9 || (e.shiftKey && e.which == 9) || e.which == 13 || e.which == 38 || e.which == 40 || (e.altKey && e.shiftKey && e.which == 37) || (e.altKey && e.shiftKey && e.which == 38) || (e.altKey && e.shiftKey && e.which == 39) || (e.altKey && e.shiftKey && e.which == 40) || (e.which == 27)) {
            normalize();
            setTimeout(normalize, 50)
        }
    };
    //if I press any of these keys highlight the colors of the elements mentioned above
    document.onkeyup = function (e) {
        if (e.which == 8 || e.which == 9 || (e.shiftKey && e.which == 9) || e.which == 13 || e.which == 38 || e.which == 40 || (e.altKey && e.shiftKey && e.which == 37) || (e.altKey && e.shiftKey && e.which == 38) || (e.altKey && e.shiftKey && e.which == 39) || (e.altKey && e.shiftKey && e.which == 40)) {
            highlight();
            setTimeout(highlight, 50)
        }
        if (e.which == 118) {
            alert("asd")
            window.open("https://www.geeksforgeeks.org", "_blank");
        }
    };

    //refresh the listeners on mouseup
    document.onmouseup = function () {
        addListenerToBlocks();
    }

    //normalize and refresh listeners on mousedown
    document.onmousedown = function () {
        normalize();
        setTimeout(normalize, 50)
    }

    document.querySelector(".roam-body").onkeydown = function (e) {
        //ctrl+space will autocomplete
        if (e.ctrlKey && e.which == 32) {
            document.querySelector(".bp3-elevation-3").firstElementChild.click();
        };
        //ctrl+shift+del will delete the page
        if (e.ctrlKey && e.shiftKey && e.which == 46) {
            deletePage();
        }
    };



    window.addEventListener('wheel', function (event) {
        if (event.deltaY < 0) {
            [].map.call(document.querySelectorAll(".flex-h-box.flex-align-start.flex-justify-start"), e => e.addEventListener('wheel', function (event) {
                //if scrolled up
                if (event.deltaY < 0) {
                    //if the caret is facing down then click on it
                    if (e.firstChild.firstElementChild.firstChild.className.includes("rotate") == false) {
                        e.firstChild.firstChild.click();
                        e.firstChild.firstChild.firstChild.click();
                    }
                }
            }));
        }
        //otherwise if scrolled down
        else if (event.deltaY > 0) {
            [].map.call(document.querySelectorAll(".flex-h-box.flex-align-start.flex-justify-start"), e => e.addEventListener('wheel', function (event) {
                //if scrolled down
                if (event.deltaY > 0) {
                    //if the caret is facing right then click on it
                    if (e.firstChild.firstElementChild.firstChild.className.includes("rotate") == true) {
                        e.firstChild.firstChild.click();
                        e.firstChild.firstChild.firstChild.click();
                    }
                }
            }));
        }
        //unhighlight bullets and stuff when I collapse
        normalize();
        setTimeout(50, normalize);
    });


}

//don't initialize until the h1 element exists
var checkExist = setInterval(function () {
    if (document.querySelector('h1')) {
        initialize();
        clearInterval(checkExist);
    }
}, 100); // check every 100ms