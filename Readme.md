# 🎨 Paint Together – Fullstack Collaborative Drawing App  

**Paint Together** is a real-time collaborative drawing application that lets you create a room and invite your friends. If you prefer drawing solo, you can do that too!  

🛠 Tech Stack
Frontend: Next js, TypeScript.
Backend: Nest js, TypeScript, WebSockets.
Database: PostgreSQL.
ORM: Prisma.
Storage: AWS S3.
Authentication: JWT with refresh tokens.


## 🚀 Getting Started  

### 🖥️ Backend Setup  

1️⃣ **Configure Environment Variables**  
Create a `.env` file in the backend folder and add the following variables:  

```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXP=your_jwt_expiration_time
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
CALLBACK_URL=your_callback_url
S3_REGION=your_s3_region
S3_BUCKET_NAME=your_s3_bucket_name
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
```

2️⃣ **Install Dependencies**  
```bash
npm i
```

3️⃣ **Start Database**  
```bash
docker compose up
```

4️⃣ **Run the Backend**  
```bash
npm run start:dev
```

### 🖥️ Frontend Setup  

1️⃣ **Install Dependencies**  
```bash
npm i
```

2️⃣ **Run the Frontend**  
```bash
npm run dev
```
