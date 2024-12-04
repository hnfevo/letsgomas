import { FC } from 'react';
import HomePages from './components/Pages/MainPages';
import './App.css';

const App: FC = () => {
  return (
    <>
      <div>
        <HomePages />
        {/* <MainPages /> */}
      </div>
    </>
  );
}

export default App;