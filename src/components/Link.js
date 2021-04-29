import React from 'react';

const Link = ({className, href, children}) => {
    const onClick = (event) => {
        if(event.metakey || event.ctrlKey) {
            return;
        }

        event.preventDefault();
        //change url and nothing else
        window.history.pushState({}, '', href);

        //these code just trigger event popstate which gonna tell our Route onPopstate eventhandler to run
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }
    return (
        <a onClick={onClick} className={className} href={href}>
            {children}
        </a>
    )
}

export default Link;