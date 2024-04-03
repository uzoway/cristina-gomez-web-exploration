document.querySelector("body").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("active");
})

gsap.registerPlugin(CustomEase, Flip);

CustomEase.create("ease-in-out-quart", "0.77,0,0.175,1");

function initAnimation() {
    const state = Flip.getState(".images__item:nth-last-child(8)");
    const offsetState = Flip.getState(".images__item.offset");

    gsap.to(".images__item", {
        "--y-percent": "100%",
        stagger: {
            each: 0.1, 
            from: "edges"
        },
        delay: 2,
        onComplete: () => {

            document.querySelector(".images__item:nth-last-child(8)").classList.add("flip");
            const newOffset = document.querySelectorAll(".images__item.offset");

            newOffset.forEach(item => { item.classList.add("new-flip") })
            
            // document.querySelectorAll(".images__item.offset").classList.add("new-flip");

            Flip.from(state, {
                // duration: 1,
                // ease: "back",
                // absolute: true,
                scale: true
            })
            Flip.from(offsetState, {
                scale: true,
                delay: 1
            });
        }
    })
}

window.addEventListener("DOMContentLoaded", initAnimation);