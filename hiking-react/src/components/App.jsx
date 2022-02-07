import React from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

const MojaKomponenta = () => {
  return (
    <p>
      Moja komponenta
    </p>
  );
}



const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking trails
        </p>
        <MojaKomponenta />
        <MojaKomponenta />
        <MojaKomponenta />
        <FormLogin />
        <FormRegister />
      </header>
    </div>
  );
}

export default App;
