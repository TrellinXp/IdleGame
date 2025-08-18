export class DinosaurClass {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    selected: boolean;
    hatchTime: number;
    level: number;
    maxLevel: number;
    maxHatchTime: number;
    hatchTimeReduction: number;
    attackPower: number;
    maxAttackPower: number;
    attackPowerIncrease: number;
    defensePower: number;
    maxDefensePower: number;
    defensePowerIncrease: number;

    constructor(id: string, name: string, description: string, imageUrl: string, selected = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.selected = selected;
        this.hatchTime = 0; // Default value
        this.level = 1; // Default value
        this.maxLevel = 10; // Default value
        this.maxHatchTime = 100; // Default value
        this.hatchTimeReduction = 0.1; // Default value
        this.attackPower = 10; // Default value
        this.maxAttackPower = 100; // Default value
        this.attackPowerIncrease = 5; // Default value
        this.defensePower = 10; // Default value
        this.maxDefensePower = 100; // Default value
        this.defensePowerIncrease = 5; // Default value
    }
}
