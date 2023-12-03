import {objectives, dietstyles, exerFrequencyWeeks, genders} from "../utils";

export type targetSetup = {
    userid: number;
    weight: number;
    height: number;
    age: number;
    gender: typeof genders[number]['value'];
    bodyFat: null | number;
    TEA: typeof exerFrequencyWeeks[number]['value'];
    goal: typeof objectives[number]['value'];
    dietstyle: typeof dietstyles[number]['value'];
}

/**
 * target profile
 * @bmr Basal metabolic rate
 * @tdee Total Daily Energy Expenditure
 * @main_nutritunion 
 */
export type target = {
    dietstyle: string;
    bmr: number,
    tdee: number,
    protein:{
        percentage: number,
        gram: number,
        calorie: number,
    },
    carbs:{
        percentage: number,
        gram: number,
        calorie: number,
    },
    fat:{
        percentage: number,
        gram: number,
        calorie: number,
    },
}

export type intakeReport = {
    calorieSum: number,
    caloriePer: number,
    proteinSum: number,
    proteinPer: number,
    carbsSum: number,
    carbsPer: number,
    fatSum: number,
    fatPer: number
}

/**
 * function to quantify the target of calorie intake as well as main nutrition for user
 * @param profile basic personal information
 * @param TEA Thermic Effect of Activity, how often exercise per week
 * @param goal muscle goal, related to the amount of protein intake
 * @param dietstyle diet style, related to the ratio of carbs and fat in daily intake
 * @returns {target} target quantified diet profile
 */
export function setTarget(
    setup: targetSetup):target{
    
    //BMR
    let gFactor :number = 0;
    if(setup.gender == "Male"){
        gFactor = 5;
    } else if (setup.gender == "Female"){
        gFactor = -16;
    } else if (setup.gender == "Others"){
        gFactor = 0;
    }

    var bmr: number = (setup.weight*10) + (setup.height*6.25) - (setup.age*5) + gFactor;
    var eFactor: number = 0;
    //TDEE
    switch(setup.TEA){
        case "Sedentary":
            pFactor = 1.2;
            break;
        case "1-3 times":
            pFactor = 1.375;
            break;
        case "4-5 times":
            pFactor = 1.6;
            break;
        case "Daily":
            eFactor = 1.9;
            break;
        default:
            break;
    }
    var tdee: number = bmr * eFactor;

    //protein Intake
    var proteinIntake_gram: number = 0;
    var pFactor:number = 0;
    switch(setup.goal){
        case "Keep Fit":
            pFactor = 1;
            break;
        case "Semi-Bulk":
            pFactor = 1.2;
            break;
        case "Bulk":
            pFactor = 1.5;
            break;
        default:
            break;
    }
    if(setup.goal === "On Diet"){
        tdee -= 500;
        pFactor = 1.2
    }

    proteinIntake_gram = setup.weight * pFactor;

    var proteinPer:number = proteinIntake_gram * 4/tdee;
    var carbsPer: number = 0;
    var fatPer: number = 0;

    switch(setup.dietstyle){
        case "Causal":
            carbsPer = 0.5;
            break;
        case "High Carbs":
            carbsPer = 0.65;
            break;
        case "Low Carbs":
            carbsPer = 0.15;
            break;
        default:
            break;
    }

    fatPer = 1 - proteinPer - carbsPer;

    var target: target= {
        dietstyle: setup.dietstyle,
        bmr: bmr,
        tdee: tdee,
        protein:{
            percentage: proteinPer,
            gram: proteinPer*tdee/4,
            calorie: proteinPer*tdee,
        },
        carbs:{
            percentage: carbsPer,
            gram: carbsPer*tdee/4,
            calorie: carbsPer*tdee,
        },
        fat:{
            percentage: fatPer,
            gram: fatPer*tdee/9,
            calorie: fatPer*tdee,
        },
    }

    return target;
}

/**
 * 
 * @param profile 
 * @param TEA 
 * @param goal 
 * @param dietstyle 
 * @returns list of target
 */
export function listAllTarget(setup: targetSetup){
        const dietstyleValues = dietstyles.map((item) => item.value);
        var res: any[] = JSON.parse("[]");

        res.push(setTarget(setup));

        for (var i in dietstyleValues) {
            if(i != setup.dietstyle){
                var ds = dietstyleValues[i]
                setup.dietstyle = ds
                res.push(setTarget(setup));
            }
        }
        
        return res;
}