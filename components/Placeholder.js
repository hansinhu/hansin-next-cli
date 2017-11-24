import React from 'react';

export default function Placeholder({}) {
    return (
        <div className='placeholder'>
            <div className="spinner">
                {/*<img src="../static/img/placeholder1.jpeg" />*/}
            </div>
            <style jsx>{`
                    .placeholder{
                        background: #F2F2F2;
                        position: relative;
                    }
                    .spinner {
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        top: 40%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
        </div>
    );
}