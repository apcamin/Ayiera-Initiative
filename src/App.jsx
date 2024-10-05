import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import FallBack from "@/routes/FallBack"

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return <FallBack />;
  },
});


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App