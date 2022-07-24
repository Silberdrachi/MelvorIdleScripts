// ==UserScript==
// @name        Melvor Idle Prestiege
// @description Adds a button to the settings page to allow the user to reset their levels and mastery to a new character
// @version     0.1
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

    function injectSettingsChangeMode() {
        // Function called to reset character
        window.prestiege = function () {
            // End whatever active skill is running

            // Reset xp to 1
            skillXP = Array(skillXP.length).fill(1);

            // Set hp to level 10
            skillXP[Skills.Hitpoints] = exp.level_to_xp(10);

            // Mastery settings
            MASTERY.foreach(skill => {
                // Reset mastery pools
                skill.pool = 0;
                // Reset mxp to 0
                skill.xp = Array(skill.xp.length).fill(0);
            });

            // Lock pets
            petUnlocked = Array(petUnlocked.length).fill(false);

            // Reset slayer completion count
            combatManager.slayerTask.completion = skill.xp = Array(combatManager.slayerTask.completion.length).fill(0);

            // Reset dungeon completion count
            dungeonCompleteCount = Array(dungeonCompleteCount.length).fill(0);

            // Remove potion selections

            // Remove agility selections

            // Set agility build counts to 0

            // Destroy crops

            // Unbuy crops

            // Reset prayer selections

            // Reset selected spells

            // Remove items from gear sets

            // Wipe out bank

            // Wipe out combat loot container

            // Reset shop purchases (skill upgrades, god upgrades, bank slots, gear sets)

            // Remove bank slots added with tokens?

            // Save and then send to char select to make sure everything is reloaded properly
            saveData();
            location.href='index.php';
        }

        // injecting button into the settings UI
        if ($("#settings-container")){
            var settingsContainer = $("#settings-container");
            settingsContainer.find(".block-content")
                .append($(document.createElement('h2'))
                    .html('Script Settings'))
                .append($(document.createElement('div'))
                    .append(
                        $(document.createElement('label')).prop({
                            for: 'prestiege'
                        }).html('Prestiege Character (WILL RESET LEVELS AND EXPERIENCE:')
                    )
                    .append(
                        $(document.createElement('button')).prop({
                            id: 'prestiege',
                            name: 'prestiege'
                        })
                    )
                )

                $("#prestiege").change(function () {
                    prestiege();
                })
        }
    }

    function loadScript() {
        if (typeof confirmedLoaded !== 'undefined' && confirmedLoaded) {
            clearInterval(interval);
            console.log('Loading Melvor Idle Prestiege script');
            injectSettingsChangeMode();
        }
    }

    const interval = setInterval(loadScript, 500);
});
