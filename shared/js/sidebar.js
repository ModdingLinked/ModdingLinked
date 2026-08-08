function createRightSidebar() {
    const content = document.getElementsByClassName('content')[0];
    const sidebar = document.getElementById('sidebarContent');
    if (!content || !sidebar) return;

    const sections = content.getElementsByClassName('section');
    if (!sections.length) return;

    // Create fragment for batch updates (better performance)
    const fragment = document.createDocumentFragment();

    for (const section of sections) {
        // Get section elements (both cards and expanders)
        const elements = [...section.children].filter(el =>
            (el.classList.contains('card') || el.classList.contains('expander-top')) &&
            el.parentNode === section
        ).sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );

        section.querySelectorAll('h2').forEach(header => {
            if (!header.innerHTML) return;

            const div = document.createElement('div');

            // Create header link
            const b = document.createElement('b');
            const targetId = header.id || header.closest('[id]')?.id || section.id;
            b.innerHTML = `<a href="#${targetId}">${header.innerHTML}</a>`;
            div.appendChild(b);

            // Add all card and expander elements for this section
            elements.forEach(element => {
                const expanderH3 = element.querySelector('h3');
                const text = element.getAttribute('title') ||
                    (element.id ? element.id.replace(/([A-Z])/g, ' $1').trim() : '') ||
                    (expanderH3 ? expanderH3.textContent.trim() : '');

                if (!text) return;

                // Generate ID if missing
                if (!element.id && (!expanderH3 || !expanderH3.id)) {
                    element.id = text.replace(/\s+/g, '').replace(/[^\w-]/g, '');
                }

                const targetElementId = element.id || expanderH3?.id || '';

                const a = document.createElement('a');
                a.href = targetElementId ? `#${targetElementId}` : '#';
                a.textContent = text;
                div.appendChild(a);
            });

            fragment.appendChild(div);
        });
    }

    sidebar.appendChild(fragment);
}