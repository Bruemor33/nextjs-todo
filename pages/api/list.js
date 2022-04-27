import { db_connections } from "../../project.config"

export default listTodo = async (req, res) => {
    const token = db_connections.token;
    const url = `${db_connections.url}/lrange/todo/0/100?_token=${token}`;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            console.log("raw_data", data)
            console.log("result", result)
            return res.status(200).json(result)
        })
}