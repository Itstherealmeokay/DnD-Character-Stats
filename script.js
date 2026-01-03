// D&D 5e Character Sheet - Automatic Calculations

// Skill to Ability mapping
const skillAbilities = {
    acrobatics: 'dexterity',
    animalHandling: 'wisdom',
    arcana: 'intelligence',
    athletics: 'strength',
    deception: 'charisma',
    history: 'intelligence',
    insight: 'wisdom',
    intimidation: 'charisma',
    investigation: 'intelligence',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    performance: 'charisma',
    persuasion: 'charisma',
    religion: 'intelligence',
    sleightOfHand: 'dexterity',
    stealth: 'dexterity',
    survival: 'wisdom'
};

// Saving throws to ability mapping
const saveAbilities = {
    str: 'strength',
    dex: 'dexterity',
    con: 'constitution',
    int: 'intelligence',
    wis: 'wisdom',
    cha: 'charisma'
};

// Proficiency bonus by level
function getProficiencyBonus(level) {
    return Math.floor((level - 1) / 4) + 2;
}

// Calculate ability modifier
function getAbilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Format bonus for display
function formatBonus(value) {
    return value >= 0 ? `+${value}` : `${value}`;
}

// Get ability score
function getAbilityScore(ability) {
    const element = document.getElementById(ability);
    return parseInt(element.value) || 10;
}

// Update all calculations
function updateAllCalculations() {
    updateProficiencyBonus();
    updateAbilityModifiers();
    updateSavingThrows();
    updateSkills();
    updateCombatStats();
}

// Update proficiency bonus based on level
function updateProficiencyBonus() {
    const level = parseInt(document.getElementById('level').value) || 1;
    const profBonus = getProficiencyBonus(level);
    document.getElementById('proficiencyBonus').value = formatBonus(profBonus);
}

// Update ability modifiers
function updateAbilityModifiers() {
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const prefixes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    
    abilities.forEach((ability, index) => {
        const score = getAbilityScore(ability);
        const modifier = getAbilityModifier(score);
        document.getElementById(`${prefixes[index]}Modifier`).textContent = formatBonus(modifier);
    });
}

// Update saving throws
function updateSavingThrows() {
    const level = parseInt(document.getElementById('level').value) || 1;
    const profBonus = getProficiencyBonus(level);
    
    Object.keys(saveAbilities).forEach(savePrefix => {
        const ability = saveAbilities[savePrefix];
        const score = getAbilityScore(ability);
        const modifier = getAbilityModifier(score);
        const isProficient = document.getElementById(`${savePrefix}SaveProf`).checked;
        const bonus = modifier + (isProficient ? profBonus : 0);
        
        document.getElementById(`${savePrefix}Save`).textContent = formatBonus(bonus);
    });
}

// Update skills
function updateSkills() {
    const level = parseInt(document.getElementById('level').value) || 1;
    const profBonus = getProficiencyBonus(level);
    
    Object.keys(skillAbilities).forEach(skill => {
        const ability = skillAbilities[skill];
        const score = getAbilityScore(ability);
        const modifier = getAbilityModifier(score);
        const isProficient = document.getElementById(`${skill}Prof`).checked;
        const bonus = modifier + (isProficient ? profBonus : 0);
        
        document.getElementById(skill).textContent = formatBonus(bonus);
    });
}

// Update combat stats
function updateCombatStats() {
    // Update Initiative (Dex modifier)
    const dexScore = getAbilityScore('dexterity');
    const initiative = getAbilityModifier(dexScore);
    document.getElementById('initiative').textContent = formatBonus(initiative);
    
    // Update Armor Class (base + Dex modifier)
    const acBase = parseInt(document.getElementById('acBase').value) || 10;
    const dexModifier = getAbilityModifier(dexScore);
    const totalAC = acBase + dexModifier;
    document.getElementById('armorClass').textContent = totalAC;
}

// Save character data to localStorage
function saveCharacter() {
    const characterData = {
        // Basic info
        characterName: document.getElementById('characterName').value,
        class: document.getElementById('class').value,
        level: document.getElementById('level').value,
        race: document.getElementById('race').value,
        background: document.getElementById('background').value,
        alignment: document.getElementById('alignment').value,
        xp: document.getElementById('xp').value,
        
        // Ability scores
        strength: document.getElementById('strength').value,
        dexterity: document.getElementById('dexterity').value,
        constitution: document.getElementById('constitution').value,
        intelligence: document.getElementById('intelligence').value,
        wisdom: document.getElementById('wisdom').value,
        charisma: document.getElementById('charisma').value,
        
        // Saving throw proficiencies
        saves: {
            str: document.getElementById('strSaveProf').checked,
            dex: document.getElementById('dexSaveProf').checked,
            con: document.getElementById('conSaveProf').checked,
            int: document.getElementById('intSaveProf').checked,
            wis: document.getElementById('wisSaveProf').checked,
            cha: document.getElementById('chaSaveProf').checked
        },
        
        // Skill proficiencies
        skills: {},
        
        // Combat stats
        acBase: document.getElementById('acBase').value,
        speed: document.getElementById('speed').value,
        maxHP: document.getElementById('maxHP').value,
        currentHP: document.getElementById('currentHP').value,
        tempHP: document.getElementById('tempHP').value,
        hitDice: document.getElementById('hitDice').value,
        
        // Death saves
        deathSaves: {
            successes: Array.from(document.querySelectorAll('.death-saves div:first-child input')).map(cb => cb.checked),
            failures: Array.from(document.querySelectorAll('.death-saves div:last-child input')).map(cb => cb.checked)
        },
        
        // Text areas
        attacks: document.getElementById('attacks').value,
        equipment: document.getElementById('equipment').value,
        personalityTraits: document.getElementById('personalityTraits').value,
        ideals: document.getElementById('ideals').value,
        bonds: document.getElementById('bonds').value,
        flaws: document.getElementById('flaws').value,
        features: document.getElementById('features').value,
        
        // Currency
        cp: document.getElementById('cp').value,
        sp: document.getElementById('sp').value,
        ep: document.getElementById('ep').value,
        gp: document.getElementById('gp').value,
        pp: document.getElementById('pp').value,
        
        // Spells
        spells: saveSpells()
    };
    
    // Save skill proficiencies
    Object.keys(skillAbilities).forEach(skill => {
        characterData.skills[skill] = document.getElementById(`${skill}Prof`).checked;
    });
    
    localStorage.setItem('dndCharacter', JSON.stringify(characterData));
    alert('Character saved successfully!');
}

// Load character data from localStorage
function loadCharacter() {
    const savedData = localStorage.getItem('dndCharacter');
    
    if (!savedData) {
        alert('No saved character found!');
        return;
    }
    
    const characterData = JSON.parse(savedData);
    
    // Load basic info
    document.getElementById('characterName').value = characterData.characterName || '';
    document.getElementById('class').value = characterData.class || '';
    document.getElementById('level').value = characterData.level || 1;
    document.getElementById('race').value = characterData.race || '';
    document.getElementById('background').value = characterData.background || '';
    document.getElementById('alignment').value = characterData.alignment || '';
    document.getElementById('xp').value = characterData.xp || 0;
    
    // Load ability scores
    document.getElementById('strength').value = characterData.strength || 10;
    document.getElementById('dexterity').value = characterData.dexterity || 10;
    document.getElementById('constitution').value = characterData.constitution || 10;
    document.getElementById('intelligence').value = characterData.intelligence || 10;
    document.getElementById('wisdom').value = characterData.wisdom || 10;
    document.getElementById('charisma').value = characterData.charisma || 10;
    
    // Load saving throw proficiencies
    if (characterData.saves) {
        Object.keys(characterData.saves).forEach(save => {
            document.getElementById(`${save}SaveProf`).checked = characterData.saves[save];
        });
    }
    
    // Load skill proficiencies
    if (characterData.skills) {
        Object.keys(characterData.skills).forEach(skill => {
            const checkbox = document.getElementById(`${skill}Prof`);
            if (checkbox) {
                checkbox.checked = characterData.skills[skill];
            }
        });
    }
    
    // Load combat stats
    document.getElementById('acBase').value = characterData.acBase || 10;
    document.getElementById('speed').value = characterData.speed || 30;
    document.getElementById('maxHP').value = characterData.maxHP || 10;
    document.getElementById('currentHP').value = characterData.currentHP || 10;
    document.getElementById('tempHP').value = characterData.tempHP || 0;
    document.getElementById('hitDice').value = characterData.hitDice || '';
    
    // Load death saves
    if (characterData.deathSaves) {
        const successCheckboxes = document.querySelectorAll('.death-saves div:first-child input');
        const failureCheckboxes = document.querySelectorAll('.death-saves div:last-child input');
        
        characterData.deathSaves.successes.forEach((checked, index) => {
            if (successCheckboxes[index]) successCheckboxes[index].checked = checked;
        });
        
        characterData.deathSaves.failures.forEach((checked, index) => {
            if (failureCheckboxes[index]) failureCheckboxes[index].checked = checked;
        });
    }
    
    // Load text areas
    document.getElementById('attacks').value = characterData.attacks || '';
    document.getElementById('equipment').value = characterData.equipment || '';
    document.getElementById('personalityTraits').value = characterData.personalityTraits || '';
    document.getElementById('ideals').value = characterData.ideals || '';
    document.getElementById('bonds').value = characterData.bonds || '';
    document.getElementById('flaws').value = characterData.flaws || '';
    document.getElementById('features').value = characterData.features || '';
    
    // Load currency
    document.getElementById('cp').value = characterData.cp || 0;
    document.getElementById('sp').value = characterData.sp || 0;
    document.getElementById('ep').value = characterData.ep || 0;
    document.getElementById('gp').value = characterData.gp || 0;
    document.getElementById('pp').value = characterData.pp || 0;
    
    // Load spells
    if (characterData.spells) {
        loadSpells(characterData.spells);
    }
    
    updateAllCalculations();
    alert('Character loaded successfully!');
}

// Reset character sheet
function resetCharacter() {
    if (confirm('Are you sure you want to reset the character sheet? This will clear all data.')) {
        // Reset basic info
        document.getElementById('characterName').value = '';
        document.getElementById('class').value = '';
        document.getElementById('level').value = 1;
        document.getElementById('race').value = '';
        document.getElementById('background').value = '';
        document.getElementById('alignment').value = '';
        document.getElementById('xp').value = 0;
        
        // Reset ability scores
        ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(ability => {
            document.getElementById(ability).value = 10;
        });
        
        // Reset saving throw proficiencies
        Object.keys(saveAbilities).forEach(save => {
            document.getElementById(`${save}SaveProf`).checked = false;
        });
        
        // Reset skill proficiencies
        Object.keys(skillAbilities).forEach(skill => {
            document.getElementById(`${skill}Prof`).checked = false;
        });
        
        // Reset combat stats
        document.getElementById('acBase').value = 10;
        document.getElementById('speed').value = 30;
        document.getElementById('maxHP').value = 10;
        document.getElementById('currentHP').value = 10;
        document.getElementById('tempHP').value = 0;
        document.getElementById('hitDice').value = '';
        
        // Reset death saves
        document.querySelectorAll('.death-save-check').forEach(cb => cb.checked = false);
        
        // Reset text areas
        document.getElementById('attacks').value = '';
        document.getElementById('equipment').value = '';
        document.getElementById('personalityTraits').value = '';
        document.getElementById('ideals').value = '';
        document.getElementById('bonds').value = '';
        document.getElementById('flaws').value = '';
        document.getElementById('features').value = '';
        
        // Reset currency
        document.getElementById('cp').value = 0;
        document.getElementById('sp').value = 0;
        document.getElementById('ep').value = 0;
        document.getElementById('gp').value = 0;
        document.getElementById('pp').value = 0;
        
        updateAllCalculations();
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Level change
    document.getElementById('level').addEventListener('input', updateAllCalculations);
    
    // Ability score changes
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(ability => {
        document.getElementById(ability).addEventListener('input', updateAllCalculations);
    });
    
    // Saving throw proficiency changes
    Object.keys(saveAbilities).forEach(save => {
        document.getElementById(`${save}SaveProf`).addEventListener('change', updateSavingThrows);
    });
    
    // Skill proficiency changes
    Object.keys(skillAbilities).forEach(skill => {
        document.getElementById(`${skill}Prof`).addEventListener('change', updateSkills);
    });
    
    // AC base change
    document.getElementById('acBase').addEventListener('input', updateCombatStats);
    
    // Button events
    document.getElementById('saveCharacter').addEventListener('click', saveCharacter);
    document.getElementById('loadCharacter').addEventListener('click', loadCharacter);
    document.getElementById('resetCharacter').addEventListener('click', resetCharacter);
    
    // Auto-save on changes (debounced)
    let autoSaveTimeout;
    document.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const savedData = localStorage.getItem('dndCharacter');
            if (savedData) {
                // Only auto-save if there's already a saved character
                saveCharacter();
            }
        }, 2000);
    });
}

// Spell Management Functions
function updateSpellCounter(level) {
    const listElement = document.getElementById(`${level}-list`);
    const counterElement = document.getElementById(`${level}-counter`);
    
    if (!listElement || !counterElement) return;
    
    const checkboxes = listElement.querySelectorAll('.spell-checkbox:checked');
    counterElement.textContent = checkboxes.length;
}

function addSpellSlot(level) {
    const listElement = document.getElementById(`${level}-list`);
    if (!listElement) return;
    
    const spellItem = document.createElement('div');
    spellItem.className = 'spell-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'spell-checkbox';
    checkbox.dataset.level = level;
    checkbox.addEventListener('change', () => updateSpellCounter(level));
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'spell-name';
    input.placeholder = 'Spell name';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-spell-btn';
    deleteBtn.style.cssText = 'border: none; background: #dc3545; color: white; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 1.2em; line-height: 1; flex-shrink: 0;';
    deleteBtn.addEventListener('click', () => {
        spellItem.remove();
        updateSpellCounter(level);
    });
    
    spellItem.appendChild(checkbox);
    spellItem.appendChild(input);
    spellItem.appendChild(deleteBtn);
    listElement.appendChild(spellItem);
}

function initializeSpells() {
    const spellLevels = ['cantrips', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8', 'level-9'];
    
    spellLevels.forEach(level => {
        // Add event listener to add spell button
        const addBtn = document.querySelector(`.add-spell-btn[data-level="${level}"]`);
        if (addBtn) {
            addBtn.addEventListener('click', () => addSpellSlot(level));
        }
        
        // Add event listeners to existing checkboxes
        const listElement = document.getElementById(`${level}-list`);
        if (listElement) {
            listElement.querySelectorAll('.spell-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', () => updateSpellCounter(level));
            });
        }
        
        // Initialize counter
        updateSpellCounter(level);
    });
}

function saveSpells() {
    const spellLevels = ['cantrips', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8', 'level-9'];
    const spellsData = {};
    
    spellLevels.forEach(level => {
        const listElement = document.getElementById(`${level}-list`);
        if (!listElement) return;
        
        const spells = [];
        listElement.querySelectorAll('.spell-item').forEach(item => {
            const checkbox = item.querySelector('.spell-checkbox');
            const nameInput = item.querySelector('.spell-name');
            spells.push({
                name: nameInput.value,
                prepared: checkbox.checked
            });
        });
        
        spellsData[level] = spells;
        
        // Save spell slots
        const levelNum = level.replace('level-', '');
        if (levelNum !== 'cantrips') {
            const slotsInput = document.getElementById(`slots-${levelNum}-total`);
            if (slotsInput) {
                spellsData[`${level}-slots`] = slotsInput.value;
            }
        }
    });
    
    return spellsData;
}

function loadSpells(spellsData) {
    if (!spellsData) return;
    
    const spellLevels = ['cantrips', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8', 'level-9'];
    
    spellLevels.forEach(level => {
        const listElement = document.getElementById(`${level}-list`);
        if (!listElement || !spellsData[level]) return;
        
        // Clear existing spells
        listElement.innerHTML = '';
        
        // Add saved spells
        spellsData[level].forEach(spell => {
            addSpellSlot(level);
            const items = listElement.querySelectorAll('.spell-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                lastItem.querySelector('.spell-name').value = spell.name;
                lastItem.querySelector('.spell-checkbox').checked = spell.prepared;
            }
        });
        
        // Load spell slots
        const levelNum = level.replace('level-', '');
        if (levelNum !== 'cantrips' && spellsData[`${level}-slots`]) {
            const slotsInput = document.getElementById(`slots-${levelNum}-total`);
            if (slotsInput) {
                slotsInput.value = spellsData[`${level}-slots`];
            }
        }
        
        updateSpellCounter(level);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAllCalculations();
    initializeEventListeners();
    initializeSpells();
    
    // Try to load saved character
    const savedData = localStorage.getItem('dndCharacter');
    if (savedData) {
        const shouldLoad = confirm('Found a saved character. Would you like to load it?');
        if (shouldLoad) {
            loadCharacter();
        }
    }
});
