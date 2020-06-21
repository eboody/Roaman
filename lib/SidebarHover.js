function setMouseMoveListener(){  
    console.log(sidebarHoverState)
    if (!sidebarHoverState){
        return
    }
    var mousedOverMenu = false;
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('mouseover', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.onmousemove = function (mousemoveEvent){
        if (mousemoveEvent.clientX < 65 && !mousedOverMenu){
            document.querySelector(".bp3-button.bp3-minimal.bp3-icon-menu.pointer.bp3-small").dispatchEvent(evt);
            console.log("now")
            mousedOverMenu = true;
        }
        else {
            mousedOverMenu = false;
        }
    }
}