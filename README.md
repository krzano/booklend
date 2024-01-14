[![booklend-color-logo-small.jpg](https://i.postimg.cc/dQ5xT5Ny/booklend-color-logo-small.jpg)](https://booklend.vercel.app/)

<hr/>

**BookLend** is a web application that helps librarians to manage and access books and readers in an easy and efficient way. It provides librarians with dashboard where they can perform various tasks.

**Live demo: &nbsp; [https://booklend.vercel.app/](https://booklend.vercel.app/)**

## Technologies

Project is built with:

- [**React 18**](https://react.dev/)
- [**React Router 6**](https://reactrouter.com/en/main)
- [**Redux Toolkit**](https://redux-toolkit.js.org/)
- [**Material UI**](https://mui.com/)
- [**styled components**](https://styled-components.com/)
- [**i18next**](https://www.i18next.com/)
- [**Axios**](https://axios-http.com/)
- [**Formik**](https://formik.org/)
- [**Yup**](https://github.com/jquense/yup)
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/)

## Features

- **User Authentication 🙋‍♂️**: user can sign up and log in with email and password. The app uses JWT and refresh token for authentication. The axios custom instance handles the token refresh on every request to the server.
- **Localization 🌐**: user can switch between Polish and English language. The language preference is stored in the local storage and persists across sessions.
- **Book management 📚**: user can add, edit, delete, and categorize books, as well as monitor the inventory and availability of books.
- **Reader management 👥**: user can add, edit, and delete readers, lend books to readers, and see the list of borrowed books.
- **Account management ⚙️**: users can change their profile picture, email, and password from the dashboard. They can also log out or delete their account if they wish.
- **Search 🔍**: user can search for books or readers by various criteria, such as title, author, genre, or name. The search results are displayed in a paginated and sortable table and grid/list views, with filters and options to view, edit, or delete the items.
- **Responsive design 📱**: users can access the application on various devices and screen sizes, thanks to the Material UI and styled components libraries. The layout and components adapt to the viewport width and orientation.

## Screenshots

### Localization

![localization](https://i.postimg.cc/NFq2TrMK/settings-localization-desktop-compressed.gif)

### Readers table and book list

![readers table book list](https://i.postimg.cc/6p0VXzQY/readersbooks-small-compressed.gif)

### Edit book (mobile)

![edit book mobile](https://i.postimg.cc/hPKPvn4K/edit-book-mobile-compressed.gif)

### Reader page

![reader page](https://i.postimg.cc/D0XZxpt5/reader-page.jpg)

### Book page

![book page](https://i.postimg.cc/jSQcjtM6/bookpage.jpg)

### Lending the book and managing the book status (mobile)

![lending the book](https://i.postimg.cc/ryWfhXkX/lendbook-mobile-compress.gif)&nbsp;![managing the book status](https://i.postimg.cc/NF1bLT4f/extendlendbook-mobile-compress.gif)

## Setup

Download or clone this repository.

Install dependencies:
`npm install`

Start a local web server by running:
`npm start`

Open http://localhost:5173 to view it in the browser.
