# TypeForge - Typing Speed Test

A modern, sleek typing speed test application built with vanilla HTML, CSS, and JavaScript. Test your typing speed and accuracy with real-time feedback, live WPM graphs, and multiple time modes.


## Features

- **Real-time WPM Calculation**: See your words per minute update live as you type
- **Accuracy Tracking**: Monitor your typing accuracy with detailed statistics
- **Live WPM Graph**: Visual representation of your typing speed over time
- **Multiple Time Modes**: Choose from 30s, 60s, or 120s tests
- **Streak Counter**: Track consecutive correct characters
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with a modern dark aesthetic
- **Keyboard Shortcuts**: Quick restart with Tab+Enter, reset with Esc
- **Smooth Animations**: Polished UI with caret blinking, timer arcs, and transitions

## Demo

[GitHub](https://github.com/saisiri6803/TypingForge)

## 📋 How to Use

1. **Start Typing**: Click on the typing area or press any key to begin
2. **Type the Words**: Type the displayed words as quickly and accurately as possible
3. **Press Space**: Move to the next word by pressing the spacebar
4. **View Results**: When time runs out, see your final statistics
5. **Try Again**: Use the restart button or keyboard shortcuts to start over

### Keyboard Shortcuts
- `Tab` + `Enter`: Restart test
- `Esc`: Reset test
- Any key: Focus typing area (when not focused)

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom properties, animations, responsive design
- **JavaScript (ES6+)**: Game logic, DOM manipulation, canvas drawing
- **Google Fonts**: Space Mono and Syne font families

## Project Structure

```
TypeForge/
├── typing-test.html    # Main application file
└── README.md          # Project documentation
```

## Running Locally

Since this is a Client-side only application:

1. Download or clone the repository
2. Open `typing-test.html` in your web browser


## Statistics Explained

- **WPM (Words Per Minute)**: Calculated using `(correct characters / 5) / minutes elapsed`
- **Accuracy**: Percentage of correctly typed characters
- **Streak**: Consecutive correct characters typed
- **Live Graph**: Shows WPM progression throughout the test
- **Sparkline**: Final WPM visualization in results modal

## Customization

The app uses CSS custom properties (variables) for easy theming. Key variables in `:root`:

```css
--bg: #0a0a0f;           /* Background color */
--accent: #f5c842;        /* Primary accent (gold) */
--correct: #4ade9a;       /* Correct character color */
--wrong: #f5536a;         /* Wrong character color */
--text: #e2e2f0;          /* Main text color */
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Features to Add

- [ ] Custom word lists/themes
- [ ] Sound effects
- [ ] Different difficulty levels
- [ ] Multiplayer mode
- [ ] Progress tracking across sessions
- [ ] Export results as image


## Acknowledgments

- Inspired by popular typing test websites like Monkeytype and 10fastfingers
- Font families from Google Fonts
- Icons and UI inspiration from modern web design trends

---

**Made with ❤️ for typists everywhere**

*If you find this project helpful, please give it a ⭐ on GitHub!*"