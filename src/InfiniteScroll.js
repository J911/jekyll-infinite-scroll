class InfiniteScroll {
    constructor (path, wrapperSelector) {
        if (path === undefined || wrapperSelector === undefined) throw Error ('no parameter.');
        this.path = path;
        this.pNum = 2;
        this.wNode = document.querySelector(`${wrapperSelector}`);
        this.wrapperSelector = wrapperSelector;
        this.enable = true;

        this.detectScroll();
    }

    detectScroll() {
        window.onscroll = (ev) => {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) 
                this.getNewPost();
        };    
    }
    getNewPost() {
        if (this.enable === false) return false;
        this.enable = false;

        fetch(`${location.origin + this.path + this.pNum}/index.html`).then(response => {
            if(response.status === 200) { return response.text(); }
        }).then(responseText => {
            const childItems = this.getChildItemsByAjaxHTML(responseText);
            this.appendNewItems(childItems);
            this.pNum++;
            return this.enable = true;
        }).catch(e => {});
    }

    getChildItemsByAjaxHTML(HTMLText) {
        const newHTML = document.createElement('html');
        newHTML.innerHTML = HTMLText;
        const childItems = newHTML.querySelectorAll(`${this.wrapperSelector} > *`);
        return childItems;
    }

    appendNewItems(items) {
        items.forEach(item => {
            this.wNode.appendChild(item);
        });
    }
}