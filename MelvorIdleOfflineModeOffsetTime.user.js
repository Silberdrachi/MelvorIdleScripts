// ==UserScript==
// @name        Melvor Idle Offline Mode Offset Time
// @description Changes the players create date/time when they use the testOfflineFunction
// @version     1.0
// @namespace   Silber
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

    var autoeat;

    function injectAutoeatInterval() {
        window.changeGameMode = function offlineWithTimeOffset(hours) {
            // Get current account creation timestamp
            var date = new Date(game.stats.General.get(GeneralStats.AccountCreationDate));
        
            // alter time by hours
            date.setTime(date.getTime() - (hours * 60 * 60 * 1000));
        
            // update save creation timestamp by hours
            game.stats.General.set(GeneralStats.AccountCreationDate, date.getTime());
            
            // trigger offline calculation for hours
            testOfflineFunction(hours);
        }
    }

    function loadScript() {
        if (typeof confirmedLoaded !== 'undefined' && confirmedLoaded) {
            clearInterval(interval);
            console.log('Loading Melvor Idle Offline Mode Offset Time Script');
            injectAutoeatInterval();
        }
    }

    const interval = setInterval(loadScript, 500);
});
