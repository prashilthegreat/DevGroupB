import './App.css';
import Header from './components/Header/Header';
import Question1 from './components/Question1/Question1';
import Question2 from './components/Question2/Question2';
import Shop from './components/Shop/Shop';

function App() {
  return (
    <div>
      <Header></Header>
      <Shop></Shop>
      <Question1></Question1>
      <Question2></Question2>
    </div>
  );
}

export default App;
