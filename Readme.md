It is a fullstack app for painting together with your friends. You can create a room and call your friends. If you want to paint on your own, you can do it also.



To start an app you should do that:

At the backend folder:

1. Set up .env variables at the backend folder:

DATABASE_URL
JWT_SECRET
JWT_EXP
CLIENT_ID
CLIENT_SECRET
CALLBACK_URL
S3_REGION
S3_BUCKET_NAME
AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY

2. Enter the command: npm i

3. Enter the command: docker compose up

4. Run the command: npm run start:dev

Frontend:

1. Enter the command: npm i

2. Run the command: npm run dev

