// Disable common redirects
window.open = () => null;

history.pushState = new Proxy(history.pushState, {
    apply() {
        console.log('Blocked pushState');
    }
});

history.replaceState = new Proxy(history.replaceState, {
    apply() {
        console.log('Blocked replaceState');
    }
});

// Block location methods
Location.prototype.assign = function(url) {
    console.log('Blocked location.assign:', url);
};

Location.prototype.replace = function(url) {
    console.log('Blocked location.replace:', url);
};

// Wait for #taskList
const waitForTaskList = () => {
    const taskList = document.querySelector('#taskList');

    if (taskList) {
        console.log('#taskList found');

        taskList.querySelectorAll(':scope > .task').forEach(task => {
            console.log('Clicking:', task);

            task.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));
        });

        return true;
    }

    return false;
};

if (!waitForTaskList()) {
    const observer = new MutationObserver(() => {
        if (waitForTaskList()) {
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
