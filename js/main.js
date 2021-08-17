const ENHANCE_PROB = {
    "9": {
        "-1": 0,
        "+0": 0,
        "+1": 0.96,
        "+2": 0.03,
        "+3": 0.01
    },    
    "10": {
        "-1": 0.5,
        "+0": 0,
        "+1": 0.47,
        "+2": 0.02,
        "+3": 0.01
    },
    "11": {
        "-1": 0.3,
        "+0": 0.3,
        "+1": 0.38,
        "+2": 0.02,
        "+3": 0
    },
    "12": {
        "-1": 0.15,
        "+0": 0.55,
        "+1": 0.29,
        "+2": 0.01,
        "+3": 0
    },
    "13": {
        "-1": 0.2,
        "+0": 0.77,
        "+1": 0.029,
        "+2": 0.001,
        "+3": 0
    },
    "14": {
        "-1": 0.02,
        "+0": 0.97,
        "+1": 0.01,
        "+2": 0,
        "+3": 0
    },
    "15": {
        "-1": 0.015,
        "+0": 0.98,
        "+1": 0.005,
        "+2": 0,
        "+3": 0
    },
    "16": {
        "-1": 0.015,
        "+0": 0.9805,
        "+1": 0.0045,
        "+2": 0,
        "+3": 0
    },
    "17": {
        "-1": 0.015,
        "+0": 0.9815,
        "+1": 0.0035,
        "+2": 0,
        "+3": 0
    },
    "18": {
        "-1": 0.015,
        "+0": 0.9815,
        "+1": 0.0035,
        "+2": 0,
        "+3": 0
    },
    "19": {
        "-1": 0.015,
        "+0": 0.9815,
        "+1": 0.0035,
        "+2": 0,
        "+3": 0
    },
    "20": {
        "-1": 0.015,
        "+0": 0.9824,
        "+1": 0.0026,
        "+2": 0,
        "+3": 0
    },
    "21": {
        "-1": 0.015,
        "+0": 0.9824,
        "+1": 0.0026,
        "+2": 0,
        "+3": 0
    },
};
const ENHANCE_FUEL_COST = {
    "9": 1,
    "10": 1,
    "11": 2,
    "12": 4,
    "13": 6,
    "14": 8,
    "15": 10,
    "16": 10,
    "17": 10,
    "18": 10,
    "19": 10,
    "20": 10,
    "21": 10,    
}
const MIN_ENHANCE_LEVEL = 9;
const INITIAL_ENHANCE_LEVEL = 10;
const MAX_ENHANCE_LEVEL = 22;
const LUCKY_FUEL_PROB_BONUS = 1.3;
const BUFF_PROB_BONUS = 1.2;
const FEVER_PROB_BONUS = 2.7;

function getRandomResult(PROB_TABLE){
    const RAND = Math.random();
    const RESULTS = Object.keys(PROB_TABLE);
    const RESULTS_COUNT = RESULTS.length;
    let accProb = 0;
    for (let i = 0; i < RESULTS.length; i += 1){
        if (RAND < accProb + PROB_TABLE[RESULTS[i]]){
            return {
                result: RESULTS[i],
                rand: RAND
            };
        } else {
            accProb += PROB_TABLE[RESULTS[i]];
        }
    }
}
function getEnhanceResult(enhanceLevel, luckyFuel, buff, fever){
    const PROB_TABLE = ENHANCE_PROB[enhanceLevel];
    let successProb = PROB_TABLE["+1"];
    let success2Prob = PROB_TABLE["+2"];
    let success3Prob = PROB_TABLE["+3"];
    const failProb = PROB_TABLE["-1"];
    let noChangeProb;
    let randResult;
    if(luckyFuel){
        successProb *= LUCKY_FUEL_PROB_BONUS;
        success2Prob *= LUCKY_FUEL_PROB_BONUS;
        success3Prob *= LUCKY_FUEL_PROB_BONUS;
    }
    if(fever){
        successProb *= FEVER_PROB_BONUS;
        success2Prob *= FEVER_PROB_BONUS;
        success3Prob *= FEVER_PROB_BONUS;
    } else if (buff){
        successProb *= BUFF_PROB_BONUS;
        success2Prob *= BUFF_PROB_BONUS;
        success3Prob *= BUFF_PROB_BONUS;        
    }
    noChangeProb = 1 - (successProb + success2Prob + success3Prob + failProb);
    randResult = getRandomResult({
        "-1": failProb,
        "+0": noChangeProb,
        "+1": successProb, 
        "+2": success2Prob, 
        "+3": success3Prob, 
    })
}

const app = new Vue({
    el: "#app",
    data (){
        return{
            stastics: {
                "9": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "10": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "11": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "12": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "13": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "14": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "15": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "16": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "17": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "18": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "19": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "20": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
                "21": {"-1": 0, "+0": 0, "defend": 0, "+1": 0, "+2": 0, "+3": 0, "total": 0},
            },
            logs: [],
            useAutoEnhance: false,
            autoEnhanceInterval: 0,
            useVaccine: false,
            useLuckyFuel: false,
            useBuff: false,
            fever: false,
            feverPoint: 0,
            currentEnhanceLevel: INITIAL_ENHANCE_LEVEL,
            usedVaccineCount: 0,
            usedFuelCount: 0,
            usedLuckyFuelCount: 0,
            fuelCost: 1200000,
            vaccineCost: 30000000,
            usedBuffCount: 0,
            usedCourse10: 0,
            usedCourse11: 0,
            usedCourse12: 0,
            usedCourse13: 0,
            usedCourse14: 0,
            usedCourse15: 0,
            course10Cost: 1000000, 
            course11Cost: 1000000, 
            course12Cost: 20000000, 
            course13Cost: 50000000, 
            course14Cost: 1000000000, 
            course15Cost: 0, 
        }
    },
    methods: {
        enhance: function (){
            if (this.currentEnhanceLevel === 22){
                M.toast({
                    html: "최대 강화 단계",
                    displayLength: 2000,
                })
                return {
                    result: "+0",
                    rand: 0
                };
            }
            const PROB_TABLE = ENHANCE_PROB[this.currentEnhanceLevel];
            let successProb = PROB_TABLE["+1"];
            let success2Prob = PROB_TABLE["+2"];
            let success3Prob = PROB_TABLE["+3"];
            let failProb = PROB_TABLE["-1"];
            let noChangeProb;
            let ENHANCE_RESULT;
            if(this.useLuckyFuel){
                successProb *= LUCKY_FUEL_PROB_BONUS;
                success2Prob *= LUCKY_FUEL_PROB_BONUS;
                success3Prob *= LUCKY_FUEL_PROB_BONUS;
            }
            if(this.fever){
                successProb *= FEVER_PROB_BONUS;
                success2Prob *= FEVER_PROB_BONUS;
                success3Prob *= FEVER_PROB_BONUS;
                failProb = 0;
                this.useVaccine = false;
            } else if (this.useBuff){
                successProb *= BUFF_PROB_BONUS;
                success2Prob *= BUFF_PROB_BONUS;
                success3Prob *= BUFF_PROB_BONUS;        
            }
            noChangeProb = 1 - (successProb + success2Prob + success3Prob + failProb);
            ENHANCE_RESULT = getRandomResult({
                "-1": failProb,
                "+0": noChangeProb,
                "+1": successProb, 
                "+2": success2Prob, 
                "+3": success3Prob, 
            })
            if(this.useVaccine){
                this.usedVaccineCount += 1;
            }
            if(this.useLuckyFuel){
                this.usedLuckyFuelCount += 1;                
            } else {
                this.usedFuelCount += ENHANCE_FUEL_COST[this.currentEnhanceLevel];                   
            }
            if (ENHANCE_RESULT.result === "-1"){
                if (this.useVaccine){
                    this.stastics[this.currentEnhanceLevel]["defend"] += 1;
                    this.stastics[this.currentEnhanceLevel]["total"] += 1;
                    this.logs.push("방어!");
                    M.toast({
                        html: "방어!",
                        displayLength: 2000,
                        classes: "teal-text text-lighten-2"
                    })
                } else {
                    this.stastics[this.currentEnhanceLevel]["-1"] += 1;
                    this.stastics[this.currentEnhanceLevel]["total"] += 1;
                    this.currentEnhanceLevel -= 1;
                    this.logs.push("실패 -1");
                    M.toast({
                        html: "실패 -1",
                        displayLength: 2000,
                        classes: "red-text"
                    })
                }
                if (this.useBuff){
                    this.feverPoint = this.feverPoint >= 25000 ? 25000 : this.feverPoint + 100;
                }
            } else if (ENHANCE_RESULT.result === "+0"){
                this.stastics[this.currentEnhanceLevel]["+0"] += 1;
                this.stastics[this.currentEnhanceLevel]["total"] += 1;
                this.logs.push("변화 없음");
                M.toast({
                    html: "변화 없음",
                    displayLength: 2000,
                    classes: "light-blue-text"
                })
                if (this.useBuff){
                    this.feverPoint = this.feverPoint >= 25000 ? 25000 : this.feverPoint + 100;
                }
            } else if (ENHANCE_RESULT.result === "+1"){    
                this.stastics[this.currentEnhanceLevel]["+1"] += 1;
                this.stastics[this.currentEnhanceLevel]["total"] += 1;
                this.currentEnhanceLevel += 1;
                this.logs.push("성공 +1");
                M.toast({
                    html: "성공 +1",
                    displayLength: 2000,
                    classes: "yellow-text"
                })
                if (this.useBuff){
                    this.fever = false;
                    this.feverPoint = 0;
                    this.usedBuffCount += 1;
                    this.useBuff = false;
                }
            } else if (ENHANCE_RESULT.result === "+2"){ 
                this.stastics[this.currentEnhanceLevel]["+2"] += 1;  
                this.stastics[this.currentEnhanceLevel]["total"] += 1; 
                this.currentEnhanceLevel += 2;
                this.logs.push("대성공 +2");
                M.toast({
                    html: "대성공 +2",
                    displayLength: 2000,
                    classes: "yellow-text"
                })
                if (this.useBuff){
                    this.fever = false;
                    this.feverPoint = 0;
                    this.usedBuffCount += 1;
                    this.useBuff = false;
                }
            } else if (ENHANCE_RESULT.result === "+3"){  
                this.stastics[this.currentEnhanceLevel]["+3"] += 1; 
                this.stastics[this.currentEnhanceLevel]["total"] += 1;
                this.currentEnhanceLevel += 3;
                this.logs.push("대성공 +3");
                M.toast({
                    html: "대성공 +3",
                    displayLength: 2000,
                    classes: "yellow-text"
                })
                if (this.useBuff){
                    this.fever = false;
                    this.feverPoint = 0;
                    this.usedBuffCount += 1;
                    this.useBuff = false;
                }
            }
            if(this.feverPoint === 25000){
                this.fever = true;
            }
            return ENHANCE_RESULT;
        },
        autoEnhance: function(){
            const self = this;
            this.useAutoEnhance = true;
            this.autoEnhanceInterval= setInterval(function (){
                const ENHANCE_RESULT = self.enhance();
                if(
                    ENHANCE_RESULT.result === "+1" || 
                    ENHANCE_RESULT.result === "+2" || 
                    ENHANCE_RESULT.result === "+3" ||
                    (ENHANCE_RESULT.result === "-1" && !self.useVaccine)
                ){
                    clearInterval(self.autoEnhanceInterval);
                    self.useAutoEnhance = false;
                }
            }, 200);            
        },
        toggleAutoEnhance: function(){
            if (this.useAutoEnhance){
                clearInterval(this.autoEnhanceInterval);
                this.useAutoEnhance = false;
            } else {
                this.autoEnhance()
            }
        },
        getUsedCredit: function(){
            return this.fuelCost * this.usedFuelCount 
                + this.vaccineCost * this.usedVaccineCount
                + this.course10Cost * this.usedCourse10
                + this.course11Cost * this.usedCourse11
                + this.course12Cost * this.usedCourse12
                + this.course13Cost * this.usedCourse13
                + this.course14Cost * this.usedCourse14
                + this.course15Cost * this.usedCourse15
        },
        useCourseOneshot: function(lvl){
            if(this.currentEnhanceLevel >= lvl){
                M.toast({
                    html: "코스 원샷이 사용되지 않았습니다.",
                    displayLength: 2000,
                })
                return;
            }
            this.currentEnhanceLevel = lvl;
            if (lvl === 10){
                this.usedCourse10 += 1;
            } else if (lvl === 11){
                this.usedCourse11 += 1;
            } else if (lvl === 12){
                this.usedCourse12 += 1;
            } else if (lvl === 13){
                this.usedCourse13 += 1;
            } else if (lvl === 14){
                this.usedCourse14 += 1;
            } else if (lvl === 15){
                this.usedCourse15 += 1;
            }
            M.toast({
                html: "코스 원샷 +" + lvl + " 사용",
                displayLength: 2000,
                classes: "yellow-text"
            })
        }
    }
})