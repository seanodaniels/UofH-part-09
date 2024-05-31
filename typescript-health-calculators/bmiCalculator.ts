/*
Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) 
and weight (in kilograms) and then returns a message that suits the results.
BMI = body mass / (body height) ^ 2 kg/m^2
*/

interface bmiResponse {
    weight: number;
    height: number;
    bmi: string;
}

const calculateBmi = (height_cm: number, weight_kg: number):bmiResponse => {
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
            judgement = 'ERROR';
            break;
    }

    // create return formatted as the interface bmiResponse
    const result = {
        weight: weight_kg,
        height: height_cm,
        bmi: judgement
    };

    return result;
};

export default calculateBmi;