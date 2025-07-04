import React, { useEffect } from 'react';
import './Loader.css';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
useEffect(() => {
gsap.globalTimeline.timeScale(1.25);
document.body.classList.add('no-scroll');

const counter3 = document.querySelector('.counter-3');

for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) {
    const div = document.createElement('div');
    div.className = 'num';
    div.textContent = j;
    counter3.appendChild(div);
    }
}

const finalDiv = document.createElement('div');
finalDiv.className = 'num';
finalDiv.textContent = '0';
counter3.appendChild(finalDiv);

function animate(counter, duration, delay = 0) {
    const numHeight = counter.querySelector('.num').clientHeight;
    const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;

    gsap.to(counter, {
    y: -totalDistance,
    duration: duration,
    delay: delay,
    ease: 'power2.inOut',
    });
}

animate(counter3, 3); // shortened
animate(document.querySelector('.counter-2'), 4); // shortened
animate(document.querySelector('.counter-1'), 2, 2.5); // shortened delay

gsap.to('.digit', {
    top: '-150px',
    stagger: { amount: 0.25 },
    delay: 4.2, // previously 6
    duration: 1,
    ease: 'power4.inOut',
});

gsap.to('.loader', {
    background: 'none',
    delay: 4.2,
    duration: 0.1,
});

gsap.to('.loader', {
    scale: 100,
    duration: 1,
    delay: 5.2, // previously 7
    ease: 'power2.inOut',
});

gsap.to('.loader', {
    rotate: 45,
    y: 500,
    x: 4500,
    duration: 1,
    delay: 5.2,
    ease: 'power2.inOut',
});

gsap.to('.loading-screen', {
    opacity: 0,
    duration: 0.5,
    delay: 6.2, // previously 7.5
    ease: 'power1.inOut',
    onComplete: () => {
    document.body.classList.remove('no-scroll');
    onComplete && onComplete();
    }
});

gsap.to('h1', {
    delay: 5.2, // previously 7
    y: -80,
    duration: 1.5,
    ease: 'power4.inOut',
    stagger: { amount: 1 },
});
}, [onComplete]);

return (
    <div className="loader-body">
    <div className="website-content">
        <div className="header">
        <div className="h1">
        
        </div>
        <div className="header-revealer"></div>
        </div>
    </div>

    <div className="loading-screen">
        <div className="loader">
        <h2 className="loader-text" data-text="ROTARACT">ROTARACT</h2>
        </div>

        <div className="counter">
        <div className="counter-1 digit">
            <div className="num">0</div>
            <div className="num numoffset1">1</div>
        </div>
        <div className="counter-2 digit">
            {Array.from({ length: 11 }, (_, i) => (
            <div className="num" key={i}>{i % 10}</div>
            ))}
        </div>
        <div className="counter-3 digit">
            <div className="num">0</div>
        </div>
        </div>
    </div>
    </div>
);
};

export default Loader;
