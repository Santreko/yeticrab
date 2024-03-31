import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import './AdminPanel.scss';
import {Button, Icon, Switch} from '@gravity-ui/uikit';
import {CirclePlusFill, Magnifier, Pencil, TrashBin} from '@gravity-ui/icons';
import {DeleteOrderModal} from '../DeleteOrderModal/DeleteOrderModal';
import {EditOrderModal} from '../EditOrderModal/EditOrderModal';
import {CreateOrderModal} from '../CreateOrderModal/CreateOrderModal';
import {FindOrderModal} from '../FindOrderModal/FindOrderModal';

export interface AdminPanelProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const switchMode = () => {
    const adminPanel = document.querySelector('.adminPanel');
    const switcher = adminPanel?.querySelector('.adminPanel__switcher');
    const adminButtons = adminPanel?.querySelector('.adminPanel__buttonWrapper');

    if (!switcher?.classList.contains('yc-switch_checked')) {
        adminButtons?.classList.add('adminPanel__buttonWrapper--opened');
    } else {
        adminButtons?.classList.remove('adminPanel__buttonWrapper--opened');
    }
};

export const AdminPanel: React.FC<AdminPanelProps> = ({...props}) => {
    const [deleteOrderModalState, setDeteleOrderModalState] = useState(false);
    const [editOrderModalState, setEditOrderModalState] = useState(false);
    const [createOrderModalState, setCreateOrderModalState] = useState(false);
    const [findOrderModalState, setFindOrderModalState] = useState(false);

    return (
        <div className="adminPanel" {...props}>
            <Switch onChange={switchMode} className="adminPanel__switcher" size="l">
                Режим администратора
            </Switch>
            <div className="adminPanel__buttonWrapper">
                <Button
                    onClick={() => setCreateOrderModalState(true)}
                    view="action"
                    className="adminPanel__newOrderButton"
                    size="xl"
                    title="Добавить заказ"
                >
                    <Icon data={CirclePlusFill} size={25} />
                </Button>
                <Button
                    onClick={() => setDeteleOrderModalState(true)}
                    view="action"
                    className="adminPanel__deleteOrderButton"
                    size="xl"
                    title="Удалить заказ"
                >
                    <Icon data={TrashBin} size={25} />
                </Button>
                <Button
                    onClick={() => setEditOrderModalState(true)}
                    view="action"
                    className="adminPanel__updateOrderButton"
                    size="xl"
                    title="Отредактировать заказ"
                >
                    <Icon data={Pencil} size={25} />
                </Button>
                <Button
                    onClick={() => setFindOrderModalState(true)}
                    view="action"
                    className="adminPanel__updateOrderButton"
                    size="xl"
                    title="Найти заказ"
                >
                    <Icon data={Magnifier} size={25} />
                </Button>
            </div>
            <DeleteOrderModal isOpen={deleteOrderModalState} closeFn={setDeteleOrderModalState} />
            <EditOrderModal isOpen={editOrderModalState} closeFn={setEditOrderModalState} />
            <CreateOrderModal isOpen={createOrderModalState} closeFn={setCreateOrderModalState} />
            <FindOrderModal isOpen={findOrderModalState} closeFn={setFindOrderModalState} />
        </div>
    );
};
