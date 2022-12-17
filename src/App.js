import './App.css';
import React from 'react'
import RegisterScreen from './components/Form/RegisterScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error-page/Error';

const LazyUpdate = React.lazy(() => import('./components/update-batch/BatchUpdate'));


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="update-batch" element={
          <React.Suspense fallback='Loading...'>
            <LazyUpdate />
          </React.Suspense>
        } />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
