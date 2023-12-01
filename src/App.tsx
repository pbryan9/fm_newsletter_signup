import { useState } from 'react';

import SignUp from './views/SignUp';
import Confirmation from './views/Confirmation';

function App() {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function dismiss() {
    setEmail('');
    setFormIsSubmitted(false);
  }

  return (
    <main style={{ height: '100%' }}>
      {formIsSubmitted ? (
        <Confirmation {...{ email, dismiss }} />
      ) : (
        <SignUp {...{ setFormIsSubmitted, email, setEmail }} />
      )}
    </main>
  );
}

export default App;
