
window.oncontextmenu = function (e) {

    console.log('click');
    const contextMenuButton = e.target.matches('[data-context-menu-button]');
    if (!contextMenuButton && e.target.closest('[data-context-menu]') != null) return;

    let currentContextMenu;
    if (contextMenuButton) {
        //if right click, show  context menu
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
            console.log(e.target);
            currentContextMenu = e.target.parentElement.querySelector('[data-context-menu]');
            currentContextMenu.classList.toggle('active');
        }
    }

    document.querySelectorAll('[data-context-menu].active').forEach(dropdown => {
        if (dropdown === currentContextMenu) return;
        dropdown.classList.remove('active');
    });
};
