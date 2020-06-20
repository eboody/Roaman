var autocompleteState
function save_options() {
    //get the state of the checkbox
    autocompleteState = document.getElementById("toggleAutocomplete").checked;

    //this is just so tht I can say enabled or disabled in the popup. might delete this later
    if (autocompleteState) {
        document.getElementById("labelAutocomplete").textContent = "ENABLED"
    }
    else {
        document.getElementById("labelAutocomplete").textContent = "DISABLED"
    }


    //store the value of the checkbox
    chrome.storage.local.set({autocompleteState: autocompleteState}, function() {
        console.log('autocompleteState is set to ' + autocompleteState);
      });


    var labelAutocomplete = document.getElementById("labelAutocomplete").value;
    chrome.storage.sync.set({
        autocompleteState: autocompleteState,
        labelAutocomplete: labelAutocomplete
    }, function () {

    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
};

function restore_options() {
    chrome.storage.sync.get({
        autocompleteState: true,
    }, function (items) {
        document.getElementById('toggleAutocomplete').checked = items.autocompleteState;   
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener(`click`, save_options);