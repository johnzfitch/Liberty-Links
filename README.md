# Liberty Links

![Liberty Links Logo](logo.png)

A powerful browser userscript that automatically removes tracking parameters and cleans URLs across popular websites, protecting your privacy while you browse.

## 🔒 Features

- **Comprehensive URL Cleaning**: Removes tracking parameters from URLs on 30+ popular websites
- **Privacy Protection**: Eliminates tracking IDs from Google, Facebook, Amazon, eBay, YouTube, Twitter/X, Instagram, TikTok, Reddit, and many more
- **Real-time Processing**: Automatically cleans links as pages load and update dynamically
- **Smart Redirect Handling**: Bypasses redirect wrappers on platforms like Google, Facebook, YouTube, and Reddit
- **Product Link Simplification**: Cleans Amazon, eBay, and Target product URLs to their essential components
- **Non-intrusive**: Works silently in the background without affecting your browsing experience

## 🌐 Supported Websites

- **Search Engines**: Google, Bing, Yahoo
- **Social Media**: Facebook, Twitter/X, Instagram, TikTok, Reddit, LinkedIn
- **E-commerce**: Amazon, eBay, Newegg, Target, Etsy
- **Media**: YouTube, IMDB
- **Other**: Disqus, Pocket

## 📦 Installation

### Prerequisites

You'll need a userscript manager extension installed in your browser:

- **Chrome/Edge/Opera**: [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
- **Firefox**: [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), or [Greasemonkey](https://www.greasespot.net/)
- **Safari**: [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

### Install the Script

1. Install a userscript manager from the links above
2. Click here to install: [Install Liberty Links](https://github.com/johnzfitch/Liberty-Links/raw/main/userscript.js)
3. Your userscript manager will prompt you to install the script
4. Click "Install" and you're done!

Alternatively, you can:
- Copy the contents of `userscript.js` and paste it into a new script in your userscript manager
- Install from GreasyFork (if published there)

## 🚀 Usage

Once installed, Liberty Links works automatically. Simply browse the web normally, and the script will:

1. Clean tracking parameters from URLs in the address bar
2. Clean all links on supported websites before you click them
3. Handle redirect wrappers transparently

No configuration needed!

## 🧹 What Gets Removed

Liberty Links removes various tracking and analytics parameters, including:

### Common Tracking Parameters
- `utm_*` - Universal analytics parameters
- `fbclid` - Facebook click identifier
- `gclid` - Google click identifier
- `msclkid` - Microsoft click identifier
- `igshid` - Instagram share identifier
- And 100+ other tracking parameters

### Site-Specific Parameters
- **Amazon**: Removes ref tags, encoding parameters, and tracking IDs while preserving product identifiers
- **Google**: Removes search tracking, UI state parameters, and analytics IDs
- **YouTube**: Removes feature tags, annotations, and tracking parameters
- **eBay**: Simplifies item URLs and removes campaign tracking
- **Facebook/Twitter**: Removes social tracking and referrer parameters

## 🛠️ Development

### Project Structure

```
Liberty-Links/
├── userscript.js      # Main userscript file
├── logo.png           # Project logo
├── README.md          # This file
├── LICENSE            # GPL-3.0 license
└── CHANGELOG.md       # Version history
```

### How It Works

The script uses several techniques to clean URLs:

1. **URL Interception**: Monitors and modifies URLs before navigation
2. **DOM Observation**: Uses MutationObserver to detect and clean dynamically added links
3. **History API Wrapping**: Intercepts browser history changes to clean URLs
4. **Pattern Matching**: Uses regular expressions to identify and remove tracking parameters

### Testing

To test changes:

1. Clone the repository
2. Edit `userscript.js`
3. In your userscript manager, update the script with your changes
4. Visit supported websites and verify URL cleaning works correctly

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Issues**: Found a tracking parameter that isn't being removed? Open an issue!
2. **Add Support**: Want to add support for a new website? Submit a pull request!
3. **Improve Code**: See opportunities for optimization? We'd love to review your PR!

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

This is a maintained fork of the original "General URL Cleaner" by dividedby. The project continues to evolve with:
- Modern website support
- Enhanced tracking parameter detection
- Improved performance and reliability
- Active maintenance and updates

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.

## ⚠️ Privacy Notice

Liberty Links operates entirely in your browser. No data is collected, transmitted, or stored externally. All URL cleaning happens locally on your device.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/johnzfitch/Liberty-Links/issues)
- **Discussions**: [GitHub Discussions](https://github.com/johnzfitch/Liberty-Links/discussions)

## ⭐ Star History

If you find Liberty Links useful, please consider giving it a star on GitHub!

---

**Made with ❤️ for a more private web**
