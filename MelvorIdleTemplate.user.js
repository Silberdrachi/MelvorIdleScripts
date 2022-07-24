// ==UserScript==
// @name        Melvor Idle thingToInject
// @description basic script
// @version     1.0
// @namespace   you
// @match       https://melvoridle.com/*
// @match       https://www.melvoridle.com/*
// @match       https://test.melvoridle.com/*
// @noframes
// @grant        none
// ==/UserScript==
/* jshint esversion: 6 */

((main) => {
    var script = document.createElement('script');
    script.textContent = `try { (${main})(); } catch (e) { console.log(e); }`;
    document.body.appendChild(script).parentNode.removeChild(script);
})(() => {
    'use strict';

    function thingToInject() {
        // function goes here
    }

    function loadScript() {
        if (typeof confirmedLoaded !== 'undefined' && confirmedLoaded) {
            clearInterval(interval);
            console.log('Loading thingToInject script');
            thingToInject();
        }
    }

    const interval = setInterval(loadScript, 500);
});
