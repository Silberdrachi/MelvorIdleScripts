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
            idleChecker(-1);

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
            Herblore.potionPages.forEach((page) =>{
                herbloreBonuses[page] = {
                  itemID: 0,
                  bonus: [
                    null,
                    null
                  ],
                  charges: 0,
                };
              });
            
            // Remove agility selections TODO
            game.agility.builtObstacles 
            game.agility.builtPassivePillar 
            
            // Set agility build counts to 0 TODO
            game.agility.obstacleBuildCount 

            // Destroy crops TODO
            resetFarmingPatch(areaID, patchID);

            // Unbuy crops
            newFarmingAreas.forEach(area => area.patches.forEach(patch => patch.unlocked = false));
            newFarmingAreas[0].patches[0].unlocked = true;
            loadFarmingArea(0);
            loadFarmingArea(1);
            loadFarmingArea(2);

            // Reset prayer selections
            combatManager.player.activePrayers = new Set();

            // Reset selected spells
            combatManager.player.spellSelection.ancient = -1;
            combatManager.player.spellSelection.aurora = -1;
            combatManager.player.spellSelection.curse = -1;
            combatManager.player.spellSelection.standard = -1;

            // Remove items from gear sets
            const itemsToAdd = new Map();
            this.equipmentSets.forEach((set) =>{
                const slotsToRemove = [
                ];
                set.slotArray.forEach((slot) =>{
                    itemsToAdd.set(slot.item.id, ((_a = itemsToAdd.get(slot.item.id)) !== null && _a !== void 0 ? _a : 0) + slot.quantity);
                    slotsToRemove.push(slot.type);
                });
                slotsToRemove.forEach((slotType) =>set.unequipItem(slotType));
            });
            itemsToAdd.forEach((quantity, itemID) =>addItemToBank(itemID, quantity, false, false, true));
            if (itemsToAdd.size > 0) {
                this.updateForEquipmentChange();
                this.updateForEquipSetChange();
            }

            // Wipe out bank
            bank=[];

            // Wipe out combat loot container
            combatManager.loot.actuallyDestroyAllLootNow();

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
