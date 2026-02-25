# Excel File Comparison Tool

A professional web application for comparing two Excel files using n8n webhook processing. Built with Nuxt.js 3, Vue 3, TypeScript, and Tailwind CSS.

## Features

- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop support
- **Excel Format Support**: Handles .xlsx and .xls files up to 10MB each
- **n8n Webhook Integration**: Seamless integration with n8n for file processing
- **Detailed Comparison Results**: View added, removed, and changed items with color-coded highlighting
- **Professional UI**: Clean, modern design inspired by Chargebee
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Download Results**: Export comparison results as JSON files

## Tech Stack

- **Frontend**: Nuxt.js 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: Pinia
- **Icons**: Heroicons
- **File Processing**: n8n Webhook Integration

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-path
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Usage

1. **Upload Files**: Drag and drop two Excel files or click to browse
2. **Validate**: System automatically validates file formats and sizes
3. **Compare**: Click "Compare Files" to upload to n8n webhook
4. **View Results**: See detailed comparison with added/removed/changed items
5. **Download**: Export results as JSON file

## File Requirements

- **Formats**: .xlsx, .xls
- **Size Limit**: 10MB per file
- **Quantity**: Exactly 2 files required
- **Processing**: Files are sent to n8n webhook as form-data with key 'data'

## API Integration

The application sends files to your n8n webhook endpoint:

**Request:**
```
POST {N8N_WEBHOOK_URL}
Content-Type: multipart/form-data

Body:
- data: File[] (2 Excel files)
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "added": [],
    "removed": [],
    "changed": [],
    "summary": {
      "total_added": 0,
      "total_removed": 0,
      "total_changed": 0
    }
  }
}
```

## Project Structure

```
excel-comparison/
├── components/          # Vue components
│   ├── FileUpload.vue   # Main upload component
│   ├── FilePreview.vue  # File preview and validation
│   ├── DiffViewer.vue   # JSON diff display
│   └── SummaryCards.vue # Statistics cards
├── composables/         # Reusable Vue composables
│   └── useFileUpload.ts # File upload logic
├── pages/              # Nuxt pages
│   ├── index.vue       # Upload page
│   ├── results.vue     # Results page
│   └── error.vue       # Error page
├── stores/             # Pinia stores
│   └── files.ts        # File state management
├── utils/              # Utility functions
│   └── fileValidation.ts # File validation
├── assets/css/         # Styles
│   └── main.css        # Main stylesheet
├── nuxt.config.ts      # Nuxt configuration
└── tailwind.config.js  # Tailwind configuration
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary colors are defined in the `primary` color scale
- Success/error/warning colors use Tailwind's default palette

### Webhook URL
Set the `N8N_WEBHOOK_URL` environment variable or update the default in `nuxt.config.ts`

### File Validation
Modify file size limits and allowed formats in `utils/fileValidation.ts`

## Deployment

The application can be deployed to any static hosting service or Node.js platform:

- **Static**: Use `npm run generate` for static generation
- **SSR**: Use `npm run build` for server-side rendering
- **Edge**: Compatible with Vercel, Netlify, Cloudflare Pages

## License

ISC License