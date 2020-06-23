var scrolledDown = false;
var scrolledUp = false;
var interval
var shifted = false
var easyTagState
var platform = navigator.platform

//allows me to make hotkeys and use keystates as conditions in other functions
function setKeyListener() {
    //listens when a key is pressed down
    document.onkeydown = function (e) {
        //if shift is pressed down
        if (e.shiftKey) {
            //this is so that this code isn't run a bunch of times needlessly when shift is held down
            if (!shifted) {
                //let's me know shift is pressed down, both in this function and others since shifted is a global variable
                shifted = true
                //disables scrolling so that I can do stuff with scrollwheel while shift is held down without the elements moving around
                disableScroll();
                //this is so that the function I want to execute when I scroll doesn't run a bunch of times needlessly
                //I have it say that shift isn't held down every 300ms so that I can collapse and expand a block again within a reasonable amount of time
                interval = setInterval(function (e) {
                    scrolledDown = false;
                    scrolledUp = false;
                }, 500);
            }
        }
        if (e.which == 8 || //backspace
            e.which == 9 || //tab
            (e.shiftKey && e.which == 9) || //shift+tab
            e.which == 13 || //enter
            e.which == 38 || //up arrow
            e.which == 40 || //down arrow
            (e.altKey && e.shiftKey && e.which == 37) || //alt+shift+left
            (e.altKey && e.shiftKey && e.which == 38) || //alt+shift+up
            (e.altKey && e.shiftKey && e.which == 39) || //alt+shift+right
            (e.altKey && e.shiftKey && e.which == 40) || //alt+shift+down
            (e.which == 46) || //delete
            (e.which == 27)) { //escape
            normalize();
            setTimeout(normalize, 50)
        }
    }
    //listens for when a key is released
    document.onkeyup = function (e) {
        //if the key that's being released is Shift, for some reason e.shiftKey doesn't work here, but this does. You can see when you run console.log(e) here.
        if (e.key = "Shift") {
            //let's me know shift isn't held down anymore
            shifted = false;
            //stops the interval to change the shifted variable
            clearInterval(interval)
            //enables scrolling again
            enableScroll();
        }
        if (e.which == 8 || //backspace
            e.which == 9 || //tab
            (e.shiftKey && e.which == 9) || //shift+tab
            e.which == 13 || //enter
            e.which == 38 || //up arrow
            e.which == 40 || //down arrow
            (e.altKey && e.shiftKey && e.which == 37) || //alt+shift+left
            (e.altKey && e.shiftKey && e.which == 38) || //alt+shift+up
            (e.altKey && e.shiftKey && e.which == 39) || //alt+shift+right
            (e.altKey && e.shiftKey && e.which == 40) || //alt+shift+down
            (e.which == 46) || //delete
            (e.which == 27)) { //escape
            setAutocompleteListeners();
            highlight();
            setTimeout(highlight, 50)
        }
        if (e.ctrlKey && e.which == 46) {
            deletePage();
        }
    }
}





//expand or collapse a block when holding shift and scrolling over it
function setOnMouseoverListener() {
    //sets mouseover listener on the .roam-app level (which is most of the document)
    document.onmouseover = function (mouseoverEvent) {
        //get the block element
        var block = mouseoverEvent.path[2];
        //get the element containing the caret
        var caret = block.querySelector(".rm-caret");
        //if the caret exists

        if (caret && block.className != "rm-reference-main" && block.className != "roam-center" &&
            block.className != "roam-body-main flex-h-box" && block.id != "app" &&
            block.className != "rm-reference-container" && block.className != "" &&
            block.className != "roam-article" && block.className != "rm-mentions refs-by-page-view" &&
            block.className != "rm-ref-page-view"
        ) {
            //listen for a wheel even on the block
            block.onwheel = function (wheelEvent) {
                // console.log(block)
                //|| mouseoverEvent.fromElement.querySelector(".bp3-icon-minus")

                if (!collapseExpandState) {
                    return
                }

                if (platform.includes("Win")) {
                    up = wheelEvent.deltaY < 0
                    down = wheelEvent.deltaY > 0
                }
                else if (platform.includes("Mac")) {
                    up = wheelEvent.deltaY > 0
                    down = wheelEvent.deltaY < 0
                }

                //if scrolled down, while shift is held down, and the caret is either in the collapsed state, or it's style is, and I haven't scrolled down yet
                if (down && shifted && (caret.className.includes("rotate") ||
                    wheelEvent.path[2].querySelector(".bp3-icon-plus") || block.className == "flex-h-box" ||
                    caret.getAttribute("style").includes("rotate")) &&
                    !scrolledDown) {
                    scrolledDown = true;
                    if (caret.className.includes("rotate")) {
                        caret.click();
                        return
                    }
                    if (caret.getAttribute("style").includes("rotate")) {
                        caret.click();
                        return
                    }
                    //if the mouse is hovering over the divs around the header then adjust the path to click
                    if (wheelEvent.path[2].id == "roam-right-sidebar-content" || wheelEvent.path[1].id == "roam-right-sidebar-content") {
                        wheelEvent.path[0].querySelector(".bp3-icon-plus").click();
                        return
                    }
                    //check if the element exists and click on the plus icon
                    else if (wheelEvent.path[2].querySelector(".bp3-icon-plus")) {
                        wheelEvent.path[2].querySelector(".bp3-icon-plus").click();
                        return
                    }
                }
                //if scrolled up, while shift is held down, and the caret is not in the collapsed state and I haven't scrolled up yet
                if (up && shifted && (!caret.className.includes("rotate") ||
                    wheelEvent.path[2].querySelector(".bp3-icon-minus") ||
                    block.className == "flex-h-box") &&
                    !scrolledUp) {
                    scrolledUp = true;
                    if (caret.getAttribute("style") != null && !caret.getAttribute("style").includes("rotate")) {
                        caret.click();
                        return
                    }
                    else if (caret.getAttribute("style") == null) {
                        caret.click();
                        return
                    }
                    //if the mouse is hovering over the divs around the header then adjust the path to click
                    if (wheelEvent.path[2].id == "roam-right-sidebar-content" || wheelEvent.path[1].id == "roam-right-sidebar-content") {
                        wheelEvent.path[0].querySelector(".bp3-icon-minus").click();
                        return
                    }
                    //click on the minus icon
                    wheelEvent.path[2].querySelector(".bp3-icon-minus").click();

                    //click on the caret
                    //set scrolledup to true so that I don't send a shit load of click events needlessly
                }
            };
        }
        else {
            block.onwheel = function (wheelEvent) {
                if (!collapseExpandState) {
                    return
                }

                if (platform.includes("Win")) {
                    up = wheelEvent.deltaY < 0
                    down = wheelEvent.deltaY > 0
                }
                else if (platform.includes("Mac")) {
                    up = wheelEvent.deltaY > 0
                    down = wheelEvent.deltaY < 0
                }
                if (down && shifted && wheelEvent.path[2].querySelector(".bp3-icon-plus") && !scrolledDown) {
                    //if the mouse is hovering over the divs around the header then adjust the path to click
                    if (wheelEvent.path[2].id == "roam-right-sidebar-content" || wheelEvent.path[1].id == "roam-right-sidebar-content") {
                        wheelEvent.path[0].querySelector(".bp3-icon-plus").click();
                        return
                    }
                    //check if the element exists and click on the plus icon
                    else if (wheelEvent.path[2].querySelector(".bp3-icon-plus")) {
                        wheelEvent.path[2].querySelector(".bp3-icon-plus").click();
                        return
                    }
                }
                if (up && shifted && wheelEvent.path[2].querySelector(".bp3-icon-minus") && !scrolledUp) {
                    //if the mouse is hovering over the divs around the header then adjust the path to click
                    if (wheelEvent.path[2].id == "roam-right-sidebar-content" || wheelEvent.path[1].id == "roam-right-sidebar-content") {
                        wheelEvent.path[0].querySelector(".bp3-icon-minus").click();
                        return
                    }
                    //click on the minus icon
                    wheelEvent.path[2].querySelector(".bp3-icon-minus").click();
                }
            }
        }
        document.onmousedown = function (mousedownEvent) {
            normalize();
            setTimeout(normalize, 50);
            return
        }
        block.onmouseup = function (mouseupEvent) {
            setAutocompleteListeners();
            highlight();
            setTimeout(highlight, 50);
            return
        }
    };
}


function initialize() {
    // get state of checkboxes so I know what function not to run
    chrome.storage.sync.get([
        `sidebarHoverState`,
        `autocompleteState`,
        `deletePageState`,
        `collapseExpandState`,
        `scopeHighlightState`,
        `autoCapState`,
        `easyTagState`
    ], function (result) {
        autocompleteState = result.autocompleteState;
        deletePageState = result.deletePageState;
        collapseExpandState = result.collapseExpandState;
        scopeHighlightState = result.scopeHighlightState;
        autoCapState = result.autoCapState;
        sidebarHoverState = result.sidebarHoverState;
        easyTagState = result.easyTagState;
    })
    setOnMouseoverListener();
    setKeyListener();
    getDefaultValues();
    setMouseMoveListener();
}

//deletes the page
function deletePage() {
    if (!deletePageState) {
        console.log("Delete page is disabled")
        return
    }
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