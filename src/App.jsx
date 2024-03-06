import Header from './components/Header' // vi importerar Header componenten
import './App.css' // importerar App.css som är css för hela appen, vi sätter CSS styles på varje komponent enskilt.
import SearchFood from './components/SearchFood';




const App = () =>{

  return (
    <div className="App">
      <Header />
      <SearchFood />
    </div>
  );
};

export default App;
