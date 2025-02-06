import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/classify-number", (req, res) => {
    const number = req.query.number;

    
    if (!/^\d+$/.test(number)) {
        return res.status(400).json({
            number: "alphabet",
            error: true
        });
    }

    const num = parseInt(number, 10);
    const isPrime = checkPrime(num);
    const isPerfect = checkPerfect(num);
    const digitSum = sumDigits(num);
    const properties = [];

    if (num % 2 !== 0) properties.push("odd");
    if (isArmstrong(num)) properties.push("armstrong");

    const funFact = isArmstrong(num)
        ? `${num} is an Armstrong number because ${num.toString().split("").map(d => `${d}^${num.toString().length}`).join(" + ")} = ${num} // gotten from the numbers API`
        : `The number ${num} has interesting properties!`;

    
    res.status(200).json({
        number: num,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties: properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});


function checkPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}


function checkPerfect(n) {
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i + (i !== n / i ? n / i : 0);
        }
    }
    return sum === n && n !== 1;
}


function sumDigits(n) {
    return n.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
}


function isArmstrong(n) {
    const digits = n.toString().split("").map(Number);
    return digits.reduce((sum, digit) => sum + Math.pow(digit, digits.length), 0) === n;
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
