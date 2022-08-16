
window.oncontextmenu = function (e) {
    const contextMenuButton = e.target.matches('[data-context-menu-button]');
    if (!contextMenuButton && e.target.closest('[data-context-menu]') != null) return;

    let currentContextMenu;
    if (contextMenuButton) {
        //if right click, show  context menu
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
            currentContextMenu = e.target.parentElement.querySelector('[data-context-menu]');
            currentContextMenu.classList.toggle('active');
            
            //get parentcontext window
            const contextMenuContainerName = currentContextMenu.dataset.contextMenuParent;

            //get parent context window
            const contextMenuContainer = document.querySelector(`[context-menu-parent-container="${contextMenuContainerName}"]`);

            //get mouse position of parent element
            const rect = contextMenuContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentContextMenu.style.left = x + 'px';
            currentContextMenu.style.top = y + 'px';


            //on mouse leave, hide context menu
            currentContextMenu.addEventListener('mouseleave', function () {
                currentContextMenu.classList.remove('active');
            });
        }
    }

    document.querySelectorAll('[data-context-menu].active').forEach(dropdown => {
        if (dropdown === currentContextMenu) return;
        dropdown.classList.remove('active');
    });
};
