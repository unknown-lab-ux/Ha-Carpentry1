# HA Carpentry — Website

**Custom Spaces · Better Living · Since 2004**
Premium carpentry website for Rawalpindi & Islamabad.

---

## 📁 File Structure

```
ha-carpentry/
│
├── index.html          ← Home page
├── doors.html          ← Door Designs (with filter: Engineer / Flush / Solid)
├── wardrobe.html       ← Wardrobe Designs
├── kitchen.html        ← Kitchen Designs
├── mediawall.html      ← Media Wall Designs
├── portfolio.html      ← Portfolio (masonry gallery)
├── disclaimer.html     ← Disclaimer & Terms
│
├── style.css           ← All styles (shared by all pages)
├── script.js           ← All JavaScript (shared by all pages)
│
└── README.md           ← This file
```

---

## 🖼️ Images to Add

Place all images in the **same folder** as the HTML files.

### Required images:
| File Name     | Used In          | Notes                    |
|---------------|------------------|--------------------------|
| `logo.png`    | All pages        | Your HA Carpentry logo   |
| `hero.png`    | All page banners | Wide landscape photo     |

### Design page images (1:1 square ratio recommended):
| File Name       | Page          |
|-----------------|---------------|
| `door1.png` – `door9.png`         | doors.html    |
| `wardrobe1.png` – `wardrobe6.png` | wardrobe.html |
| `kitchen1.png` – `kitchen6.png`   | kitchen.html  |
| `mediawall1.png` – `mediawall6.png` | mediawall.html |

### Home page designs:
| File Name       | Used In               |
|-----------------|-----------------------|
| `design1.png` – `design4.png` | Home → Top Selling Designs |

### Portfolio images:
| File Name             | Used In        |
|-----------------------|----------------|
| `portfolio1.png` – `portfolio12.png` | portfolio.html |

> **Tip:** If an image file is missing, the website shows a golden placeholder automatically — so the site won't break.

---

## 🚀 How to Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `ha-carpentry`)
2. Upload **all files** to the repository root
3. Go to **Settings → Pages**
4. Set source to **main branch / root**
5. Your site will be live at: `https://yourusername.github.io/ha-carpentry/`

---

## ✏️ How to Customise

### Change WhatsApp number
Search for `923424142499` in all HTML files and replace with your number.

### Add more design cards
Copy an existing `<div class="dpg-card">` block and update:
- `data-lb="newimage.png"` — for lightbox
- `<img src="newimage.png">` — image file
- `dpg-foot-name` — design name
- WhatsApp order link text

### Change colours
Open `style.css` and edit these variables at the top:
```css
:root {
  --bg:    #F0EFEC;   /* Light gray background */
  --gold:  #C9A96E;   /* Gold accent */
  --black: #1C1C1C;   /* Black (footer, Why section) */
}
```

### Update business info
- **WhatsApp:** Replace `923424142499` everywhere
- **Social links:** Update hrefs in footer section of each page
- **Location:** Update "Rawalpindi & Islamabad" text if needed
- **Copyright year:** Update `© 2024` in footer

---

## 📱 Responsive Breakpoints

| Screen         | Behaviour                                      |
|----------------|------------------------------------------------|
| Desktop (1024+) | Full navbar, 4-col services, 5-col pro grid   |
| Tablet (768–1024) | Hamburger menu, 2-col grids                 |
| Mobile (< 768)  | 1-col stats, 2-col services/designs, 1 review |

---

## ⚡ Features

- ✅ Sticky navbar with shining gold logo border
- ✅ Logo LEFT, hamburger RIGHT (mobile)
- ✅ Smooth slide-in hamburger drawer (mobile)
- ✅ Hero parallax background effect
- ✅ Stats counter animation (triggers on scroll)
- ✅ Services horizontal carousel (mobile)
- ✅ Reviews auto-playing carousel (desktop & mobile)
- ✅ Lightbox image viewer (all design pages)
- ✅ Door filter tabs (Engineer / Flush / Solid)
- ✅ WhatsApp floating button (blinking, all pages)
- ✅ Scroll-triggered fade animations
- ✅ SEO meta tags on all pages
- ✅ Google Maps, Facebook, Instagram, YouTube, TikTok links
- ✅ Mobile & desktop fully responsive

---

## 📞 Contact Details in Website

- **WhatsApp:** +92 342 4142499
- **Facebook:** https://www.facebook.com/share/1HCa4uYsxS/
- **Instagram:** https://www.instagram.com/hacarpentry4678
- **YouTube:** https://youtube.com/@hacarpentry
- **TikTok:** https://www.tiktok.com/@hameed.ahmed443
- **Google Maps:** https://maps.app.goo.gl/UmZr6S8he2fHRwqg9

---

*Built for HA Carpentry — Rawalpindi & Islamabad | © 2026*
