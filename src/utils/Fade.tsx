import * as React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

export function Fade({id, children}: {id: string, children: React.ReactNode}) {
    return (
        <TransitionGroup>
            <CSSTransition
                key={id}
                timeout={500}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div>
                    {children}
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}
