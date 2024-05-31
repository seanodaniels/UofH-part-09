interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercise = (daily_exercise_hours: Array<number>, target_amount: number): ExerciseResult => {
    const num_days = daily_exercise_hours.length;
    const num_training_days = daily_exercise_hours.reduce((acc, curr) => curr !== 0 ? acc += 1 : acc, 0);
    const target_value = target_amount;
    const total_time = daily_exercise_hours.reduce((acc, curr) => acc + curr);
    const average_time = total_time / num_days;
    const rating_met = average_time >= target_value ? true : false;
    const rating_description = average_time >= target_value 
        ? 'Number of hours have been met. Good job!'
        : 'Number of hours not met. Do better next time.';
    

    const calculate_rating_value = (averageTime: number, targetValue: number) => {
        if (averageTime > targetValue) {
            return 2;
        }
    
        if (averageTime === targetValue) {
            return 1;
        }
    
        return 0;       
    };

    const rating_value = calculate_rating_value(average_time, target_value);

    const return_object = {
        periodLength: num_days,
        trainingDays: num_training_days,
        success: rating_met,
        rating: rating_value,
        ratingDescription: rating_description,
        target: target_value,
        average: average_time,
    };
    
    return return_object;

};

export default calculateExercise;