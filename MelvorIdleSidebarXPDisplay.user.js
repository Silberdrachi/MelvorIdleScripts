// ==UserScript==
// @name        Melvor Idle Sidebar XP Display
// @namespace   http://tampermonkey.net/
// @version     1.0
// @description Adds XP to sidebar.
// @author      Xander#8896, Silber
// @match       https://melvoridle.com/*
// @match       https://www.melvoridle.com/*
// @match       https://test.melvoridle.com/*
// @noframes
// @grant        none
// ==/UserScript==

((main) => {
    var script = document.createElement('script');
    script.textContent = `try { (${main})(); } catch (e) { console.log(e); }`;
    document.body.appendChild(script).parentNode.removeChild(script);
})(() => {
    'use strict';

    function injectSettingsChangeMode() {
        xpSidebar = setInterval(() => {
            for (let skillID = 0; skillID < Object.keys(SKILLS).length; skillID++){
                let skillEntry = document.getElementById(`nav-skill-progress-all-${skillID}`);
                let level = showVirtualLevels ? exp.xp_to_level(skillXP[skillID]) - 1 : skillLevel[skillID]
                let xp = formatNumber(skillXP[skillID])
                skillEntry.innerHTML = `<span id="nav-skill-progress-${skillID}">${level}</span> (XP: ${xp})`
            }
        }, 5000);
    }

    function loadScript() {
        if (typeof confirmedLoaded !== 'undefined' && confirmedLoaded) {
            clearInterval(interval);
            console.log('Loading XP Sidebar script');
            injectSettingsChangeMode();
        }
    }

    const interval = setInterval(loadScript, 500);
});
