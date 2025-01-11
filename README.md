# College API - Next.js

A comprehensive REST API built with Next.js that provides information about colleges across India. This project uses Next.js API routes to deliver fast and reliable college data.

## 🚀 Features

- **Random College**: Get a random college from the database
- **Filter by Letter**: Search colleges by their starting letter
- **All Colleges**: Retrieve the complete list of colleges
- **Fast & Reliable**: Built on Next.js with optimized API routes
- **Simple Integration**: Easy-to-use REST endpoints

## 📁 Project Structure

```
college-api-nextjs/
├── app/
│   └── api/
│       ├── college/
│       │   └── route.js
│       ├── colleges/
│       │   └── route.js
│       └── random/
│           └── route.js
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
│   ├── mongodb.js
│   └── utils.ts
├── models/
│   └── College.js
├── pages/
│   ├── _app.tsx
│   ├── college.tsx
│   └── index.tsx
├── public/
│   ├── next.svg
│   └── vercel.svg
├── .gitattributes
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Tech Stack

- **Framework**: Next.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Language**: TypeScript/JavaScript
- **UI Components**: Custom UI components

## 📡 API Endpoints

### Get a Random College

Retrieve a random college from the database.

**Endpoint:**
```
GET https://college-api-nextjs.vercel.app/api/random
```

**Example Response:**
```json
{
  "collegeCode": "zulekha-nursing-college-mangalore-mangalore-karnataka",
  "collegeName": "Zulekha Nursing College,Mangalore - MANGALORE - Karnataka"
}
```

---

### Get Colleges by Starting Letter

Retrieve colleges that start with a specific letter.

**Endpoint:**
```
GET https://college-api-nextjs.vercel.app/api/colleges?letter=z
```

**Query Parameters:**
- `letter` (required): The starting letter of college names (a-z)

**Example Response:**
```json
[
  {
    "collegeCode": "zulekha-nursing-college-mangalore-mangalore-karnataka",
    "collegeName": "Zulekha Nursing College,Mangalore - MANGALORE - Karnataka"
  },
  {
    "collegeCode": "zenith-institute-of-science-&-technology-orissa",
    "collegeName": "Zenith Institute of Science & Technology - Orissa"
  }
]
```

---

### Get All Colleges

Retrieve the complete list of all colleges.

**Endpoint:**
```
GET https://college-api-nextjs.vercel.app/api/college
```

**Example Response:**
```json
[
  {
    "collegeCode": "zulekha-nursing-college-mangalore-mangalore-karnataka",
    "collegeName": "Zulekha Nursing College,Mangalore - MANGALORE - Karnataka"
  },
  {
    "collegeCode": "zenith-institute-of-science-&-technology-orissa",
    "collegeName": "Zenith Institute of Science & Technology - Orissa"
  }
  // ... more colleges
]
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/the-bipu/college-api-nextjs.git
cd college-api-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

This project is deployed on Vercel. You can deploy your own instance by:

1. Pushing your code to a GitHub repository
2. Importing the project in Vercel
3. Adding your environment variables
4. Deploying!

## 📝 Usage Example

### JavaScript/Node.js
```javascript
// Get a random college
const response = await fetch('https://college-api-nextjs.vercel.app/api/random');
const data = await response.json();
console.log(data);

// Get colleges starting with 'A'
const collegesA = await fetch('https://college-api-nextjs.vercel.app/api/colleges?letter=a');
const colleges = await collegesA.json();
console.log(colleges);
```

### Python
```python
import requests

# Get a random college
response = requests.get('https://college-api-nextjs.vercel.app/api/random')
college = response.json()
print(college)

# Get colleges starting with 'A'
response = requests.get('https://college-api-nextjs.vercel.app/api/colleges?letter=a')
colleges = response.json()
print(colleges)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**the-bipu**

## 🙏 Acknowledgments

- Thanks to all contributors who have helped build this API
- College data sourced from various public databases
- Built with ❤️ using Next.js

---

**Copyright © the-bipu**

For issues, questions, or suggestions, please open an issue on GitHub.