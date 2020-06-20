//global vars
var oldColor
var backgroundColor
var oldBulletColor
var shifted
var closedBulletcolor
var executed = false
var scrolledDown = false;
var scrolledUp = false;

function setKeyListener() {

    document.onkeydown = function (e) {
        // if (!executed) {
        //     executed = true
        //     disableScroll();
        // }
    }
    document.onkeyup = function (e) {
        enableScroll();
        // executed = false;
    }
}


function setMouseListener() {
    document.addEventListener("mouseover", function (e) {
        enableScroll();

        var block = e.path[2];
        var caret = block.firstChild.firstChild.firstChild.firstChild;
        if (caret) {
            block.addEventListener('wheel', function (event) {
                //scrolled down
                if (event.deltaY > 0 && e.shiftKey && caret.className.includes("rotate")) {
                    caret.click();
                    scrolledDown = true;
                    disableScroll();
                }
                //if scrolled up
                if (event.deltaY < 0 && e.shiftKey && !caret.className.includes("rotate")) {
                    caret.click();
                    scrolledUp = true;
                    disableScroll();
                }
            });
        }
    });
}



// function addListenerToBlocks() {
//     //highlight elements on mouse up
//     Array.prototype.map.call(document.querySelectorAll(".flex-v-box.roam-block-container.block-bullet-view"), e => e.onmouseup = function (e) {
//         highlight();
//         setTimeout(highlight, 50)
//     })
// }
// //highlight the text area bullet, the left border of children of the sibling and the bullet of the sibling
// function highlight() {
//     //check to see if this block is a header
//     if(document.querySelector("textarea[id^=block]")){
//     var isHeader = document.querySelector("textarea[id^=block]").parentNode.parentNode.className.includes("level")}

//     //make a reference to textarea's container
//     var textAreaContainer = document.querySelector("textarea[id^=block]").parentNode.parentNode.parentNode.parentNode
//     //make the bullet of the textarea orange
//     textAreaContainer.querySelector(".simple-bullet-outer").style.backgroundColor = "DarkOrange"

//     //create reference
//     var siblingIsParent

//     if (isHeader == false) {
//         //check if the sibling above is a parent, because if it's not there's no point in highlighting the bullet
//         if(textAreaContainer.previousElementSibling){
//         siblingIsParent = textAreaContainer.previousElementSibling.children[1].children.length}
//     }
//     else {
//         //header version
//         //check if the sibling above is a parent, because if it's not there's no point in highlighting the bullet
//         siblingIsParent = textAreaContainer.parentNode.previousElementSibling.children[1].children.length
//     }

//     if (siblingIsParent > 0) {
//         //if the textarea isn't a header do this
//         if (isHeader == false) {

//             //make the left border of the children of the (sibling above textarea) orange
//             Array.prototype.map.call(textAreaContainer.previousElementSibling.children[1].childNodes, e => e.style.borderColor = 'DarkOrange')

//             //make bullet for (sibling above textarea) orange for regular blocks
//             textAreaContainer.previousElementSibling.firstElementChild.querySelector(".simple-bullet-outer.cursor-pointer").style.backgroundColor = "DarkOrange"
//         }
//         //if it's a header do this
//         else {
//             //make the borders of the children of the text area's sibling orange, if the text area is a header
//             Array.prototype.map.call(textAreaContainer.parentNode.previousElementSibling.children[1].childNodes, e => e.style.borderColor = 'DarkOrange')
//             textAreaContainer.parentNode.previousElementSibling.firstElementChild.querySelector(".simple-bullet-outer.cursor-pointer").style.backgroundColor = "DarkOrange"
//         }
//     }
// }
// function normalize() {
//     //make all borders normal color
//     Array.prototype.map.call(document.querySelectorAll(".block-border-left"), e => e.style.borderColor = oldColor)
//     //make all outer bullets normal color
//     Array.prototype.map.call(document.querySelectorAll(".simple-bullet-outer:not(.roam-bullet-closed)"), e => e.style.backgroundColor = backgroundColor);
//     Array.prototype.map.call(document.querySelectorAll(".roam-bullet-closed"), e => e.style.backgroundColor = closedBulletcolor);
//     //make all inner bullets normal
//     if (document.querySelector("textarea").parentElement.parentElement.querySelector(".simple-bullet-inner")) {
//         document.querySelector("textarea").parentElement.parentElement.querySelector(".simple-bullet-inner").style.backgroundColor = oldBulletColor
//     };
// }


function initialize() {
    setMouseListener();
    setKeyListener();
}
//     //get the initial colors of inner, outer bullets and borders
//     if (document.querySelector('.block-border-left')){
//         oldColor = window.getComputedStyle(document.querySelector('.block-border-left')).borderColor
//     }
//     backgroundColor = window.getComputedStyle(document.querySelector(".simple-bullet-outer")).backgroundColor
//     oldBulletColor = window.getComputedStyle(document.querySelector(".simple-bullet-inner")).backgroundColor
//     closedBulletcolor = window.getComputedStyle(document.querySelector(".roam-bullet-closed")).backgroundColor

//     //if I press any of these keys, normalize the colors of the elements. You can see the list of keys and their codes here: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
//     document.onkeydown = function (e) {
//         if (e.which == 8 || e.which == 9 || (e.shiftKey && e.which == 9) || e.which == 13 || e.which == 38 || e.which == 40 || (e.altKey && e.shiftKey && e.which == 37) || (e.altKey && e.shiftKey && e.which == 38) || (e.altKey && e.shiftKey && e.which == 39) || (e.altKey && e.shiftKey && e.which == 40) || (e.which == 27)) {
//             addListenerToBlocks();
//             normalize();
//             setTimeout(normalize, 50)
//         }

//     };
//     //if I press any of these keys highlight the colors of the elements mentioned above
//     document.onkeyup = function (e) {
//         if (e.which == 8 || e.which == 9 || (e.shiftKey && e.which == 9) || e.which == 13 || e.which == 38 || e.which == 40 || (e.altKey && e.shiftKey && e.which == 37) || (e.altKey && e.shiftKey && e.which == 38) || (e.altKey && e.shiftKey && e.which == 39) || (e.altKey && e.shiftKey && e.which == 40)) {
//             addListenerToBlocks();
//             setTimeout(highlight, 50)
//         }
//         //ctrl+del will delete the page
//         if (e.ctrlKey && e.which == 46) {
//             deletePage();
//         }
//     };

//     //refresh the listeners on mouseup
//     document.onmouseup = function () {
//         addListenerToBlocks();
//     };

//     //normalize and refresh listeners on mousedown
//     document.onmousedown = function () {
//         addListenerToBlocks();
//         normalize();
//         setTimeout(normalize, 500)
//     };

//     document.querySelector(".roam-body").onkeydown = function (e) {
//         //ctrl+space will autocomplete
//         if (e.ctrlKey && e.which == 32) {
//             document.querySelector(".bp3-elevation-3").firstElementChild.click();
//         };
//     };
//     document.getElementById("find-or-create-input").onkeydown = function (e) {
//         if (e.ctrlKey && e.which == 32) {
//             /*this is what ended up working to send a click event*/
//             var evt = document.createEvent('MouseEvents')
//             evt.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//             document.querySelectorAll('.rm-search-title')[1].dispatchEvent(evt)
//         }
//     }

//     // replace # with #[[]] and move the caret in between the brackets
//     document.querySelector(".roam-body").onkeyup = function (e) {
//         if (e.which == 51) {

//             var positionBeforeHashtag = doGetCaretPosition(document.querySelector("textarea")) - 1

//             var text = document.querySelector("textarea").value;


//             var firstSection = text.substring(0, positionBeforeHashtag)
//             // alert("first section = " + firstSection)


//             var textWithHashtag = text.substring(positionBeforeHashtag, positionBeforeHashtag + 1)
//             // alert("text with hasthag = " + textWithHashtag)

//             var lastSection = text.substring(positionBeforeHashtag + 1)
//             // alert("last section = " + lastSection)

//             var newText = textWithHashtag.replace("#", "#[[]]");
//             // alert(firstSection + newText + lastSection)

//             document.querySelector("textarea").value = firstSection + newText + lastSection;

//             setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3)
//         }
//     }





// }

function doGetCaretPosition(ctrl) {
    var CaretPos = 0;

    if (ctrl.selectionStart || ctrl.selectionStart == 0) {// Standard.
        CaretPos = ctrl.selectionStart;
    }
    else if (document.selection) {// Legacy IE
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }

    return (CaretPos);
}


function setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}


//deletes the page
function deletePage() {
    document.querySelector("[class='bp3-button bp3-minimal bp3-small bp3-icon-more']").click()
    //document.querySelector("[class='bp3-popover-content']").querySelector("[class='bp3-menu']").children[6].firstChild.click()

    var ifMenuExists = setInterval(function () {
        if (document.querySelector("[class='bp3-popover-content']").querySelector("[class='bp3-menu']")) {
            document.querySelector("[class='bp3-popover-content']").querySelector("[class='bp3-menu']").children[6].firstChild.click()
            clearInterval(ifMenuExists);
        }
    }, 100); // check every 100ms

    //waits till the delete button exists and then clicks it
    var ifDeleteButtonExists = setInterval(function () {
        if (document.querySelector('button.bp3-button.confirm-button.bp3-intent-danger')) {
            document.querySelector("button.bp3-button.confirm-button.bp3-intent-danger").click()
            clearInterval(ifDeleteButtonExists);
        }
    }, 100); // check every 100ms
}

//don't initialize until the h1 element exists
var checkExist = setInterval(function () {
    if (document.querySelector('h1')) {
        initialize();
        clearInterval(checkExist);
    }
}, 100); // check every 100ms