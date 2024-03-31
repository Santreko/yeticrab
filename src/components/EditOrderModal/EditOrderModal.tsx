import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import './EditOrderModal.scss';
import {Button, Text as GravityText, Icon, Modal, Select, TextInput} from '@gravity-ui/uikit';
import {Pencil, Xmark} from '@gravity-ui/icons';
import orderStore, {updateOrderStatus} from '../../store/store';

export interface EditOrderModalProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    closeFn: any;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({isOpen, closeFn, ...props}) => {
    const [inputValueState, setInputValueState] = useState('');
    const [selectValueState, setSelectValueState] = useState('');
    const [inputValidationState, setInputValidationState] = useState<'invalid' | undefined>(
        undefined,
    );
    const [selectValidationState, setSelectValidationState] = useState<'invalid' | undefined>(
        undefined,
    );

    const confirmChange = () => {
        setInputValidationState(undefined);
        setSelectValidationState(undefined);

        if (inputValueState == '') {
            setInputValidationState('invalid');
        } else if (selectValueState == '') {
            setSelectValidationState('invalid');
        } else {
            orderStore.dispatch(
                updateOrderStatus({orderNumber: inputValueState, orderStatus: selectValueState}),
            );
            closeFn();
            setInputValueState('');
            setSelectValueState('');
        }
    };

    useEffect(() => {
        setInputValidationState(undefined);
        setSelectValidationState(undefined);
    }, [isOpen]);

    const statusOptions = [
        {value: 'new', content: 'Новая'},
        {value: 'inProgress', content: 'В работе'},
        {value: 'complete', content: 'Завершена'},
    ];

    return (
        <Modal {...props} className="editOrderModal" open={isOpen} onClose={() => closeFn(false)}>
            <Button
                onClick={() => closeFn()}
                className="editOrderModal__button editOrderModal__button--close"
                size="xl"
                view="action"
                title="Закрыть"
            >
                <Icon data={Xmark} size={20} />
            </Button>
            <GravityText className="editOrderModal__header" variant="header-2">
                Изменение статуса заявки
            </GravityText>
            <TextInput
                className="editOrderForm__input"
                label="Номер заявки"
                size="xl"
                onChange={(evt) => setInputValueState(evt.target.value)}
                errorMessage="Введите номер заявки"
                validationState={inputValidationState}
            />
            <Select
                onUpdate={(evt) => setSelectValueState(evt[0])}
                label="Статус"
                size="xl"
                options={statusOptions}
                validationState={selectValidationState}
                errorMessage="Выберите статус"
            />
            <Button
                type="submit"
                onClick={confirmChange}
                className="editOrderModal__button"
                size="xl"
                view="action"
            >
                Изменить
                <Icon data={Pencil} size={20} />
            </Button>
        </Modal>
    );
};
