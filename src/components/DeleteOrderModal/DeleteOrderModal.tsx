import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import './DeleteOrderModal.scss';
import {Button, Text as GravityText, Icon, Modal, TextInput} from '@gravity-ui/uikit';
import {TrashBin, Xmark} from '@gravity-ui/icons';
import orderStore, {deleteOrder} from '../../store/store';

export interface DeleteOrderModalProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    closeFn: any;
}

export const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({isOpen, closeFn, ...props}) => {
    const [inputValueState, setInputValueState] = useState('');
    const [inputValueValidaitonState, setInputValueValidationState] = useState<
        'invalid' | undefined
    >(undefined);

    const updateInputValue = (evt: any) => {
        const value = evt.target.value;

        setInputValueState(value);
    };

    const confirmDelete = () => {
        setInputValueValidationState(undefined);

        if (inputValueState == '') {
            setInputValueValidationState('invalid');
        } else {
            orderStore.dispatch(deleteOrder(+inputValueState));
            closeFn();
            setInputValueState('');
        }
    };

    useEffect(() => {
        setInputValueValidationState(undefined);
    }, [isOpen]);

    return (
        <Modal {...props} className="deleteOrderModal" open={isOpen} onClose={() => closeFn(false)}>
            <Button
                onClick={() => closeFn()}
                className="deleteOrderModal__button deleteOrderModal__button--close"
                size="xl"
                view="action"
                title="Закрыть"
            >
                <Icon data={Xmark} size={20} />
            </Button>
            <GravityText className="deleteOrderModal__header" variant="header-2">
                Удаление заявки
            </GravityText>
            <TextInput
                className="deleteOrderModal__input"
                label="Номер заявки"
                size="xl"
                onChange={(evt) => updateInputValue(evt)}
                errorMessage="Введите номер заявки"
                validationState={inputValueValidaitonState}
            />
            <Button
                onClick={confirmDelete}
                className="deleteOrderModal__button"
                size="xl"
                view="action"
            >
                Удалить
                <Icon data={TrashBin} size={20} />
            </Button>
        </Modal>
    );
};
