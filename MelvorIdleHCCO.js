// ==UserScript==
// @name        Melvor Idle HCCO
// @description Enables speciality game mode options for 12b and HCCO
// @version     .1
// @namespace   Silber
// @match       https://melvoridle.com/*
// @match       https://www.melvoridle.com/*
// @match       https://test.melvoridle.com/*
// @grant       none
// ==/UserScript==
/* jshint esversion: 6 */

((main) => {
    var script = document.createElement('script');
    script.textContent = `try { (${main})(); } catch (e) { console.log(e); }`;
    document.body.appendChild(script).parentNode.removeChild(script);
})(() => {
    'use strict';

    function hccoScript() {
        if (username && username.includes("HCCO")) {
            console.log('Detected Combat Only options.');
            hideNonCombat();
            changeImpendingDarknessRequirements();
            removeLemonHPFood();
        }

        if (username.includes("12b")) {
            console.log('Detected 12b options.');
            setBankBuyPrice();
            removeBankTokenCalculation();
            overwriteBankQuantity12b();
        }

        if (username.includes("1b")) {
            console.log('Detected 1b options.');
            setBankBuyPrice();
            removeBankTokenCalculation();
            overwriteBankQuantity1b();
        }
    }

    function setBankBuyPrice() {
        getBankUpgradeCost = () => 
        {
            return 696969696969;
        }
    }

    function removeBankTokenCalculation() {
        player.addMiscModifiers = () => 
        {
            if (this.equipment.checkForItemID(CONSTANTS.item.Knights_Defender) && this.attackType === 'melee') {
              this.modifiers.addModifiers({
                decreasedAttackInterval: 100,
                decreasedDamageReduction: 3,
              });
            }
            if (this.modifiers.increasedNonMagicPoisonChance > 0 && this.attackType !== 'magic') {
              this.modifiers.addModifiers({
                increasedChanceToApplyPoison: this.modifiers.increasedNonMagicPoisonChance,
              });
            }
        }
    }

    function overwriteBankQuantity12b() {
        getMaxBankSpace = () => 
        {
            return 12;
        }
    }

    function overwriteBankQuantity1b() {
        getMaxBankSpace = () => 
        {
            return 1;
        }
    }

    function hideNonCombat() {
        $($('.nav-main-heading') [4]).nextUntil('[id=nav-main-heading]').toggleClass('d-none');

        toggleMenu = function(menu) {
            let c = [
              6,
              7,
              8,
              9,
              12,
              16,
              17,
              18
            ];
            if (menu === 0) {
              for (let i = 0; i < c.length; i++) {
                $('#nav-skill-tooltip-' + c[i]).toggleClass('d-none');
              }
              if (combatMenu) {
                $('#skill-menu-icon-1').attr('class', 'far fa-eye-slash text-muted ml-1');
                combatMenu = false;
              } else {
                $('#skill-menu-icon-1').attr('class', 'far fa-eye text-muted ml-1');
                combatMenu = true;
              }
            }
        }
    }

    // Shamelessly stolen from Xander#8896
    function changeImpendingDarknessRequirements() {
        // Make list of all combat skills (including slayer)
        const combatSkillIDs = []
        for (let i = 0; i < combatSkills.length; i++){
            combatSkillIDs.push(Skills[combatSkills[i]])
        }
        combatSkillIDs.push(Skills["Slayer"])
    
        // Make list of all skills with their corresponding required level, being level 99 for combat skills and level 1 for non combat skills
        const maxCombatLevelRequirement = []
        for (let skillID = 0; skillID < Object.keys(SKILLS).length; skillID++){
            let skillRequirement = {"skill": skillID}
            if (combatSkillIDs.includes(skillID)) {
                skillRequirement["level"] = 99
            } else {
                skillRequirement["level"] = 1
            }
            maxCombatLevelRequirement.push(skillRequirement)
        }
    
        // Check that all non combat skills are level 1
        let allLevelOne = true
        for (let skillID = 0; skillID < Object.keys(SKILLS).length; skillID++){
            if (!combatSkillIDs.includes(skillID)) {
                if (skillLevel[skillID] != 1) {
                    allLevelOne = false
                }
            }
        }
    
        // if all non combat skills are level one, set dungeon requirements to having over level 99 in all combat skills
        if (allLevelOne){
            DUNGEONS[Dungeons["Impending_Darkness"]].entryRequirements[0].levels = maxCombatLevelRequirement
    
            let requirementText = document.getElementById(`combat-Dungeon-${Dungeons["Impending_Darkness"]}-level-req-max`)
            requirementText.classList.remove('text-danger')
            requirementText.classList.add('text-success')
            requirementText.innerText = " Requires Level 99 in all Combat Skills and Level 1 in all Non-Combat Skills"
        }    
    }

    function removeLemonHPFood() {
        items[CONSTANTS.item.Lemonade].canEat = false;
    }

    function loadScript() {
        if (typeof confirmedLoaded !== 'undefined' && confirmedLoaded) {
            clearInterval(interval);
            console.log('Loading HCCO Script');
            hccoScript();
        }
    }

    const interval = setInterval(loadScript, 500);
});
