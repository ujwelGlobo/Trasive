import "../src/app/routes"
import AppRoutes from "../src/app/routes"
import './App.css'
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <div>
      <AppRoutes/>
       <Toaster
        // position="top-right"
        // toastOptions={{
        //   duration: 3000,
        //   style: {
        //     borderRadius: "12px",
        //     fontSize: "14px",
        //   },
        // }}
      />
    </div>
      
    </>
  )
}

export default App
