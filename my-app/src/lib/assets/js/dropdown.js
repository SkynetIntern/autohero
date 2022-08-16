document.addEventListener('click', function (e) {
    const dropdownButton = e.target.matches('[data-dropdown-button]');
    if (!dropdownButton && e.target.closest('[data-dropdown]') != null) return;

    let currentDropdown;
    if (dropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        if (currentDropdown.classList.contains('pinned')) return;
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        if (dropdown.classList.contains('pinned')) return;
        dropdown.classList.remove('active');
    });
});
