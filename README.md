##yoga-client(front-end)

I have implemented UI using react-bootstrap and added notification functionality using react-toastify. I have also implemented form validation using regular expressions, including a validation to ensure that the age of the student must be between 18 and 65, all the fields have been filled, and the person must pay the 500/- rs fee for the month and select a particular batch for classes. I have managed the form fields using the useState hook in React and used axios to send HTTP requests.

also I have implemented a mock function called CompletePayment() that accepts the details of a user and payment, processes the payment for students, and displays a success notification using React Toastify."



I have deployed the app on Netlify. Here is the live link:

https://yoga-client-app.netlify.app/

I have Dockerized the front-end(client-side) by creating a Docker container for it.


if you want to see the backend code and documentation (ER diagram)
please visit this link:-
https://github.com/batman005/yoga-server


Shots:
registerform UI
![registerform](https://user-images.githubusercontent.com/51878340/208254883-87e00fa6-09ac-4d3d-94a3-c73b4efc4191.png)

CompletePayment and Succesfull registraion UI 
![completepaymentandregistered](https://user-images.githubusercontent.com/51878340/208254902-de8bce4a-d501-449c-8db2-3bc15266b0bc.png)

If email or mobileno  already exist in database then it show a popup error 
![emailnumberexist](https://user-images.githubusercontent.com/51878340/208254919-55a93205-2c02-40ac-8a0d-ca014f174d09.png)

Update batch of a person by email id
![updateform](https://user-images.githubusercontent.com/51878340/208254955-ca2ecb7a-1250-49ef-a4bc-f47817ad7453.png)

In the API, I have implemented a condition that checks if the CURRENT_DATE is less than the expiration date of the student's enrollment. If this is the case, a popup message is displayed indicating that the student must stay in their current batch for the current month. If the CURRENT_DATE is greater than the expiration date, the student's batch is updated. This allows the API to enforce the rule that a student must complete their current enrollment period before switching to a new batch.

## Available Scripts

In the project directory, you can run:
for running locally in your system

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify


