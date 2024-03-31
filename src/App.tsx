import {useState} from 'react';
import {AdminPanel, Counter, FilterPanel, OrderTable, Wrapper} from './components';
import orderStore from './store/store';

const App = () => {
    const [orderData, setOrderData] = useState(orderStore.getState());

    orderStore.subscribe(() => {
        setOrderData(orderStore.getState());
    });

    return (
        <Wrapper>
            <AdminPanel />
            <FilterPanel />
            <Counter count={orderData.length} />
            <OrderTable data={orderData} />
        </Wrapper>
    );
};

export default App;
