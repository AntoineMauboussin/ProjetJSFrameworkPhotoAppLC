import { Routes, Route} from "react-router-dom";
import HomeView from './views/HomeView';
import CameraView from './views/CameraView';
import HeaderMenu from './components/HeaderMenu';
import './assets/css/main.css'

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={ <HeaderMenu state={"home"}/> } />
        <Route path="/camera" element={ <HeaderMenu state={"camera"}/> } />
      </Routes>
			<main>
        <Routes>
          <Route path="/" element={ <HomeView /> } />
          <Route path="/camera" element={ <CameraView /> } />
        </Routes>
			</main>
		</div>
  );
}

export default App;
