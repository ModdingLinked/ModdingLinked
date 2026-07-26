function expandCard(header) {
    const content = header.nextElementSibling;
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        header.removeAttribute('aria-expanded');
        content.style.maxHeight = null;
    } else {
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}