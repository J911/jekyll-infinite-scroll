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
    async getNewPost() {
        if (this.enable === false) return false;
        this.enable = false;

        const response = await fetch(`${location.origin + this.path + this.pNum}/index.html`);
        if(response.ok) {
            const responseText = await response.text();
            const childItems = this.getChildItemsByAjaxHTML(responseText);
            this.appendNewItems(childItems);
            this.pNum++;
            return this.enable = true;                                
        }
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