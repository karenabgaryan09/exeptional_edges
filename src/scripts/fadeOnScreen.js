const FadeOnScreen = (function () {
    let observer = null;
    let blocks = null
    let options = {
        root: null,
        threshold: 0,
        rootMargin:  (window.innerWidth > 576 ? "-300px" : "0px"),
    };
    const loadImages = (target) => {
        target.querySelectorAll("img[data-src]").forEach((img) => (img.src = img.dataset.src));
    };

    const showLazyElements = (target) => {
        loadImages(target);

        target.querySelectorAll("[data-lazy]")?.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("lazy-animate", "animating");
                element.addEventListener("transitionend", (e) => e.target.classList.remove("animating"), {
                    once: true,
                });
            }, element.dataset.lazyDelay || index * 200);
        });
    };
    const hideLazyElements = () => {
        document
            .querySelectorAll("section [data-lazy]")
            ?.forEach((element) => element.classList.remove("lazy-animate"));
    };
    const createObserver = () => {
        observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                showLazyElements(entry.target);

                observer.unobserve(entry.target);
            });
        }, options);

        blocks = document.querySelectorAll("[data-lazy-block]");
        blocks.forEach((block) => observer.observe(block));
    };

    const setEvents = () => {
        window.addEventListener("scroll", () => {
            if (window.scrollY) return;
            hideLazyElements();
            createObserver();
        });
    };

    createObserver();
    setEvents();

    return { createObserver };
})();
