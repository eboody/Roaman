var autocompleteState
var deletePageState
var collapseExpandState
var scopeHighlightState
var autoCapState
var sidebarHoverState


function save_options() {
    //get the state of the checkboxex
    autocompleteState = document.getElementById("toggleAutocomplete").checked;
    deletePageState = document.getElementById("toggleDeletePage").checked;
    collapseExpandState = document.getElementById("toggleCollapseExpand").checked;
    scopeHighlightState = document.getElementById("toggleScopeHighlight").checked;
    autoCapState = document.getElementById("toggleAutoCap").checked;
    sidebarHoverState = document.getElementById("toggleSidebarHover").checked;

    //store the value of the checkbox
    chrome.storage.local.set({
        autocompleteState: autocompleteState, 
        deletePageState: deletePageState, 
        collapseExpandState: collapseExpandState, 
        scopeHighlightState: scopeHighlightState,
        autoCapState: autoCapState,
        sidebarHoverState: sidebarHoverState
    }, function() {
        //do stuff if you want
      });

    chrome.storage.sync.set({
        autocompleteState: autocompleteState,
        deletePageState: deletePageState,
        collapseExpandState: collapseExpandState,
        scopeHighlightState: scopeHighlightState,
        autoCapState: autoCapState,
        sidebarHoverState: sidebarHoverState
    }, function () {

    });

    //reload the page after saving
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
      window.close();
};

function restore_options() {
    chrome.storage.sync.get([
        `autocompleteState`,
        `deletePageState`,
        `collapseExpandState`,
        `scopeHighlightState`,
        `autoCapState`,
        `sidebarHoverState`
    ], function (items) {
        document.getElementById('toggleAutocomplete').checked = items.autocompleteState;   
        document.getElementById('toggleDeletePage').checked = items.deletePageState;  
        document.getElementById('toggleCollapseExpand').checked = items.collapseExpandState;
        document.getElementById('toggleScopeHighlight').checked = items.scopeHighlightState;
        document.getElementById('toggleAutoCap').checked = items.autoCapState;    
        document.getElementById('toggleSidebarHover').checked = items.sidebarHoverState;    
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener(`click`, save_options);