function setAutocompleteListeners() {
    if (document.querySelector("textarea")) {
        document.querySelector("textarea").onkeydown = function (e) {
            //if ctrl+space or tab is pressed
            if ((e.ctrlKey && e.which == 32) || e.which == 9 || (e.metaKey && e.which == 13)) {
                e.preventDefault();
                if (document.querySelector(".bp3-elevation-3")){
                    document.querySelector(".bp3-elevation-3").firstElementChild.click();
                    console.log("complete")
                }
            };
            document.querySelector("textarea").onkeyup = function (e) {
                //this replaces # with #[[]]
                if (e.which == 51) {
                    //for some reason doing it with e.shiftkey makes it not work quickly enough
                    var positionBeforeHashtag = doGetCaretPosition(document.querySelector("textarea")) - 1
    
                    var text = document.querySelector("textarea").value;
    
    
                    var firstSection = text.substring(0, positionBeforeHashtag)
                    // alert("first section = " + firstSection)
    
    
                    var textWithHashtag = text.substring(positionBeforeHashtag, positionBeforeHashtag + 1)
                    // alert("text with hasthag = " + textWithHashtag)
    
                    var lastSection = text.substring(positionBeforeHashtag + 1)
                    // alert("last section = " + lastSection)
    
                    var newText = textWithHashtag.replace("#", "#[[]]");
                    // alert(firstSection + newText + lastSection)
    
                    document.querySelector("textarea").value = firstSection + newText + lastSection;
    
                    setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3)
                }
            }
        }
    }

    document.getElementById("find-or-create-input").onkeydown = function (e) {
        if (e.ctrlKey && e.which == 32) {
            /*this is what ended up working to send a click event*/
            var evt = document.createEvent('MouseEvents')
            evt.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            if (document.querySelectorAll('.rm-search-title')[0].innerText.includes("New Page:")){
                document.querySelectorAll('.rm-search-title')[1].dispatchEvent(evt)
            }
            else {
                document.querySelectorAll('.rm-search-title')[0].dispatchEvent(evt)
            }
        }
    }

}