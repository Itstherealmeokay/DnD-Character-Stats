# D&D 5th Edition Character Sheet

A fully functional, interactive character sheet for Dungeons & Dragons 5th Edition with automatic stat calculations and local storage persistence.

## Features

### Automatic Calculations
- **Ability Modifiers**: Automatically calculated from ability scores
- **Proficiency Bonus**: Updates based on character level (follows D&D 5e progression)
- **Saving Throws**: Calculates bonuses with proficiency toggles
- **Skills**: All 18 skills with proficiency checkboxes and automatic calculations
- **Armor Class**: Auto-calculates from base AC + Dexterity modifier
- **Initiative**: Automatically derived from Dexterity modifier

### Character Information
- Basic info fields (Name, Class, Level, Race, Background, Alignment, XP)
- All six ability scores (STR, DEX, CON, INT, WIS, CHA)
- Complete skill list with proficiency tracking
- Saving throw proficiencies
- Combat stats (AC, Initiative, Speed, HP)
- Hit Dice and Death Save tracking
- Attacks & Spellcasting notes
- Equipment inventory with currency tracking (CP, SP, EP, GP, PP)
- Personality traits, Ideals, Bonds, and Flaws
- Features & Traits section

### Data Persistence
- **Save**: Store your character data to browser local storage
- **Load**: Retrieve your saved character
- **Auto-save**: Automatically saves changes after 2 seconds of inactivity
- **Reset**: Clear all data and start fresh

### Responsive Design
- Beautiful gradient purple theme
- Fully responsive layout for desktop, tablet, and mobile
- Clean, intuitive interface
- Hover effects and visual feedback

## How to Use

1. Open `index.html` in any modern web browser
2. Fill in your character information
3. Enter ability scores - modifiers calculate automatically
4. Check proficiency boxes for saves and skills
5. Character data auto-saves or click "Save Character" button
6. Click "Load Character" to restore saved data
7. Use "Reset" to start a new character

## Customization

The character sheet is easily customizable:

### Colors
Edit `styles.css` to change the color scheme:
- Primary colors: `#667eea` and `#764ba2` (purple gradient)
- Modify the gradient in `.body` and `.btn` classes
- Change border colors throughout the stylesheet

### Layout
Adjust the grid layout in `.main-content`:
```css
.main-content {
    grid-template-columns: 300px 1fr 300px;
}
```

### Fields
Add or remove fields by editing `index.html`:
- Add new input fields
- Update corresponding JavaScript in `script.js`
- Add to save/load functions

### Calculations
Modify calculation rules in `script.js`:
- `getProficiencyBonus()` - Proficiency progression
- `getAbilityModifier()` - Ability score to modifier conversion
- `updateCombatStats()` - AC and initiative calculations

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling and responsive design
- `script.js` - All calculations and interactivity
- `README.md` - This file

## D&D 5e Rules Implementation

The sheet follows official D&D 5th Edition rules:
- Ability modifiers: (Score - 10) / 2 (rounded down)
- Proficiency bonus: Levels 1-4: +2, 5-8: +3, 9-12: +4, 13-16: +5, 17-20: +6
- Skills: Base ability modifier + proficiency bonus (if proficient)
- Saves: Base ability modifier + proficiency bonus (if proficient)
- AC: Base armor + Dexterity modifier (can be customized)
- Initiative: Dexterity modifier

## License

Free to use and modify for personal use.
