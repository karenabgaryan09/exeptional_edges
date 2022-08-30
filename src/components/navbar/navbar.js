(function () {
    const query = document.querySelector.bind(document);
    const queryAll = document.querySelectorAll.bind(document);

    function Navbar({ navbar, form, dropdownToggles }) {
        this.navbar = navbar;
        this.form = form;
        this.dropdownToggles = dropdownToggles;

        this.toggler = null;
        this.collapse = null;
        this.isCollapseShown = false;
    }

    Navbar.prototype = {
        constructor: Navbar,

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

        showCollapse() {
            this.collapse.className = `navbar-collapse collapsing show`;
            this.toggler.classList.add("collapsed");
            setTimeout(() => (this.collapse.style = `height: ${this.getHeight(this.collapse)} `), 0);
            this.collapse.addEventListener(
                "transitionend",
                () => this.collapse.classList.replace("collapsing", "collapse"),
                { once: true }
            );
            // window.addEventListener("click", () => this.hideCollapse(), { once: true });
        },
        hideCollapse() {
            this.collapse.className = `navbar-collapse collapsing`;
            this.toggler.classList.remove("collapsed");
            setTimeout(() => (this.collapse.style = {}), 0);
            this.collapse.addEventListener(
                "transitionend",
                () => this.collapse.classList.replace("collapsing", "collapse"),
                { once: true }
            );
        },

        initCollapse(toggler) {
            this.toggler = toggler;
            this.collapse = toggler.nextElementSibling;
            this.isCollapseShown = this.collapse.classList.contains("show");
            this.isCollapseShown ? this.hideCollapse() : this.showCollapse();
        },
        // DROPDOWN
        // showDropdown(toggle) {
        //     // this.menu.className = "dropdown-menu dropping show";
        //     // setTimeout(() => (this.menu.style = `opacity: 1;transform: none`), 0);
        //     // this.menu.addEventListener("transitionend", () => this.menu.classList.replace("dropping", "drop"), {
        //     //     once: true,
        //     // });

        //     const menu = toggle.nextElementSibling;
        //     menu.className = "dropdown-menu drop show";
        // },
        // hideDropdown(toggle) {
        //     // this.menu.className = "dropdown-menu dropping ";
        //     // setTimeout(() => (this.menu.style = {}), 0);
        //     // this.menu.addEventListener("transitionend", () => this.menu.classList.replace("dropping", "drop"), {
        //     //     once: true,
        //     // });
        //     const menu = toggle.nextElementSibling;
        //     menu.className = "dropdown-menu drop";
        // },

        //
        setEvents() {
            this.dropdownToggles.forEach((dropdownToggle) => {
                // dropdownToggle.addEventListener("blur", (e) => {
                //     // e.sourceCapabilities && setTimeout(()=>this.hideDropdown(dropdownToggle),100)
                //     e.sourceCapabilities && this.hideDropdown(dropdownToggle)
                // });
            });
            this.navbar.addEventListener("click", (e) => {
                const toggler = e.target.closest(".navbar-toggler");
                // const toggle = e.target.closest(".dropdown-toggle");
                if (toggler) this.initCollapse(toggler);
                // if (toggle) {
                //     const isDropdownShown = toggle.nextElementSibling.classList.contains('show')
                //     isDropdownShown ? this.hideDropdown(toggle) : this.showDropdown(toggle);
                // }
            });
            // this.form.addEventListener("submit", (e) =>console.log('submit'));
            window.addEventListener("scroll", (e) => {
                this.navbar.classList.toggle("shrink", window.scrollY > 0);
               
            }); //window.scrollY > 300
        },
    };

    const state = {
        navbar: query(".navbar"),
        form: query(".navbar form"),
        dropdownToggles: queryAll(".navbar .dropdown-toggle"),
    };

    const navbarHorizontal = new Navbar(state);
    navbarHorizontal.setEvents();

    return {
        navbarHorizontal,
    };
})();
