import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage/SingleBlogPage";

// import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "posts", element: <BlogPage /> },
      { path: "posts/:postId", element: <SingleBlogPage /> },
    ],
  },
];

export default routes;