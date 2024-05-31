import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
const app = express();

app.set('query parser', (str: string) => {
    return qs.parse(str);
});

app.set('message', 'Hello Full Stack');

app.get('/hello', (_req, res) => {
    res.send(app.get('query'));
    _req.query.feh ? console.log('feh is true') : console.log('feh is false');
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