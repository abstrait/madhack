// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Index from './BudgetTracker/app'

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/' element={<app />} />
//             <Routes>
//         <BrowserRouter>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createProxyMiddleware } from 'http-proxy-middleware';
import Index from './app';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;
