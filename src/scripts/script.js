const LoadCover = (function () {
    const blocks = document.querySelectorAll("[data-cover-src]");
    if(!blocks || !blocks.length) return
    blocks.forEach((block) => {
        const cover = new Image();
        cover.src = block.dataset.coverSrc;
        cover.addEventListener(
            "load",
            () => (block.style.backgroundImage = `url(${cover.src})`)
        );
    });
})();


(function () {
    function Collapse() {
        this.toggle = null
    }

    Collapse.prototype = {
        constructor: Collapse,

        getHeight(element) {
            let computedHeight = null;
            [...element.children].forEach((each) => (computedHeight += this.getAbsoluteHeight(each)));
            return computedHeight + "px";
        },

        getAbsoluteHeight(el) {
            el = typeof el === "string" ? document.querySelector(el) : el;

            let styles = window.getComputedStyle(el);
            let margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);
            let border = parseFloat(styles["borderTop"]) + parseFloat(styles["borderBottom"]);

            return Math.ceil(el.offsetHeight + margin + border);
        },
        final(content) {
            content.addEventListener(
                "transitionend",
                (e) => {
                    e.currentTarget.classList.replace("collapsing", "collapse");
                    
                },
                {
                    once: true,
                }
            );
        },
        
        showContent(content) {
            // content.className = "collapsing show";
            content.classList.add('collapsing','show')
            setTimeout(() => (content.style = `height: ${this.getHeight(content)}`), 0);
            content.style = "";
            this.final(content);
            const toggle =  content.parentElement.querySelector("[data-toggle='collapse']");
            toggle.classList.remove('collapsed')
        },
        hideContent(content) {
            content.style = `height: ${this.getHeight(content)}`;
            setTimeout(() => {
                // content.className = "collapsing";
                content.classList.remove('collapse','show')
                content.classList.add('collapsing')
                content.style = "";
                this.final(content);
            }, 0);
            const toggle =  content.parentElement.querySelector("[data-toggle='collapse']");
            toggle.classList.add('collapsed')

        },
        init(e)  {
            this.toggle = e.target.closest("[data-toggle='collapse']");
            if (!this.toggle) return;
            const content = document.querySelector(this.toggle.dataset.target);
            const parent = document.querySelector(content.dataset.parent);
            const activeContent = parent?.querySelector(".collapse.show");
            if (parent && activeContent && activeContent !== content) this.hideContent(activeContent);

            const isContentShown = content.classList.contains("show");
            isContentShown ? this.hideContent(content) : this.showContent(content);
        },
        setEvents() {
            document.addEventListener("click", (e) => this.init(e));
        },
    };


    const collapse = new Collapse();
    collapse.setEvents();
})();
