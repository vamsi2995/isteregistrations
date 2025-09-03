import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iste_logo from '../assets/ISTE LOGO.png';

const Header = () => {
    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            background: '#fbf8d6ff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={iste_logo}
                    alt="ISTE Logo"
                    style={{ width: 40, height: 40, marginRight: 12, borderRadius: '50%' }}
                />
                <span style={{ fontSize: 22, fontWeight: 600, color: '#333' }}>
                    ISTE Membership Registrations
                </span>
            </div>

            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setToggled(!toggled)}
                    style={{
                        padding: '7px 16px',
                        fontSize: 16,
                        borderRadius: 18,
                        border: 'none',
                        background: '#0078d4',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    &#9776;
                </button>
                {toggled && (
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 8px)',
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            borderRadius: 8,
                            minWidth: 180,
                            zIndex: 10,
                            padding: '8px 0'
                        }}
                    >
                        <button
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px 20px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                fontSize: 16,
                                color: '#333',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setToggled(false);
                                navigate('/');
                            }}
                        >
                            Home
                        </button>
                        <button
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px 20px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                fontSize: 16,
                                color: '#333',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setToggled(false);
                                navigate('/view_registrations');
                            }}
                        >
                            View Registrations
                        </button>
                   
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;