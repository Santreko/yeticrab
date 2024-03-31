import './OrderTable.scss';
import {Order, OrderProps} from '../Order/Order';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface OrderTableProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    data: OrderProps['orderInfo'][];
}

export const OrderTable: React.FC<OrderTableProps> = ({data, ...props}) => {
    return (
        <ul {...props} className="order-list">
            <li className="order-list__item order order--headers">
                <p className="order__number">Номер заявки</p>
                <p className="order__date">Дата заявки</p>
                <p className="order__firm">Название фирмы клиента</p>
                <p className="order__transporter">Ф.И.О. перевозчика</p>
                <p className="order__tel">Телефон</p>
                <p className="order__comment">Комментарии</p>
                <p className="order__status">Статус заявки</p>
                <p className="order__ATICode">ATI код</p>
            </li>
            {data.map((order) => {
                return <Order key={order.number} orderInfo={order} />;
            })}
        </ul>
    );
};
