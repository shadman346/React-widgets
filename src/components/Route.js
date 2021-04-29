import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
    //we have to add event handler to our route compoenent so that it can help to change state of url
    //change url cause rerender of the Route and decide wether to show or not.
    const [currPath, setCurrPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrPath(window.location.pathname);
        }
        window.addEventListener('popstate', onLocationChange);
        
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
    })
    return currPath === path ? children : null;
}

export default Route;