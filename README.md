# West Coast Impressions - Web Client

Static web application for West Coast Impressions art gallery.

## Structure

```
web-client/
├── index.html          # Main page
├── style.css           # Styles
└── assets/             # Images and other assets
```

## Development

This is a static web application that can be served from any web server.

### Local Development

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Deployment

This project is designed to be deployed to Azure Static Web Apps.

### Azure Static Web Apps

1. Connect your GitHub repository to Azure Static Web Apps
2. Configure build settings:
   - Build Preset: `Custom`
   - App location: `/`
   - API location: `(leave empty)`
   - Output location: `/`

## API Integration

The web client communicates with:
- `artwork-api`: For artwork data
- `image-service`: For image uploads and management

## Environment Variables

For local development, you may need to set:
- `API_BASE_URL`: Base URL for the artwork API
- `IMAGE_SERVICE_URL`: Base URL for the image service 