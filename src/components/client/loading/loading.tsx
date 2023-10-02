import React from 'react';
import { SPIN1 } from './spinner';

const Loading = () => {
    return (
        <div className=' flex-1 flex flex-col md:flex-row bg-cover min-h-screen'>
            <div className=' flex-1 flex justify-center items-center'>
                <SPIN1 />
            </div>
        </div>
    );
}

export default Loading;