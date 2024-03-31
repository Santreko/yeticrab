import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import './Order.scss';
import cn from 'classnames';

export interface OrderProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    orderInfo: {
        number: string;
        date: string;
        firm: string;
        transporter: string;
        tel: string;
        comment: string;
        status: string;
        ATICode: string;
    };
}

const statusSwitch = (status: string) => {
    switch (status) {
        case 'new':
            return 'Новая';
        case 'inProgress':
            return 'В работе';
        case 'complete':
            return 'Завершена';
        default:
            return 'Статус неизвестен';
    }
};

export const Order: React.FC<OrderProps> = ({orderInfo, ...props}) => {
    return (
        <li
            className={cn('order-list__item', 'order', {
                'order--new': orderInfo.status == 'new',
                'order--complete': orderInfo.status == 'complete',
                'order--inProgress': orderInfo.status == 'inProgress',
            })}
            {...props}
        >
            <p className="order__number">{orderInfo.number}</p>
            <p className="order__date">{orderInfo.date}</p>
            <p className="order__firm">{orderInfo.firm}</p>
            <p className="order__transporter">{orderInfo.transporter}</p>
            <p className="order__tel">{orderInfo.tel}</p>
            <p className="order__comment">{orderInfo.comment}</p>
            <p className="order__status">{statusSwitch(orderInfo.status)}</p>
            <p className="order__ATICode">
                <a
                    className="order__ATICode__link"
                    href={`https://ati.su/firms/${orderInfo.ATICode}/info`}
                >
                    {orderInfo.ATICode}
                </a>
            </p>
        </li>
    );
};
