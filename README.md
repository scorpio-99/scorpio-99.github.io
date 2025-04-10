# Amore - A Love Story Timeline

This is a beautiful React application that celebrates a relationship journey, showcasing memories, milestones, and special moments between Luca & Thuy.

## 🚀 Live Demo
- Check it out here: [scorpio-99.github.io](https://scorpio-99.github.io)

## ✨ Features
- ⚛️ Built with React 18
- 📱 Fully responsive design
- ⏱️ Real-time anniversary counter
- 📅 Dynamic milestone tracking and celebration
- 🗺️ Interactive map of special places using Leaflet
- 📸 Photo gallery with lightbox and categories

## 🛠️ Technology Stack
- **Frontend**: React, SCSS, JavaScript (ES6+)
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
1. Clone the repository:
```sh
git clone https://github.com/scorpio-99/scorpio-99.github.io
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🖼️ Adding Your Own Photos
To add your own photos to the gallery:

1. Place your images in the `public/assets/gallery` folder
2. Update the `galleryImages` array in `src/data/dats.json` with your image information
3. Categorize your images as 'dates', 'trips', or 'special'
4. Convert the images to 'webp' format to prevent perfomance issues
    ```sh
    node scripts/convert-images.js
    ```

## 📝 Customization
You can easily customize the application by modifying:

- `src/data/data.json` - update data
- `src/data/constants.js` - change settings
- `src/css/base/variables.css` - modify design variables

## 📱 Responsive Design
The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Automated Deployment
This project is automatically deployed using GitHub Actions. When changes are pushed to the main branch, the workflow automatically builds and deploys the application within the gh-pages feature branch to GitHub Pages.

### Manual Deployment
You can also deploy the application manually from your local environment:

```sh
npm run deploy
```

The deployment process uses the following npm scripts:
```sh
# Builds the application for production
npm run predeploy

# Publishes the build folder to the gh-pages branch
npm run deploy
```

This will build the project and publish it to the gh-pages branch.

## 💖 Acknowledgements
- Special thanks to github and all the open-source libraries that made this project possible
- Inspired by love stories everywhere

Made with ❤️ for Thuy
