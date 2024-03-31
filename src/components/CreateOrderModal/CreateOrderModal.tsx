import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import './CreateOrderModal.scss';
import {Button, Text as GravityText, Icon, Modal, TextInput} from '@gravity-ui/uikit';
import {CirclePlusFill, Xmark} from '@gravity-ui/icons';
import orderStore, {createOrder} from '../../store/store';

export interface CreateOrderModalProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    closeFn: any;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({isOpen, closeFn, ...props}) => {
    const [firmState, setFirmState] = useState('');
    const [transporterState, setTransporterState] = useState('');
    const [telState, setTelState] = useState('');
    const [commentState, setCommentState] = useState('');
    const [ATICodeState, setATICodeState] = useState('');
    const [firmValidationState, setFirmValidationState] = useState<'invalid' | undefined>(
        undefined,
    );
    const [transporterValidationState, setTransporterValidationState] = useState<
        'invalid' | undefined
    >(undefined);
    const [telValidationState, setTelValidationState] = useState<'invalid' | undefined>(undefined);
    const [commentValidationState, setCommentValidationState] = useState<'invalid' | undefined>(
        undefined,
    );
    const [ATICodeValidationState, setATICodeValidationState] = useState<'invalid' | undefined>(
        undefined,
    );

    const confirmCreate = () => {
        setFirmValidationState(undefined);
        setTransporterValidationState(undefined);
        setTelValidationState(undefined);
        setCommentValidationState(undefined);
        setATICodeValidationState(undefined);

        if (firmState == '') {
            setFirmValidationState('invalid');
        } else if (transporterState == '') {
            setTransporterValidationState('invalid');
        } else if (telState == '') {
            setTelValidationState('invalid');
        } else if (commentState == '') {
            setCommentValidationState('invalid');
        } else if (ATICodeState == '') {
            setATICodeValidationState('invalid');
        } else {
            orderStore.dispatch(
                createOrder({
                    firm: firmState,
                    transporter: transporterState,
                    tel: telState,
                    comment: commentState,
                    ATICode: ATICodeState,
                }),
            );
            closeFn();
            setFirmState('');
            setTransporterState('');
            setTelState('');
            setCommentState('');
            setATICodeState('');
        }
    };

    useEffect(() => {
        setFirmValidationState(undefined);
        setTransporterValidationState(undefined);
        setTelValidationState(undefined);
        setCommentValidationState(undefined);
        setATICodeValidationState(undefined);
    }, [isOpen]);

    return (
        <Modal {...props} className="createOrderModal" open={isOpen} onClose={() => closeFn(false)}>
            <Button
                onClick={() => closeFn()}
                className="createOrderModal__button createOrderModal__button--close"
                size="xl"
                view="action"
                title="Закрыть"
            >
                <Icon data={Xmark} size={20} />
            </Button>
            <GravityText className="createOrderModal__header" variant="header-2">
                Создание заявки
            </GravityText>
            <TextInput
                className="createOrderModal__input"
                label="Название фирмы"
                size="xl"
                onChange={(evt) => setFirmState(evt.target.value)}
                errorMessage="Введите название"
                validationState={firmValidationState}
            />
            <TextInput
                className="createOrderModal__input"
                label="Ф.И.О. перевозчика"
                size="xl"
                onChange={(evt) => setTransporterState(evt.target.value)}
                errorMessage="Введите Ф.И.О."
                validationState={transporterValidationState}
            />
            <TextInput
                className="createOrderModal__input"
                label="Телефон"
                size="xl"
                onChange={(evt) => setTelState(evt.target.value)}
                errorMessage="Введите телефон"
                validationState={telValidationState}
            />
            <TextInput
                className="createOrderModal__input"
                label="Комментарий"
                size="xl"
                onChange={(evt) => setCommentState(evt.target.value)}
                errorMessage="Введите комментарий"
                validationState={commentValidationState}
            />
            <TextInput
                className="createOrderModal__input"
                label="ATI код"
                size="xl"
                onChange={(evt) => setATICodeState(evt.target.value)}
                errorMessage="Введите ATI код"
                validationState={ATICodeValidationState}
            />
            <Button
                onClick={confirmCreate}
                className="createOrderModal__button"
                size="xl"
                view="action"
            >
                Создать
                <Icon data={CirclePlusFill} size={20} />
            </Button>
        </Modal>
    );
};
