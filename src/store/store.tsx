import {configureStore, createSlice} from '@reduxjs/toolkit';
import initialOrderState from './initialOrderState';
import getCurrentDate from '../helpers/currentDate';

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialOrderState,
    reducers: {
        deleteOrder: (state, action) => {
            for (const order of state) {
                if (order.number == action.payload) {
                    state.splice(state.indexOf(order), 1);
                }
            }
        },
        updateOrderStatus: (state, action) => {
            return state.map((order) => {
                if (order.number === action.payload.orderNumber) {
                    return {
                        ...order,
                        status: action.payload.orderStatus,
                    };
                }
                return order;
            });
        },
        createOrder: (state, action) => {
            const newOrder = {
                number: `${state.length + 1}`,
                date: getCurrentDate(),
                firm: action.payload.firm,
                transporter: action.payload.transporter,
                tel: action.payload.tel,
                comment: action.payload.comment,
                status: 'new',
                ATICode: action.payload.ATICode,
            };
            state.push(newOrder);
            return state;
        },
    },
});

export const {createOrder, deleteOrder, updateOrderStatus} = counterSlice.actions;

const orderStore = configureStore({
    reducer: counterSlice.reducer,
});

export default orderStore;
