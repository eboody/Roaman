var newText
var selectedText
function setAutocompleteListeners() {
    if (document.querySelector("textarea")) {

        document.querySelector("textarea").onkeydown = function (e) {
            if (e.which == 51) {
                selectedText = window.getSelection().toString()
            }

            if (autocompleteState) {
                //if ctrl+space or tab is pressed
                if ((e.ctrlKey && e.which == 32) || e.which == 9 || (e.metaKey && e.which == 13)) {
                    e.preventDefault();
                    if (document.querySelector(".bp3-elevation-3")) {
                        document.querySelector(".bp3-elevation-3").firstElementChild.click();
                    }
                };
            }

        }

        document.querySelector("textarea").onkeyup = function (e) {

            //this replaces # with #[[]]
            if (e.which == 51 && easyTagState) {
                var positionBeforeHashtag = doGetCaretPosition(document.querySelector("textarea")) - 1

                var text = document.querySelector("textarea").value;


                var firstSection = text.substring(0, positionBeforeHashtag)
                // console.log("first section = " + firstSection)

                var textWithHashtag = text.substring(positionBeforeHashtag, positionBeforeHashtag + 1)

                var lastSection = text.substring(positionBeforeHashtag + 1)
                // alert("last section = " + lastSection)


                var newText = textWithHashtag.replace("#", "#[[" + selectedText + "]]");

                newText = firstSection + newText + lastSection;

                //alert(newText)

                document.querySelector("textarea").value = newText;

                if (!selectedText) {
                    setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3)
                }
                else {
                    setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3 + selectedText.length)
                }

            }
        }

    }
    if (autocompleteState) {
        document.getElementById("find-or-create-input").onkeydown = function (e) {
            if ((e.ctrlKey && e.which == 32) || e.which == 9 || (e.metaKey && e.which == 13)) {
                /*this is what ended up working to send a click event*/
                var evt = document.createEvent('MouseEvents')
                evt.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                if (document.querySelectorAll('.rm-search-title')[0].innerText.includes("New Page:")) {
                    document.querySelectorAll('.rm-search-title')[1].dispatchEvent(evt)
                }
                else {
                    document.querySelectorAll('.rm-search-title')[0].dispatchEvent(evt)
                }
            }
        }
    }
}

function applySentenceCase(str) {
    return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}