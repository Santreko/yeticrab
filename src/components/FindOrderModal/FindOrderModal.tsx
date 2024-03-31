import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import './FindOrderModal.scss';
import {Button, Text as GravityText, Icon, Label, Modal, TextInput} from '@gravity-ui/uikit';
import {Magnifier, Xmark} from '@gravity-ui/icons';
import orderStore from '../../store/store';

export interface FindOrderModalProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    closeFn: any;
}

export const FindOrderModal: React.FC<FindOrderModalProps> = ({isOpen, closeFn, ...props}) => {
    const [inputValueState, setInputValueState] = useState('');
    const [orderValidationState, setOrderValidationState] = useState<'invalid' | undefined>(
        undefined,
    );
    const [orderInfoState, setOrderInfoState] = useState({
        number: 'Выберите заявку',
        date: 'Выберите заявку',
        firm: 'Выберите заявку',
        transporter: 'Выберите заявку',
        tel: 'Выберите заявку',
        comment: 'Выберите заявку',
        status: 'Выберите заявку',
        ATICode: 'Выберите заявку',
    });

    const confirmFind = () => {
        if (inputValueState == '') {
            setOrderValidationState('invalid');
        } else {
            for (const order of orderStore.getState()) {
                if (order.number == inputValueState) {
                    setOrderInfoState({
                        number: order.number,
                        date: order.date,
                        firm: order.firm,
                        transporter: order.transporter,
                        tel: order.tel,
                        comment: order.comment,
                        status: order.status,
                        ATICode: order.ATICode,
                    });
                    console.log(orderInfoState);
                }
            }
            setInputValueState('');
        }
    };

    useEffect(() => {
        setOrderValidationState(undefined);
        setOrderInfoState({
            number: 'Выберите заявку',
            date: 'Выберите заявку',
            firm: 'Выберите заявку',
            transporter: 'Выберите заявку',
            tel: 'Выберите заявку',
            comment: 'Выберите заявку',
            status: 'Выберите заявку',
            ATICode: 'Выберите заявку',
        });
    }, [isOpen]);

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

    return (
        <Modal {...props} className="findOrderModal" open={isOpen} onClose={() => closeFn(false)}>
            <Button
                onClick={() => closeFn()}
                className="findOrderModal__button findOrderModal__button--close"
                size="xl"
                view="action"
                title="Закрыть"
            >
                <Icon data={Xmark} size={20} />
            </Button>
            <GravityText className="findOrderModal__header" variant="header-2">
                Поиск заявки
            </GravityText>
            <TextInput
                className="findOrderModal__input"
                label="Номер заявки"
                size="xl"
                onChange={(evt) => setInputValueState(evt.target.value)}
                errorMessage="Введите номер заявки"
                validationState={orderValidationState}
            />
            <div className="findOrderModal__orderInfoWrapper orderInfo">
                <Label
                    size="m"
                    theme="warning"
                    value={orderInfoState.number}
                    children="Номер заявки"
                />
                <Label
                    size="m"
                    theme="warning"
                    value={orderInfoState.date}
                    children="Дата заявки"
                />
                <Label
                    size="m"
                    theme="warning"
                    value={orderInfoState.firm}
                    children="Фирма клиента"
                />
                <Label
                    size="m"
                    theme="warning"
                    value={orderInfoState.transporter}
                    children="Ф.И.О. перевозчика"
                />
                <Label size="m" theme="warning" value={orderInfoState.tel} children="Телефон" />
                <Label
                    size="m"
                    theme="warning"
                    value={orderInfoState.comment}
                    children="Комментарии"
                />
                <Label
                    size="m"
                    theme="warning"
                    value={statusSwitch(orderInfoState.status)}
                    children="Статус"
                />
                <Label size="m" theme="warning" value={orderInfoState.ATICode} children="ATI код" />
            </div>
            <Button
                onClick={confirmFind}
                className="findOrderModal__button"
                size="xl"
                view="action"
            >
                Поиск
                <Icon data={Magnifier} size={20} />
            </Button>
        </Modal>
    );
};
