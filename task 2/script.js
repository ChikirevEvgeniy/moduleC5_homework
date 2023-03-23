const jsonString = `
{
    "list": [
        {
        "name": "Petr",
        "age": "20",
        "prof": "mechanic"
        },
        {
        "name": "Vova",
        "age": "60",
        "prof": "pilot"
        }
    ]
}
`;

let result = [];

const data = JSON.parse(jsonString);
const list = data.list;

const result1 = {
    name: list[0].name,
    age: list[0].age,
    prof: list[0].prof,
};
result.push(result1);

const result2 = {
    name: list[1].name,
    age: list[1].age,
    prof: list[1].prof,
};

result.push(result2);
console.log(result);
