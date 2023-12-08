import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import ReactAPIFetch from './ReactAPIFetch.tsx'
import ReactFetchPOST from './ReactFetchPOST.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ReactAPIFetch /> */}
    <ReactFetchPOST />
  </React.StrictMode>,
)
