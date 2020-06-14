// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 18: 1, 17: 1, 16: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function addScrollListeners(){
    [].map.call(document.querySelectorAll(".flex-h-box.flex-align-start.flex-justify-start"), e => e.onwheel = function(b){
        if (b.shiftKey){
            e.firstChild.firstChild.click();
            e.firstChild.firstChild.firstChild.click();
        }
    });
}

function initialize(){
  [].map.call(document.querySelectorAll(".flex-h-box.flex-align-start.flex-justify-start"), e => e.onwheel = function(b){
    if (b.shiftKey){
        e.firstChild.firstChild.click();
        e.firstChild.firstChild.firstChild.click();
    }
});
    document.querySelector(".roam-body").onkeydown = function(e){
        //ctrl+space will autocomplete
        if (e.ctrlKey && e.which == 32){
            document.querySelector(".bp3-elevation-3").firstElementChild.click();
        };
        //ctrl+shift+del will delete the page
        if (e.ctrlKey && e.shiftKey && e.which == 46){
            deletePage();
        }
    }
}

//waits for the page to load and then initializes with the above function
var checkExist = setInterval(function() {
   if (document.querySelector('h1')) {
     alert("loaded")
      initialize();
      clearInterval(checkExist);
   }
}, 100); // check every 100ms



//deletes the page
function deletePage(){
    document.querySelector("[class='bp3-button bp3-minimal bp3-small bp3-icon-more']").click()
    document.querySelector("[class='bp3-popover-content']").querySelector("[class='bp3-menu']").children[6].firstChild.click()
    //waits till the delete button exists and then clicks it
    var checkExist = setInterval(function() {
        if (document.querySelector('button.bp3-button.confirm-button.bp3-intent-danger')) {
            document.querySelector("button.bp3-button.confirm-button.bp3-intent-danger").click()
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms
}


