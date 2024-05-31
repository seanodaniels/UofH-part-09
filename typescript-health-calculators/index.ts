import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import calculateExercise from './exerciseCalculator';
const app = express();

app.use(express.json());

app.set('query parser', (str: string) => {
    return qs.parse(str);
});

app.set('message', 'Hello Full Stack');

app.get('/hello', (_req, res) => {
    res.send(app.get('query'));
    _req.query.feh ? console.log('feh is true') : console.log('feh is false');
});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body;
    console.log(body);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Array.isArray(body.daily_exercises)) {
        res.status(400).json({
            error: 'Malformed parameters. In the object sent in the body, include daily_exercises array and target number.'
        });
    } 

    if (isNaN(Number(body.target))) {
        res.status(400).json({
            error: 'Parameters missing. In the object sent in the body, include daily_exercises array and target number.'
        });
    }

    if (!req.body.daily_exercises || !req.body.target) {
        res.status(400).json({
            error: 'Parameters missing. In the object sent in the body, include daily_exercises array and target number.'
        });
    } 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calculateTest = calculateExercise(body.daily_exercises, body.target);
    res.send(calculateTest);
    
});

app.get('/bmi', (_req, res) => {
    
    if (_req.query.height && _req.query.weight) {
        const height = Number(_req.query.height);
        const weight = Number(_req.query.weight);
        const bmiObj = calculateBmi(height, weight);

        res.send(bmiObj);
    } else {
        res.status(400).json({ 
            error: 'Invalid input. Please designate height and weight in the form of ?height=x&weight=y'
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});