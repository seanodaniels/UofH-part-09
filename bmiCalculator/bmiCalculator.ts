/*
Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) 
and weight (in kilograms) and then returns a message that suits the results.
BMI = body mass / (body height) ^ 2 kg/m^2
*/

const calculateBmi = (height_cm: number, weight_kg: number) => {
    const height_m = (height_cm / 100);
    const bmi = (weight_kg / (height_m ** 2));

    let judgement = '';
    
    switch (true) {
        case (bmi < 16):
            judgement = 'Underweight (Severe thinness)';
            break;
        case (bmi >= 16.0 && bmi < 17):
            judgement = 'Underweight (Moderate thinness)';
            break;
        case (bmi >= 17.0 && bmi < 18.5):
            judgement = 'Underweight (Mild thinness)';
            break;
        case (bmi >= 18.5 && bmi < 25):
            judgement = 'Normal (healthy weight)';
            break;
        case (bmi >= 25 && bmi < 30):
            judgement = 'Overweight (Pre-obese)';
            break;
        case (bmi >= 30 && bmi < 35):
            judgement = 'Obese (Class I)';
            break;
        case (bmi >= 35 && bmi < 40):
            judgement = 'Obese (Class II)';
            break;
        case (bmi >= 40):
            judgement = 'Obese (Class III)';
            break;
        default:
            judgement = 'ERROR'
            break;
    }

    console.log(judgement);
}

// const arg_2: number = Number(process.argv[2])
// const arg_3: number = Number(process.argv[3])

interface BodyDescriptors {
    height: number;
    weight: number;
}

const parseArgs = (args: string[]): BodyDescriptors => {
    if (args.length < 4) throw new Error('Not enough arguments. Please provide height(cm) and weight(kg).');
    if (args.length > 4) throw new Error('Too many arguments. Please provide height(cm) and weight(kg).');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Arguments must be numbers.');
    }
}

try {
    const { height, weight } = parseArgs(process.argv);
    calculateBmi(height, weight);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}

