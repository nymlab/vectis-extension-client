import { useEffect, useState } from 'react';
import { useVectis } from './VectisProvider';

function App() {
  const { getAccount } = useVectis();
  const [account, setAccount] = useState<{ name: string; address: string } | null>(null);

  useEffect(() => {
    getAccount('uni-3').then(setAccount);
  }, []);

  if (!account) {
    return <div>...Loading</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your account is: {account.name} and your address {account.address}
        </p>
      </header>
    </div>
  );
}

export default App;
