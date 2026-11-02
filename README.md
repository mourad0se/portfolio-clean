# Mourad Segrati – Personal Portfolio

A modern, dark-themed and fully responsive portfolio website for **Mourad Segrati**, a Junior Full Stack Developer based in Marrakech, Morocco, looking for junior positions, internships and entry-level opportunities.

Built with **pure HTML5, CSS3 and Vanilla JavaScript** – no frameworks, no build step.

## Project Overview

The portfolio presents my profile, education, skills, projects, certificates and contact details in a clean, recruiter-friendly layout. All personal information comes from my CV; sample projects are clearly labelled as **placeholders** until my real repositories are published.

## Features

- Dark, minimalist design with a cyan/indigo accent palette
- Sticky navbar with smooth scrolling and active-section highlighting
- Mobile hamburger menu (closes on link click, Escape or resize)
- Hero section with typing effect, photo and floating tech chips
- Skills grouped into Frontend, Backend, Databases and Tools
- Project cards with working category filters (All / Frontend / Full Stack / Python)
- Certificates grid with issuer and date
- Contact form with real-time JavaScript validation
- Download CV button
- Scroll-reveal animations and hover effects (respects `prefers-reduced-motion`)
- SEO: meta tags, Open Graph, JSON-LD structured data, semantic HTML
- Accessibility: skip link, ARIA attributes, focus styles, alt text, keyboard-friendly

## Technologies Used

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| JavaScript (ES6+) | Menu, filters, validation, animations |
| Google Fonts | Inter, Space Grotesk, JetBrains Mono |

## Project Structure

```
portfolio/
├── index.html        # Page structure & content (SEO, sections)
├── css/
│   └── style.css     # Design tokens, components, responsive rules
├── js/
│   └── script.js     # All interactivity
├── images/           # Profile photo and screenshots
├── cv/               # Your CV PDF (Mourad_Segrati_CV.pdf)
└── README.md
```

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/mourad0se/portfolio.git

# 2. Open the folder
cd portfolio

# 3. Open index.html in your browser
#    or use a local server (e.g. VS Code "Live Server" extension)
```

### Personalise it

1. Save your portrait as `images/profile.jpg` (portrait 4:5 works best).
2. Put your CV in `cv/Mourad_Segrati_CV.pdf`.
3. Replace the placeholder projects in the `#projects` section of `index.html` (title, description, tags, GitHub link, live demo link, screenshot in `images/`).
4. Remove the `data-demo` attribute from a "Live Demo" link once you have a real URL.

## Screenshots

> Add your screenshots to the `images/` folder and update the paths below.

| Desktop | Mobile |
| --- | --- |
| ![Desktop](images/screenshot-desktop.png) | ![Mobile](images/screenshot-mobile.png) |

## Live Demo

Deploy for free with **GitHub Pages**: *Settings → Pages → Deploy from branch → `main` / root*.

🔗 https://mourad0se.github.io/portfolio/

## Contact

- Email: morsegrati11@gmail.com
- GitHub: [github.com/mourad0se](https://github.com/mourad0se)
- LinkedIn: [Mourad Segrati](https://www.linkedin.com/in/mourad-segrati-a86bb3427)
- Phone: +212 653 198 298
- Location: Marrakech, Morocco

## License

Feel free to use this project as inspiration. Please replace the personal content with your own.
