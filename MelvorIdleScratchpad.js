// Move all items to tab 0, reset default tab, reset tab icons, and sort/update
( () => {
    // reset defaultItemTab for items that are not in the bank
    for (let i = 0; i < SETTINGS.bank.defaultItemTab.length; i++) {
        let itemID = SETTINGS.bank.defaultItemTab[i].itemID;
        setDefaultItemTab(0, itemID);
    }
    
    for (let i = 0; i < bank.length; i++) {
        let itemID = bank[i].id;
        $('#bank-item-button-' + itemID).remove();
        bank[i].tab = 0;
        bank.push(bank.splice(i, 1) [0]);
        sortBankByTabs();
        setDefaultItemTab(0, itemID);
        let html = createBankItem(itemID, getBankId(itemID));
        $('#bank-item-container-' + 0).append(html[1]);
    }
    
    for (let tab=0; tab<12; tab++) {
        bankTabIcons[tab] = - 1;
        updateBankTabImage(tab);
    }
    
    updateBank();
    sortBank();
        getBankTabValue();
    SwalLocale.fire({
        icon: "success",
        title: "All done!",
        html: `<span class='text-dark'>Bank reset successfully.</span>`,
    });
} )();

// Reset bank tab icons to auto generated
bankTabIcons = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
updateBankTabImages();

// Finds all items the player lost to death
itemStatsData.all.items.forEach(function(item) {
	var count = game.stats.Items.get(item, ItemStats.TimesLostToDeath);
	if (count > 0) {
		console.log(items[item].name + ", " + count);
	}
});

// Increment dungeon comp count
dungeonCompleteCount[Dungeons.Frozen_Cove] += 1

// Raid coin/skip cost calculation
console.table(function() {
	var coins = {};
  skipCostTotal = 0
	for (let x = 1; x<580; x++) {
		var coin = x>=3 ? (3*x*Math.floor(2+(x/4))*Math.floor(1+(x/15))) : 0;
		skipCostTotal = skipCostTotal + Math.floor(100 * (x+1) / 2);
		var change = x>=2 ? coin-coins[x-1].coin : 0;
		var gain = coin - skipCostTotal;
		var gained = gain > 0;
		coins[x]={coin, skipCostTotal, change, gain, gained}
	}
	return coins;
}());

// Output farming mastery as xp
console.log(items.reduce((prev,item)=>{
    if (item.masteryID !== undefined && item.masteryID[0] === CONSTANTS.skill.Farming) prev.push(`${item.name}\t${MASTERY[CONSTANTS.skill.Farming].xp[item.masteryID[1]]}`);
    return prev;
  },[]).join('\n'));

// Output farming mastery as virtual level
console.log(items.reduce((prev,item)=>{
    if (item.masteryID !== undefined && item.masteryID[0] === CONSTANTS.skill.Farming) prev.push(`${item.name}\t${numberWithCommas(exp.xp_to_level(MASTERY[CONSTANTS.skill.Farming].xp[item.masteryID[1]]) - 1)}`);
    return prev;
  },[]).join('\n')); 

// Outputs the healing for all foods in bank.
foodList =[];
totalhealing=0;
bank.filter(x => items[x.id].canEat).forEach(x => {
                                                let total = parseInt(x.qty) * player.getFoodHealing(items[x.id]);
                                                foodList.push(
                                                    {
                                                    name: items[x.id].name, 
                                                    quantity: x.qty, 
                                                    healsFor: player.getFoodHealing(items[x.id]), 
                                                    hpForQuantity: total,
                                                    }
                                                );
                                                totalhealing = totalhealing + total;
                                            }
                                        );
console.table(foodList.sort((a,b) => parseInt(b.hpForQuantity) - parseInt(a.hpForQuantity)));
console.log("Total healing in bank: " + totalhealing.toLocaleString("en-US"));

// Basic autoloot
this.autoLoot = setInterval(() => {if (player.manager.loot.drops.length !== 0) player.manager.loot.lootAll();} , 1000);

// Autodownload save every hour
setInterval(()=>{downloadSave()}, 3600000);

// Blackhole notifications
notifyPlayer = () => {}
notifySlayer = () => {}

// Messing with modifiers
PETS[0].modifiers.decreasedSkillInterval = [[CONSTANTS.skill.Summoning, 4800]];
PETS[6].modifiers.decreasedSkillInterval = [[CONSTANTS.skill.Runecrafting, 2000], [CONSTANTS.skill.Smithing, 2000], [CONSTANTS.skill.Summoning, 2000]];
updateAllPlayerModifiers();
delete PETS[0].modifiers.decreasedSkillInterval;
updateAllPlayerModifiers();
const respawnTime = player.getMonsterSpawnTime() - 100;
player.passives.set({ modifiers: { decreasedMonsterRespawnTimer: respawnTime }}, { save: false, display: false });
updateAllPlayerModifiers();

// Fixing that stupid issue everyone makes with their adding mastery xp
MASTERY[Skills.Farming].xp.splice(MILESTONES["Farming"].length-1)

// Setting slayer task to RHE
combatManager.slayerTask.monster = MONSTERS[Monsters.RagingHornedElite];
combatManager.slayerTask.killsLeft = 99999;
combatManager.slayerTask.tier = SlayerTiers.Hard;
combatManager.slayerTask.renderRequired = true;
combatManager.slayerTask.completion[SlayerTiers.Hard]+=265

// Setting slayer task to Wizard
combatManager.slayerTask.monster = MONSTERS[Monsters.Wizard];
combatManager.slayerTask.killsLeft = 99999;
combatManager.slayerTask.tier = SlayerTiers.Easy;
combatManager.slayerTask.renderRequired = true;
combatManager.slayerTask.completion[SlayerTiers.Hard]+=276