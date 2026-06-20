import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { Bold, LayoutDashboardIcon, Weight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons';
import { useAuthStore } from '@/stores/useAuthStore';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const topBar = () => {
    const isAdmin = useAuthStore(state => state.isAdmin);
    console.log(isAdmin);

  return (
    <div className='flex items-center justify-between p-1 sticky top-0
    backdrop-blur-md z-10'>
        <div className='relative flex items-center ml-4'>
            <Link to={"/"}>
            <img src="/TigerBeats.png"
            className='size-16'
            draggable='false'
            alt="TigerBeats" />
            
            <button
            
                type="button"
                style={{
                    padding: '10px 50px',
                    fontSize: '20px',
                    border: 'none',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    color: '#fdc601',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Montserrat, sans-serif',
                    cursor: 'pointer',
                    zIndex: 10,
                }}
                className="glitch-button"
            >
                TigerBeats
            </button>
            </Link>
            

            {/* TIGER BEATS TEXT CSS*/}
            <style>{`
                .glitch-button::after {
                    --move1: inset(50% 50% 50% 50%);
                    --move2: inset(31% 0 40% 0);
                    --move3: inset(39% 0 15% 0);
                    --move4: inset(45% 0 40% 0);
                    --move5: inset(45% 0 6% 0);
                    --move6: inset(14% 0 61% 0);
                    clip-path: var(--move1);
                    content: 'TIGERBEATS';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: block;
                }

                .glitch-button:hover::after {
                    animation: glitch_4011 1s;
                    animation-timing-function: steps(2, end);
                    background-color: transparent;
                }

                .glitch-button:hover {
                    text-shadow: -1px -1px 0px #1df2f0, 1px 1px 0px #219fda;
                    background-color: transparent;
                }

                @keyframes glitch_4011 {
                    0% {
                        clip-path: var(--move1);
                        transform: translate(0px,-10px);
                    }
                    10% {
                        clip-path: var(--move2);
                        transform: translate(-10px,10px);
                    }
                    20% {
                        clip-path: var(--move3);
                        transform: translate(10px,0px);
                    }
                    30% {
                        clip-path: var(--move4);
                        transform: translate(-10px,10px);
                    }
                    40% {
                        clip-path: var(--move5);
                        transform: translate(10px,-10px);
                    }
                    50% {
                        clip-path: var(--move6);
                        transform: translate(-10px,10px);
                    }
                    60% {
                        clip-path: var(--move1);
                        transform: translate(10px,-10px);
                    }
                    70% {
                        clip-path: var(--move3);
                        transform: translate(-10px,10px);
                    }
                    80% {
                        clip-path: var(--move2);
                        transform: translate(10px,-10px);
                    }
                    90% {
                        clip-path: var(--move4);
                        transform: translate(-10px,10px);
                    }
                    100% {
                        clip-path: var(--move1);
                        transform: translate(0);
                    }
                }
            `}</style>
            
        </div>
        <div className='flex items-center gap-4'>
            {isAdmin && (
                <Link to = {"/admin"}
                className={cn(
                    buttonVariants({variant:"outline"}))}>
                    <LayoutDashboardIcon className='size-4 mr-4'/>
                    Admin Dashboard
                </Link>
            )}

            <SignedIn>
                <SignOutButton />
            </SignedIn>

            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>

            <UserButton />
        </div>
    </div>
  )
}

export default topBar