import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import './FilterPanel.scss';
import {Switch} from '@gravity-ui/uikit';

export interface FilterPanelProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const hideCompleteOrders = () => {
    const completeOrders = document.querySelectorAll('.order--complete');
    completeOrders.forEach((order) => {
        order.classList.add('order--hidden');
    });
};

const showCompleteOrders = () => {
    const completeOrders = document.querySelectorAll('.order--complete');
    completeOrders.forEach((order) => {
        order.classList.remove('order--hidden');
    });
};

const switchShowComplete = () => {
    const switcher = document.querySelector('.filterPanel__switcher');

    if (!switcher?.classList.contains('yc-switch_checked')) {
        hideCompleteOrders();
    } else {
        showCompleteOrders();
    }
};

export const FilterPanel: React.FC<FilterPanelProps> = ({...props}) => {
    return (
        <div className="filterPanel" {...props}>
            <Switch onChange={switchShowComplete} className="filterPanel__switcher" size="l">
                Скрыть завершенные
            </Switch>
        </div>
    );
};
