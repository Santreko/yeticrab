import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import './Counter.scss';
import {Card} from '@gravity-ui/uikit';

export interface CounterProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    count: number;
}

export const Counter: React.FC<CounterProps> = ({count, ...props}) => {
    return (
        <Card className="counter" theme="info" type="container" view="filled" {...props}>
            Всего заявок {count}
        </Card>
    );
};
