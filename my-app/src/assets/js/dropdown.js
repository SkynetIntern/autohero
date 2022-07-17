document.addEventListener('click', function(e) {
    const dropdownButton = e.target.matches('[data-dropdown-button]');
    if (!dropdownButton && e.target.closest('[data-dropdown]') != null) return;

    let currentDropdown;
    if (dropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
    });
});
document.querySelectorAll('.dropdown-menu-c.top').forEach(dropdown => {
    //get height of dropdown menu
    const dropdownHeight = dropdown.offsetHeight;
    dropdown.style.transform = `translateY(-${dropdownHeight}px)`;
});