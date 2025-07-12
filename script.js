const navLinks = document.querySelectorAll("nav ul:first-child a")
const navElement = document.querySelector("nav")
const prevSkillBtn = document.querySelector(".prev-skill")
const nextSkillBtn = document.querySelector(".next-skill")
const skillHolder = document.querySelector(".skills-holder > div")
const skill = document.querySelectorAll(".skills-holder article")[0]
const carouselPagination = document.querySelector(".carousel-pagination")
const projectOverlays = document.querySelectorAll(".projects-holder article .overlay")
const projectDetailsWindow = document.querySelector(".project-details-container")
const projectPrevImage = document.querySelector(".project-details .prev-image")
const projectNextImage = document.querySelector(".project-details .next-image")
const projectOverlayCarousel = document.querySelector(".project-details .carousel")
const menuBtn = document.querySelector(".menu-btn")
const mobileNav = document.querySelector(".mobile-nav")

const techno = [
    { name: "Docker", icon: "fa-brands fa-docker", color: "#0398fc" },           // 0
    { name: "Vue.JS", icon: "fa-brands fa-vuejs", color: "#30c776" },            // 1
    { name: "Laravel", icon: "fa-brands fa-laravel", color: "#ff4117" },         // 2
    { name: "PostgreSQL", icon: "media/postgresql.svg", color: "#025eba" },      // 3
    { name: "Elementor", icon: "fa-brands fa-elementor", color: "#631018" },     // 4
    { name: "WordPress", icon: "fa-brands fa-wordpress", color: "#006796" },     // 5
    { name: "VannilaJS", icon: "fa-brands fa-square-js", color: "#e6c700" },     // 6
    { name: "PHP", icon: "fa-brands fa-php", color: "#8a85c9" },                 // 7
    { name: "HTML5", icon: "fa-brands fa-html5", color: "#e85935" },             // 8
    { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1298db" },           // 9
    { name: "TailwindCSS", icon: "media/tailwind-css.svg", color: "#02bcfa" }    // 10
]

const projects = [
    { 
        id: "project-1", 
        link: "https://activeflow.site",
        name: "ActiveFlow",
        description: `
        <p>Aplikácia <strong>ActiveFlow</strong> je zameraná na vzťah fitness trénera a&nbsp;jeho klientov s možnosťou vzájomnej četovej komunikácie, plánovania tréningov, zdieľania údajov nameraných zo smart fitness zariadení, vytvárania jedálničkov a&nbsp;tréningových plánov pre zjednodušenie komunikácie medzi oboma stranami.</p>
        <p>Frontend stránky, naštýlovaný pomocou moderného <strong>TailwindCSS</strong>, beží na populárnom, svižnom a ľahkom frameworku <strong>Vue.JS</strong>. Spracúvanie dát a požiadavok klientov má na starosti backend bežiaci na serveri Apache, jeho základom sú skripty v jazyku <strong>PHP</strong>, resp. jeho robustnom a&nbsp;spoľahlivom frameworku <strong>Laravel</strong>. Užívateľské údaje uskladňuje relačná databáza na databázovom serveri <strong>PostgreSQL</strong>.</p>
        <p>Všetky servery bežia v oddelenom <strong>Docker</strong> prostredí ako samostatné kontajnery, aplikácia je hostovaná na jedinom serveri.</p>
        `,
        techStack: [10, 1, 2, 0, 3],
        imagesFolder: "media/activeflow/",
        images: ["activeflow-homepage-1.png", "activeflow-homepage-2.png", "activeflow-homepage-3.png", "activeflow-exercises.png", "activeflow-new-exercise.png", "activeflow-new-plan.png"]
    },
    { 
        id: "project-2",
        link: null,
        name: "IT Pizza",
        description: `<p>IT Pizza je ročníkovým projektom zo strednej školy. Nájdete na nej ponuku fiktívnej pizzerie s plne funkčným nákupným košíkom, systémom objednávania, prehľad aktuálneho stavu objednávky aj administračný panel pre spracovávanie objednávok.</p>
        <p>Stránka beží na <strong>PHP</strong>, renderuje sa na strane servera. Frontend IT Pizze bol napísaný v čistom kóde <strong>HTML5</strong>, <strong>CSS3</strong> a <strong>Vanilla Javascript-u</strong> - precvičil som si na nej zručnosti v písaní čistého kódu, bez pomoci frameworkov.</p>
        `,
        techStack: [8, 9, 6, 7],
        imagesFolder: "media/itpizza/",
        images: ["itpizza-homepage-1.png", "itpizza-homepage-2.png", "itpizza-homepage-3.png", "itpizza-homepage-4.png", "itpizza-order.png", "itpizza-track-order.png", "itpizza-admin.png"]
    },
    { 
        id: "project-3", 
        link: "https://pcleaning.sk",
        name: "PCleaning",
        description: `<p>Môj prvý väčší projekt vo <strong>WordPress-e</strong>. Stránku som vytvoril na zakázku pre firmu PCleaning, od návrhov a wireframov až po nahranie na webhosting.</p>
        <p>Webstránka používa populárnu šablónu, prispôsobenú podľa potrieb klienta cez nadstavbu Elementor. Nájdete na nej jednoduchú galériu, kontaktný formulár aj sekciu s Google recenziami.</p>`,
        techStack: [5, 4],
        imagesFolder: "media/pcleaning/",
        images: ["pcleaning-homepage-1.png", "pcleaning-homepage-2.png", "pcleaning-services.png", "pcleaning-pricing.png"]
    }
]

const skillsCount = skillHolder.childElementCount
let skillIndex = 0

for (let i = 0; i < skillsCount; i++) {
    let activeStyle = i == 0 ? ' class="active"' : ""
    carouselPagination.insertAdjacentHTML("beforeend", `<small${activeStyle}></small>`)
}

const carouselPages = carouselPagination.querySelectorAll("small")

let carouselAuto = setInterval(() => {
    nextSkill()
}, 10000)

const setAutoCarousel = () => {
    clearInterval(carouselAuto)
    carouselAuto = setInterval(() => {
        nextSkill()
    }, 10000)
}

carouselPages.forEach((page, index) => {
    page.addEventListener("click", () => {
        carouselPages[skillIndex].classList.remove("active")
        skillIndex = index
        page.classList.add("active")
        skillHolder.style.right = skillIndex * skill.offsetWidth + "px"
        setAutoCarousel()
    })
})

navLinks.forEach(link => {
    link.addEventListener("mouseover", (event) => {
        event.target.nextSibling.style.width = "100%"
    })

    link.addEventListener("mouseout", (event) => {
        event.target.nextSibling.style.width = "0"
        setLinkUnderline()
    })
})

window.addEventListener("scroll", () => {
    if(window.scrollY > 40) {
        navElement.classList.add("scrolled")
    } else {
        if (!isMenuOpened) {
            navElement.classList.remove("scrolled")
        }
    }
})

prevSkillBtn.addEventListener("click", () => {
    carouselPages[skillIndex].classList.remove("active")
    if (skillIndex - 1 < 0) {
        skillIndex = skillsCount - 1
    } else {
        skillIndex--
    }
    skillHolder.style.right = skillIndex * skill.offsetWidth + "px"
    carouselPages[skillIndex].classList.add("active")
    setAutoCarousel()
})

const nextSkill = () => {
    carouselPages[skillIndex].classList.remove("active")
    if (skillIndex + 1 > skillsCount - 1) {
        skillIndex = 0
    } else {
        skillIndex++
    }
    skillHolder.style.right = skillIndex * skill.offsetWidth + "px"
    carouselPages[skillIndex].classList.add("active")
}

nextSkillBtn.addEventListener("click", () => {
    nextSkill()
    setAutoCarousel()
})

let isOverlayOpened = false;

const projectDetailsCarousel = projectDetailsWindow.querySelector(".carousel")
const projectDetailsName = projectDetailsWindow.querySelector(".project-details section h3")
const projectDetailsIcons = projectDetailsWindow.querySelector(".tech-icons")
const projectDetailsDesc = projectDetailsWindow.querySelector(".project-details section article")
const projectDetailsLink = projectDetailsWindow.querySelector(".project-details section a")
const projectDetailsCloseBtn = projectDetailsWindow.querySelector(".close-project-details-btn")

projectDetailsCloseBtn.addEventListener("click", () => {
    closeOverlay()
})

projectOverlays.forEach(item => {
    item.addEventListener("click", () => {
        projectDetailsWindow.style.display = "flex"
        projectDetailsWindow.classList.add("active")
        isOverlayOpened = true

        projectImageIndex = 0

        const projectId = item.parentElement.id
        const data = projects.find(project => project.id === projectId)

        currentProject = data

        let imageHTML = ""

        data.images.forEach(image => {
            imageHTML += `<img src="${data.imagesFolder + image}"></img>`
        })

        projectDetailsCarousel.innerHTML = ""
        projectDetailsCarousel.insertAdjacentHTML("beforeend", imageHTML)

        projectDetailsIcons.innerHTML = ""

        for (let iconIndex of data.techStack) {
            let temp = ""
            if (techno[iconIndex].icon.substring(0, 5) == "media") {
                temp = `<div><span style="box-shadow: 1px 1px 20px ${techno[iconIndex].color};">${techno[iconIndex].name}</span><i class="custom" style="mask-image: url('${techno[iconIndex].icon}');"></i></div>`
                projectDetailsIcons.insertAdjacentHTML("beforeend", temp)

                projectDetailsIcons.lastChild.lastChild.addEventListener("mouseover", (event) => {
                    event.target.style.backgroundColor = techno[iconIndex].color
                })

                projectDetailsIcons.lastChild.lastChild.addEventListener("mouseleave", (event) => {
                    event.target.style.backgroundColor = "#000"
                })
            } else {
                temp = `<div><span style="box-shadow: 1px 1px 20px ${techno[iconIndex].color};">${techno[iconIndex].name}</span><i class="${techno[iconIndex].icon}"></i></div>`
                projectDetailsIcons.insertAdjacentHTML("beforeend", temp)

                projectDetailsIcons.lastChild.lastChild.addEventListener("mouseover", (event) => {
                    event.target.style.color = techno[iconIndex].color
                })

                projectDetailsIcons.lastChild.lastChild.addEventListener("mouseleave", (event) => {
                    event.target.style.color = "#000"
                })
            }
            
        }

        projectDetailsName.innerText = data.name
        projectDetailsDesc.innerHTML = data.description

        if (data.link != null) {
            projectDetailsLink.style.cursor = "pointer"
            projectDetailsLink.style.pointerEvents = "auto"
            projectDetailsLink.href = data.link
            projectDetailsLink.innerText = data.link
        } else {
            projectDetailsLink.href = ""
            projectDetailsLink.style.cursor = "default"
            projectDetailsLink.style.pointerEvents = "none"
            projectDetailsLink.innerText = "Nie je hostovaná."
        }
        

    })
})

projectDetailsWindow.addEventListener("click", (event) => {
    if (!event.target.closest(".project-details")) {
        closeOverlay()
    }
})

document.addEventListener("keyup", (event) => {
    if (isOverlayOpened) {
        switch (event.key) {
            case "Escape":
                closeOverlay()
                break
            case "ArrowLeft":
                overlayPrevImage()
                break
            case "ArrowRight":
                overlayNextImage()
                break
        }
    }
})

const closeOverlay = () => {
    projectDetailsWindow.classList.remove("active")
    setTimeout(() => {
        projectDetailsWindow.style.display = "none"
    }, 300)
    isOverlayOpened = false
}

let projectImageIndex = 0
let currentProject = null

const overlayPrevImage = () => {
    if (projectImageIndex - 1 < 0) {
        projectImageIndex = currentProject.images.length - 1
    } else {
        projectImageIndex--
    }

    const firstImg = projectOverlayCarousel.querySelectorAll("img")[0]
    firstImg.style.marginLeft = "-" + projectImageIndex * 100 + "%"
}

const overlayNextImage = () => {
    if (projectImageIndex + 1 > currentProject.images.length - 1) {
        projectImageIndex = 0
    } else {
        projectImageIndex++
    }

    const firstImg = projectOverlayCarousel.querySelectorAll("img")[0]
    firstImg.style.marginLeft = "-" + projectImageIndex * 100 + "%"
}

projectPrevImage.addEventListener("click", () => {
    overlayPrevImage()
})

projectNextImage.addEventListener("click", () => {
    overlayNextImage()
})


function updateLegs() {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    const leg = item.querySelector('.leg');
    const itemRect = item.getBoundingClientRect();
    const itemMiddleY = itemRect.top + itemRect.height / 2;
    let itemEdgeX
    if (window.innerWidth <= 900) {
        itemEdgeX = itemRect.right
    } else {
        itemEdgeX = item.classList.contains('left')
      ? itemRect.right
      : itemRect.left;
    }
    

    const centerX = window.innerWidth / 2;
    let legLength = Math.abs(centerX - itemEdgeX);

    leg.style.top = '50%';
    leg.style.transform = 'translateY(-50%)';

    if (window.innerWidth <= 900 && window.innerWidth >= 650) {
        leg.style.width = `calc(10% - ${.95 - window.innerWidth / 1000}rem)`;
        leg.style.left = '100%';
        leg.style.right = 'unset';
    } else if (window.innerWidth < 650) {
        leg.style.width = `calc(10% - ${.8 - window.innerWidth / 1000}rem)`;
        leg.style.left = '100%';
        leg.style.right = 'unset';
    } else {
        if (item.classList.contains('left')) {
            leg.style.width = `calc(${legLength}px - 1.05rem)`;
            leg.style.left = '100%';
            leg.style.right = 'auto';
        } else {
            leg.style.width = `calc(${legLength}px - .2rem)`;
            leg.style.right = '100%';
            leg.style.left = 'auto';
        }
    }

    
  });
}

// Run on load and on resize
window.addEventListener('load', updateLegs);
window.addEventListener('resize', () => {
    updateLegs()
    sectionPositions = []
    
});
const sections = [
    document.querySelector("#skills"),
    document.querySelector("#projects"),
    document.querySelector("#education"),
    document.querySelector("#certificates"),
    document.querySelector("#about-me")
]

let sectionPositions = []

if (window.innerWidth > 880) {
    document.addEventListener("scroll", () => {

        if (sectionPositions.length === 0) {
            sections.forEach(section => {
                sectionPositions.push([section.offsetTop - window.innerHeight / 4, section.offsetTop + section.offsetHeight])
            })
        }

        if (window.scrollY < sectionPositions[0][0]) {
            navLinks.forEach((link, index) => {
                link.nextElementSibling.style.width = "0"
            })
        } else {
            setLinkUnderline()
        }

    })
}

const setLinkUnderline = () => {
    for (let i = 0; i < sectionPositions.length; i++) {
        if (window.scrollY >= sectionPositions[i][0] && window.scrollY <= sectionPositions[i][1]) {
            navLinks.forEach((link, index) => {
                if (index !== i) {
                    link.nextElementSibling.style.width = "0"
                } else {
                    link.nextElementSibling.style.width = "100%"
                }
            })
        }
    }
}

let isMenuOpened = false

const darkOverlay = document.querySelector(".dark-overlay")

darkOverlay.addEventListener("click", () => {
    if (isMenuOpened) {
        switchMenu()
    }
})

menuBtn.addEventListener("click", () => {
    switchMenu()
})

const switchMenu = () => {
    isMenuOpened = !isMenuOpened
    const menuState = ["none", "block"]
    
    darkOverlay.style.display = menuState[+isMenuOpened]

    mobileNav.classList.toggle("active")
    menuBtn.firstElementChild.classList.toggle("fa-bars")
    menuBtn.firstElementChild.classList.toggle("fa-xmark")

    if (window.scrollY <= 40) {
        navElement.classList.toggle("scrolled")
    }
}