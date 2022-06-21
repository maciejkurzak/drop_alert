# drop_alert
 drop_alert is an app made for creating and uploading posts informing about upcoming shoes/clothing drops, from eg. Nike SNKRS or Adidas CONFIRMED, to social media channels.


## How it works (plan):
1. User creates a post with photos of product, price and a description of the post and date of post to be published.
2. Data and photos are uploaded to the server, where it's then processed and images with provided text are generated and post is saved to the database.
3. Post is published to instagram on the designated date and time.

## What currently works:
- User can create a post.
- Server generates image and saves it to the database.

## What currently doesn't work:
- Server cannot post directly to instagram.

## Image design:
Available here: [Figma prototype](https://www.figma.com/proto/3k6L3woSLqlPxxj5iibFJs/dropee.pl?page-id=0%3A1&node-id=14%3A205&viewport=-794%2C-1207%2C0.82&scaling=scale-down&starting-point-node-id=12%3A93)

## Used technologies:
### Design
- [Figma](https://www.figma.com/)
- [Photoshop](https://www.adobe.com/products/photoshop)
### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Passport.js](https://www.passportjs.org/)

### Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand.js.org/)
- [Day.js](https://day.js.org/)
- [Mantine](https://mantine.js.org/)
- [styled-components](https://www.styled-components.com/)
- [react-dropzone](https://www.npmjs.com/package/react-dropzone)