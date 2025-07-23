# Icebreaker Generator 🎯

A professional tool for collaborative process facilitators to generate engaging icebreaker and energizer activities powered by AI.

![Icebreaker Generator](https://icebreaker-generator.vercel.app/og-image.png)

## ✨ Features

- **Multilingual Interface** - 5 interface languages (EN, IT, ES, FR, DE)
- **75+ Output Languages** - Generate activities in any language
- **Smart Parameters** - Duration, participants, purposes, and custom requirements
- **Professional Downloads** - Export as CSV or formatted text with watermarks
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Generation** - Powered by Claude AI for creative, contextual activities
- **Facilitator-Focused** - Built by facilitators, for facilitators

## 🎨 Built for Facilitators

This tool understands the nuances of facilitation:

- **Purpose-driven** - Choose from common purposes or define custom ones
- **Time-aware** - Optional detailed time breakdowns for each phase
- **Group dynamics** - Specify work group arrangements
- **Material logistics** - Clear, specific material requirements
- **Variation suggestions** - Concrete adaptations, not vague advice
- **Contextual tips** - Specific facilitation advice for each activity

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Anthropic API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/icebreaker-generator.git
   cd icebreaker-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```bash
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Run development server**

   ```bash
   npm start
   ```

5. **Open http://localhost:3000**

## 🌐 Deployment on Vercel

### Step 1: Prepare for Deployment

```bash
npm run build
```

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add ANTHROPIC_API_KEY
```

### Step 3: Configure Domain (Optional)

- Go to your Vercel dashboard
- Add your custom domain
- Update DNS settings

## 🔐 Environment Variables

| Variable            | Description            | Required |
| ------------------- | ---------------------- | -------- |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes      |

## 📁 Project Structure

```
icebreaker-generator/
├── api/                    # Vercel serverless functions
│   ├── generate.js        # Main activity generation
│   └── download.js        # Download formatting
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── styles/           # CSS stylesheets
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Lucide Icons
- **Backend**: Vercel Serverless Functions
- **AI**: Anthropic Claude 3.5 Sonnet
- **Styling**: Custom CSS with modern design system
- **Deployment**: Vercel

## 🎯 Use Cases

- **Team Building** - Energize corporate teams
- **Training Sessions** - Break the ice in workshops
- **Conferences** - Engage conference attendees
- **Educational Settings** - Activate classroom dynamics
- **Community Building** - Foster connections in groups
- **Remote Work** - Virtual team bonding activities

## 🌍 Supported Languages

**Interface Languages:**

- English, Italian, Spanish, French, German

**Output Languages:**

- 75+ languages including all major world languages
- European: English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Polish, etc.
- Asian: Chinese, Japanese, Korean, Hindi, Thai, Vietnamese, Indonesian, etc.
- African: Swahili, Yoruba, Amharic, etc.
- And many more regional languages

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all translations are complete

## 📊 API Usage

The app uses two main API endpoints:

### Generate Activity

```javascript
POST /api/generate
{
  "duration": 15,
  "people": 12,
  "purposes": ["Energization", "Connection"],
  "languageName": "English",
  "includeTimeBreakdown": true
}
```

### Generate Download

```javascript
POST /api/download
{
  "format": "text", // or "csv"
  "output": "generated activity content",
  "parameters": { /* activity parameters */ }
}
```

## 🔒 Security & Privacy

- **API Keys**: Securely stored in Vercel environment variables
- **No Data Storage**: No user data is stored or logged
- **HTTPS Only**: All communications are encrypted
- **Rate Limiting**: Built-in protection against abuse

## 📈 Performance

- **Fast Generation**: Typically 3-8 seconds for activity generation
- **Responsive Design**: Optimized for all device sizes
- **Efficient API**: Minimal data transfer and processing
- **CDN Delivery**: Global content delivery via Vercel

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API Errors:**

- Check that `ANTHROPIC_API_KEY` is set correctly
- Verify API key has sufficient credits
- Check network connectivity

**Deployment Issues:**

- Ensure all environment variables are set in Vercel
- Check function timeout limits (max 30s for this project)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for providing the Claude AI API
- **Lucide** for the beautiful icon set
- **Vercel** for seamless deployment platform
- **The facilitation community** for inspiration and feedback

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/icebreaker-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/icebreaker-generator/discussions)
- **Email**: your-email@example.com

## 💖 Support the Project

If this tool helps your facilitation work, consider supporting its development:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.paypal.com/donate)

---

**Built with ❤️ by facilitators, for facilitators**

_Making every group interaction more engaging, one icebreaker at a time._
