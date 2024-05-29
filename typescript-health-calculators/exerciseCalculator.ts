interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculatExercise = (target_amount: number, daily_exercise_hours: Array<number>): ExerciseResult => {
    const num_days = daily_exercise_hours.length;
    const num_training_days = daily_exercise_hours.reduce((acc, curr) => curr !== 0 ? acc += 1 : acc, 0);
    const target_value = target_amount;
    const total_time = daily_exercise_hours.reduce((acc, curr) => acc + curr);
    const average_time = total_time / num_days
    const rating_met = average_time >= target_value ? true : false
    const rating_description = average_time >= target_value 
        ? 'Number of hours have been met. Good job!'
        : 'Number of hours not met. Do better next time.'
    

    const calculate_rating_value = (averageTime: number, targetValue: number) => {
        if (average_time > target_value) {
            return 2;
        }
    
        if (average_time === target_value) {
            return 1;
        }
    
        return 0       
    }

    const rating_value = calculate_rating_value(average_time, target_value);

    const return_object = {
        periodLength: num_days,
        trainingDays: num_training_days,
        success: rating_met,
        rating: rating_value,
        ratingDescription: rating_description,
        target: target_value,
        average: average_time,
    }
    
    return return_object

}

interface ExerciseDescriptors {
    target_hours: number;
    exercised_hours: number[];
}

const parseExerciseDescriptors = (args: string[]): ExerciseDescriptors => {
    if (args.length < 4) throw new Error('Not enough arguments. Please provide hours exercised and target hours exercised.');

    // numberTest will be > 0 if there are any non-numbers in the arguments
    const numberTest = args.slice(3).reduce((acc, curr) => isNaN(Number(curr)) ? acc += 1 : acc += 0, 0);

    if (Number(numberTest) === 0) {

        // return all args except first arg as an array of numbers
        const exercisedArray = (args: string[]): Array<number> => {
            const ArrValue = Array.from(args);
            const ArrSliced = ArrValue.slice(3).map(v => Number(v));
            return ArrSliced;
        }

        const targetHours = Number(args[2]);
        const exercisedHours = exercisedArray(args);

        

        const returnValue =  {
            target_hours: targetHours,
            exercised_hours: exercisedHours
        }

        return returnValue 
    } else {
        throw new Error('Arguments must be numbers.');
    }
}

try {
    const { target_hours, exercised_hours } = parseExerciseDescriptors(process.argv);
    console.log(calculatExercise(target_hours, exercised_hours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}
